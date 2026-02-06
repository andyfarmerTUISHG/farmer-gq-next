import { config } from "dotenv";
import { createClient } from "@sanity/client";

// Try .env.local first, then .env
config({ path: ".env.local" });
config({ path: ".env" });

const client = createClient({
  projectId: "ix9xb2vm",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const OMDB_API_KEY = process.env.OMDB_API_KEY;

if (!OMDB_API_KEY) {
  console.error("OMDB_API_KEY not found in environment");
  process.exit(1);
}

async function fetchPlotFromOMDb(imdbId) {
  const url = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`;
  const response = await fetch(url);
  const data = await response.json();
  
  if (data.Response === "True" && data.Plot && data.Plot !== "N/A") {
    return data.Plot;
  }
  return null;
}

async function updateTruncatedPlots() {
  console.log("Fetching films with truncated plots...\n");
  
  const films = await client.fetch(
    '*[_type == "film" && defined(plot) && defined(imdbId)] {_id, title, imdbId, plot}'
  );
  
  const truncated = films.filter(f => f.plot && (f.plot.endsWith("...") || f.plot.length < 50));
  
  console.log(`Found ${truncated.length} films with truncated plots\n`);
  
  for (const film of truncated) {
    console.log(`Updating: ${film.title} (${film.imdbId})`);
    console.log(`  Old plot: ${film.plot.substring(0, 80)}...`);
    
    try {
      const newPlot = await fetchPlotFromOMDb(film.imdbId);
      
      if (newPlot && newPlot !== film.plot) {
        await client
          .patch(film._id)
          .set({ plot: newPlot })
          .commit();
        
        console.log(`  ✓ Updated with new plot (${newPlot.length} chars)`);
      } else {
        console.log(`  ⚠ No better plot available from OMDb`);
      }
    } catch (error) {
      console.error(`  ✗ Error: ${error.message}`);
    }
    
    console.log("");
    
    // Rate limit: wait 200ms between requests
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log("Done!");
}

updateTruncatedPlots().catch(console.error);

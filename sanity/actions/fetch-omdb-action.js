/* eslint-disable no-alert */
import { SearchIcon } from "@sanity/icons";
import { useDocumentOperation } from "sanity";

export default function FetchOMDbAction(props) {
  const { type, id, draft, published } = props;
  const { patch } = useDocumentOperation(id, type);
  const doc = draft || published;

  // Safety check - ensure document exists
  if (!doc || !doc._id) {
    return null;
  }

  if (type !== "film") {
    return null;
  }

  // Check if we're running in hosted Sanity Studio
  const isHostedStudio = typeof window !== "undefined"
    && (window.location.hostname.includes("sanity.studio")
      || window.location.hostname.includes("sanity.io"));

  return {
    label: isHostedStudio ? "Fetch OMDb Data (Local Only)" : "Fetch OMDb Data",
    icon: SearchIcon,
    disabled: isHostedStudio,
    onHandle: async () => {
      if (isHostedStudio) {
        alert("OMDb integration is only available in local development.\n\nTo use this feature:\n1. Run 'npm run dev' locally\n2. Open http://localhost:3000/studio\n3. Use the OMDb action there");
        return;
      }
      const title = doc?.title;
      const year = doc?.year;
      const imdbId = doc?.imdbId;

      if (!title && !imdbId) {
        alert("Please enter a film title or IMDB ID first");
        return;
      }

      try {
        let url;
        let filmData;

        if (imdbId && imdbId.startsWith("tt")) {
          url = `http://localhost:3000/api/films/details?imdbId=${imdbId}`;
        }
        else if (title) {
          // Extract year from title if present
          const yearMatch = title.match(/\b(19|20)\d{2}\b/);
          let searchTitle = title.trim();
          let searchYear = year; // Use existing year field first

          if (yearMatch && !searchYear) {
            searchYear = Number.parseInt(yearMatch[0]);
            searchTitle = title.replace(yearMatch[0], "").trim();
          }

          // Try direct lookup with year first if we have both
          if (searchYear && searchTitle) {
            try {
              const directResponse = await fetch(`http://localhost:3000/api/films/details-by-title?title=${encodeURIComponent(searchTitle)}&year=${searchYear}`);
              const directData = await directResponse.json();
              if (directData.film) {
                filmData = directData.film;
              }
            }
            catch (e) {
              // Fall through to search if direct lookup fails
              console.warn("Direct lookup failed, falling back to search", e);
            }
          }

          // If direct lookup didn't work, do a search
          if (!filmData) {
            url = `http://localhost:3000/api/films/search?q=${encodeURIComponent(searchTitle)}`;
          }
        }

        // Only fetch if we don't have filmData yet
        if (!filmData && url) {
          const response = await fetch(url);
          const data = await response.json();

          if (imdbId && imdbId.startsWith("tt")) {
            filmData = data.film;
          }
          else {
            // Handle search results
            if (data.results && data.results.length > 1) {
              const options = data.results.slice(0, 5).map((film, index) =>
                `${index + 1}. ${film.title} (${film.year}) - ${film.type}`,
              ).join("\n");

              const choice = prompt(`Multiple films found. Choose one:\n\n${options}\n\nEnter number (1-${Math.min(5, data.results.length)}):`);
              const choiceIndex = Number.parseInt(choice) - 1;

              if (choiceIndex >= 0 && choiceIndex < data.results.length) {
                const selectedResult = data.results[choiceIndex];
                const detailsResponse = await fetch(`http://localhost:3000/api/films/details?imdbId=${selectedResult.imdbId}`);
                const detailsData = await detailsResponse.json();
                filmData = detailsData.film;
              }
              else {
                alert("Invalid selection or cancelled");
                return;
              }
            }
            else if (data.results && data.results.length === 1) {
              const firstResult = data.results[0];
              const detailsResponse = await fetch(`http://localhost:3000/api/films/details?imdbId=${firstResult.imdbId}`);
              const detailsData = await detailsResponse.json();
              filmData = detailsData.film;
            }
            else {
              filmData = data.film;
            }
          }
        }

        if (!filmData) {
          alert("No film data found");
          return;
        }

        // Build patches array - update all available fields unless field has data and API returns nothing
        const patches = [];

        // Title: always update if API has data
        if (filmData.title) {
          patches.push({ set: { title: filmData.title } });
        }

        // Year: always update if API has data
        if (filmData.year) {
          patches.push({ set: { year: filmData.year } });
        }

        // Runtime: always update if API has data
        if (filmData.runtime) {
          let runtimeMinutes;
          if (typeof filmData.runtime === "string") {
            runtimeMinutes = Number.parseInt(filmData.runtime.replace(/\D/g, ""));
          }
          else if (typeof filmData.runtime === "number") {
            runtimeMinutes = filmData.runtime;
          }
          if (runtimeMinutes) {
            patches.push({ set: { runtime: runtimeMinutes } });
          }
        }

        // IMDB ID: always update if API has data
        if (filmData.imdbId) {
          patches.push({ set: { imdbId: filmData.imdbId } });
        }

        // Poster: always update if API has valid data
        if (filmData.poster && filmData.poster !== "N/A") {
          patches.push({ set: { posterUrl: filmData.poster } });
        }

        // Plot: always update if API has data
        if (filmData.plot) {
          patches.push({ set: { plot: filmData.plot } });
        }

        // Slug: always regenerate from current title and year
        const slug = filmData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "")
          + (filmData.year ? `-${filmData.year}` : "");
        patches.push({ set: { slug: { current: slug } } });

        if (patches.length > 0) {
          try {
            await patch.execute(patches);
            alert(`✅ Updated ${patches.length} fields with OMDb data!

${filmData.title} (${filmData.year})
Director: ${filmData.director}
Genre: ${filmData.genre}

Fields updated: ${patches.map(p => Object.keys(p.set)[0]).join(", ")}`);
          }
          catch (patchError) {
            console.error("Patch execution failed:", patchError);
            alert(`Failed to update document: ${patchError.message}\n\nTry saving the document first, then retry the OMDb fetch.`);
          }
        }
        else {
          alert(`ℹ️ No new data to update for ${filmData.title} (${filmData.year})`);
        }
      }
      catch (error) {
        console.error("Failed to fetch OMDb data:", error);
        alert(`Failed to fetch OMDb data: ${error.message}`);
      }
    },
  };
}

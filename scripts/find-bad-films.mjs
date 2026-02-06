/**
 * Script to find films with invisible Unicode characters
 * Run with: node scripts/find-bad-films.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ix9xb2vm',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2023-06-21',
  useCdn: false,
});

async function findBadFilms() {
  try {
    console.log('Fetching all film documents...');
    const films = await client.fetch('*[_type == "film"]');
    
    console.log(`Found ${films.length} film documents\n`);

    let foundBad = false;

    for (const film of films) {
      const fields = ['title', 'cinemaLocation', 'plot', 'personalNotes'];
      
      for (const field of fields) {
        const value = film[field];
        if (value && typeof value === 'string' && value.length > 100) {
          // Check if it has invisible characters
          const cleaned = value
            .replace(/[\u200B-\u200D\uFEFF]/g, '')
            .replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
          
          if (cleaned.length < value.length - 10) {
            console.log(`⚠️  Film: ${film.title || film._id}`);
            console.log(`   Field: ${field}`);
            console.log(`   Original length: ${value.length}`);
            console.log(`   Cleaned length: ${cleaned.length}`);
            console.log(`   Visible text: "${cleaned}"`);
            console.log(`   Document ID: ${film._id}\n`);
            foundBad = true;
          }
        }
      }
    }

    if (!foundBad) {
      console.log('✅ No films with invisible characters found!');
    } else {
      console.log('\n👉 Go to Sanity Studio and manually edit these films to remove the invisible characters');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

findBadFilms();

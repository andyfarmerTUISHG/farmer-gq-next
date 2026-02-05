/**
 * Script to bulk clean invisible Unicode characters from film documents
 * Run with: node scripts/clean-all-films.mjs
 */

import { config } from 'dotenv';
import { createClient } from '@sanity/client';

// Load environment variables from .env.local
config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ix9xb2vm',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2023-06-21',
  useCdn: false,
});

function cleanText(text) {
  if (!text || typeof text !== 'string') return text;
  
  return text
    .trim()
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
}

async function cleanAllFilms() {
  try {
    console.log('Fetching all film documents...');
    const films = await client.fetch('*[_type == "film"]');
    
    console.log(`Found ${films.length} film documents\n`);

    const mutations = [];
    let cleanedCount = 0;

    for (const film of films) {
      const patches = {};
      let needsCleaning = false;

      // Check and clean text fields
      const fields = ['title', 'cinemaLocation', 'plot', 'personalNotes'];
      
      for (const field of fields) {
        const value = film[field];
        if (value && typeof value === 'string') {
          const cleaned = cleanText(value);
          if (cleaned !== value) {
            patches[field] = cleaned;
            needsCleaning = true;
            console.log(`Cleaning ${field} in: ${film.title || film._id}`);
          }
        }
      }

      if (needsCleaning) {
        mutations.push({
          patch: {
            id: film._id,
            set: patches
          }
        });
        cleanedCount++;
      }
    }

    if (mutations.length === 0) {
      console.log('✅ No films need cleaning!');
      return;
    }

    console.log(`\nPreparing to clean ${cleanedCount} films...`);
    console.log('Sending mutations to Sanity...');

    const result = await client.mutate(mutations);
    
    console.log(`\n✅ Successfully cleaned ${cleanedCount} films!`);
    console.log('All invisible characters have been removed.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.statusCode === 403) {
      console.error('\n⚠️  Permission denied. Make sure SANITY_API_WRITE_TOKEN has write permissions.');
    }
  }
}

cleanAllFilms();

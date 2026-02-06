/**
 * Script to clean invisible Unicode characters from Sanity settings
 * Run with: node scripts/clean-settings.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ix9xb2vm',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2023-06-21',
  useCdn: false,
});

async function cleanSettings() {
  try {
    console.log('Fetching settings document...');
    const settings = await client.fetch('*[_type == "settings"][0]');
    
    if (!settings) {
      console.log('No settings document found');
      return;
    }

    console.log('Current defaultCinema:', JSON.stringify(settings.defaultCinema));
    console.log('Length:', settings.defaultCinema?.length);

    if (settings.defaultCinema) {
      // Clean the value
      const cleaned = settings.defaultCinema
        .trim()
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

      console.log('Cleaned value:', JSON.stringify(cleaned));
      console.log('New length:', cleaned.length);

      // Update in Sanity
      await client
        .patch(settings._id)
        .set({ defaultCinema: cleaned })
        .commit();

      console.log('✅ Settings cleaned successfully!');
    } else {
      console.log('No defaultCinema value to clean');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

cleanSettings();

/**
 * Script to check for invisible Unicode characters in ALL settings documents
 * Run with: node scripts/check-settings.mjs
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ix9xb2vm',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2023-06-21',
  useCdn: false,
});

async function checkSettings() {
  try {
    console.log('Fetching all settings documents (including drafts)...');
    const allSettings = await client.fetch('*[_type == "settings"]');
    
    console.log(`Found ${allSettings.length} settings documents\n`);

    for (const settings of allSettings) {
      console.log(`Document ID: ${settings._id}`);
      console.log('Current defaultCinema:', JSON.stringify(settings.defaultCinema));
      console.log('Length:', settings.defaultCinema?.length);

      if (settings.defaultCinema && settings.defaultCinema.length > 20) {
        console.log('⚠️  HAS INVISIBLE CHARACTERS - needs manual cleanup in Studio');
      } else {
        console.log('✅ Clean');
      }
      console.log('---');
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkSettings();

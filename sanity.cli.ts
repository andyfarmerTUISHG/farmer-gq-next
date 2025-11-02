import { defineCliConfig } from "sanity/cli";

// Use process.env directly to avoid environment validation issues during CLI operations
/* eslint-disable node/no-process-env */
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET;
/* eslint-enable node/no-process-env */

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "farmer-gq",
  deployment: {
    appId: "8a5832434ec7e7e69ddee5b4",
  },
  vite: {
    resolve: {
      alias: {
        "@": __dirname,
      },
    },
  },
});

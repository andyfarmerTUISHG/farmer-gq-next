import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import checkFile from "eslint-plugin-check-file";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([{
  ignores: [
    ".next/**",
    "dist/**",
    "node_modules/**",
    "public/studio/**",
    "*.d.ts",
    // TOOO: Remove this when we have a better way to handle this
    "sanity.config.ts",
    "sanity.types.ts",
    "sanity/loader/load-query.ts"
  ],
}, ...nextCoreWebVitals, ...nextTypescript, {
  plugins: {
    "simple-import-sort": simpleImportSort,
    "check-file": checkFile,
  },

  rules: {
    "prefer-arrow-callback": ["error"],
    "prefer-template": ["error"],
    semi: ["error"],
    quotes: ["error", "double"],
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "react-hooks/exhaustive-deps": "error",

    "check-file/filename-naming-convention": [
      "error",
      {
        "**/*.{js,jsx,ts,tsx}": "KEBAB_CASE",
      },
      {
        ignoreMiddleExtensions: true,
      },
    ],

    "check-file/folder-naming-convention": [
      "error",
      {
        "**/!^[.*": "KEBAB_CASE",
      },
    ],
  },
}]);

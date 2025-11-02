// Run this command to generate base config and vs code settings:
// npx @antfu/eslint-config@latest

import antfu from "@antfu/eslint-config";

export default antfu({
  type: "app",
  react: true,
  typescript: true,
  nextjs: true,
  formatters: true,
  // `.eslintignore` is no longer supported in Flat config, use `ignores` instead
  // The `ignores` option in the option (first argument) is specifically treated to always be global ignores
  // And will **extend** the config's default ignores, not override them
  // You can also pass a function to modify the default ignores
  ignores: [
    "**/fixtures",
    ".next/**",
    "dist/**",
    "node_modules/**",
    "public/studio/**",
    "*.d.ts",
    // TOOO: Remove this when we have a better way to handle this
    "next.config.ts",
    "sanity.cli.ts",
    "sanity.config.ts",
    "sanity.types.ts",
    "sanity/loader/load-query.ts",
    "sanity/lib/api.ts",
    "sanity/lib/sanity.client.ts",
    "sanity/lib/token.ts",
  ],
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
}, {
  rules: {
    "ts/no-redeclare": "off",
    "ts/consistent-type-definitions": ["error", "type"],
    "no-console": ["warn"],
    "antfu/no-top-level-await": ["off"],
    "node/prefer-global/process": ["off"],
    "node/no-process-env": ["error"],
    "perfectionist/sort-imports": ["error", {
      tsconfigRootDir: ".",
    }],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md"],
    }],
  },
});

// import path from "node:path";
// import { fileURLToPath } from "node:url";

// import { defineConfig } from "eslint/config";
// import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
// import nextTypescript from "eslint-config-next/typescript";
// import checkFile from "eslint-plugin-check-file";
// import simpleImportSort from "eslint-plugin-simple-import-sort";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// export default defineConfig([{
//   ignores: [
//     ".next/**",
//     "dist/**",
//     "node_modules/**",
//     "public/studio/**",
//     "*.d.ts",
//     // TOOO: Remove this when we have a better way to handle this
//     "sanity.config.ts",
//     "sanity.types.ts",
//     "sanity/loader/load-query.ts"
//   ],
// }, ...nextCoreWebVitals, ...nextTypescript, {
//   plugins: {
//     "simple-import-sort": simpleImportSort,
//     "check-file": checkFile,
//   },

//   rules: {
//     "prefer-arrow-callback": ["error"],
//     "prefer-template": ["error"],
//     semi: ["error"],
//     quotes: ["error", "double"],
//     "simple-import-sort/imports": "warn",
//     "simple-import-sort/exports": "warn",
//     "react-hooks/exhaustive-deps": "error",

//     "check-file/filename-naming-convention": [
//       "error",
//       {
//         "**/*.{js,jsx,ts,tsx}": "KEBAB_CASE",
//       },
//       {
//         ignoreMiddleExtensions: true,
//       },
//     ],

//     "check-file/folder-naming-convention": [
//       "error",
//       {
//         "**/!^[.*": "KEBAB_CASE",
//       },
//     ],
//   },
// }]);

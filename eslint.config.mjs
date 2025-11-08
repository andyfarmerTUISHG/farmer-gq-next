// Run this command to generate base config and vs code settings:
// npx @antfu/eslint-config@latest

import antfu from "@antfu/eslint-config";

export default antfu({
  type: "app",
  react: true,
  typescript: true,
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
  ignores: [
    ".next/**",
    ".sanity/**",
    "dist/**",
    "node_modules/**",
    "public/studio/**",
    "*.d.ts",
    // TOOO: Remove this when we have a better way to handle this
    "sanity.config.ts",
    "sanity.types.ts",
    "sanity/loader/load-query.ts",
  ],
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

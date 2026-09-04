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
    ".kiro/**",
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
      type: "natural",
      order: "asc",
    }],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md"],
      // Allow __tests__ directories (Jest/Vitest convention)
    }],
  },
}, {
  // __tests__ directories are a Jest/Vitest convention — exempt from kebab-case rule
  files: ["**/__tests__/**"],
  rules: {
    "unicorn/filename-case": "off",
  },
}, {
  // Next.js dynamic route segments use camelCase bracket syntax e.g. [chapterSlug]
  files: ["**/\\[*[A-Z]*\\]/**", "**/\\[*[A-Z]*\\]*"],
  rules: {
    "unicorn/filename-case": "off",
  },
}, {
  // Scripts run directly with Node — process.env and console are intentional
  files: ["scripts/**"],
  rules: {
    "node/no-process-env": "off",
    "no-console": "off",
    "no-control-regex": "off",
    "no-unused-vars": "off",
  },
}, {
  // Auth lib files use process.env intentionally (Better Auth requires it)
  files: ["lib/auth.ts", "lib/auth-client.ts", "lib/server-auth.ts"],
  rules: {
    "node/no-process-env": "off",
  },
}, {
  // Sanity document actions use hooks in a non-standard pattern that ESLint doesn't recognise
  // react-hooks/rules-of-hooks is not available as a named rule in this config — disable via comment in file
  files: ["sanity/actions/**"],
  rules: {
    "react/rules-of-hooks": "off",
  },
});

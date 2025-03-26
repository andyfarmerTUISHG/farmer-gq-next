import { defineConfig } from "eslint/config";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import checkFile from "eslint-plugin-check-file";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("next/core-web-vitals", "next/typescript", "prettier"),

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

        "check-file/filename-naming-convention": ["error", {
            "**/*.{js,jsx,ts,tsx}": "KEBAB_CASE",
        }, {
            ignoreMiddleExtensions: true,
        }],

        "check-file/folder-naming-convention": ["error", {
            "**/!^[.*": "KEBAB_CASE",
        }],
    },
}]);
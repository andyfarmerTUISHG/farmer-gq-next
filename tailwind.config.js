// tailwind.config.js
// HeroUI v3 uses CSS-first theming - no plugin required.
// Tailwind v4 configuration is handled via globals.css @theme directives.

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
};

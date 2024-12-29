/** @type {import("prettier").Config} */
export default {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-astro",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-astro-organize-imports",
  ],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
  semi: false, // No semicolons
  singleQuote: false, // Use double quotes
  tabWidth: 2, // Tab space of 2
  useTabs: false, // Use spaces instead of tabs
  trailingComma: "es5", // Include trailing commas where valid in ES5
  bracketSpacing: true, // Spaces between brackets
  arrowParens: "always", // Include parentheses for single-arg arrow functions

  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@core/(.*)$",
    "^@server/(.*)$",
    "^@/(lib|utils|content)/(.*)$",
    "^@/components/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}

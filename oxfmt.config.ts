import { defineConfig } from "oxfmt";

export default defineConfig({
  printWidth: 100,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  sortTailwindcss: {
    stylesheet: "./src/styles.css",
  },
  sortImports: true,
  ignorePatterns: [
    "**/dist/**",
    "**/.output/**",
    "**/.wrangler/**",
    "src/routeTree.gen.ts",
    "worker-configuration.d.ts",
  ],
});

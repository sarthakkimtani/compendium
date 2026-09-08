import { defineConfig } from "oxlint";

export default defineConfig({
  plugins: ["react", "typescript", "unicorn", "import"],
  categories: {
    correctness: "error",
    suspicious: "warn",
    perf: "warn",
  },
  env: {
    browser: true,
    es2026: true,
    worker: true,
  },
  rules: {
    "typescript/no-unused-vars": "error",
    "typescript/consistent-type-imports": "error",
    "react/react-in-jsx-scope": "off",
    "unicorn/no-null": "off",
    "import/no-cycle": "error",
  },
  ignorePatterns: [
    "**/dist/**",
    "**/.output/**",
    "**/.wrangler/**",
    "**/node_modules/**",
    "src/routeTree.gen.ts",
    "worker-configuration.d.ts",
  ],
});

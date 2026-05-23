import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { ignores: ["dist/", "coverage/"] },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["tests/**/*.js"],
    languageOptions: { globals: globals.jest },
  },
]);

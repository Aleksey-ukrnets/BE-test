
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      react: eslintPluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: [".eslintrc.{js,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
    },
  },
];

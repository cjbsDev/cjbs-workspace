module.exports = {
  extends: ["next", "turbo", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};

// module.exports = {
//   root: true,
//   // This tells ESLint to load the config from the package `eslint-config-custom`
//   extends: ["custom"],
//   settings: {
//     next: {
//       rootDir: ["apps/*/"],
//     },
//   },
// };


module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: ["@repo/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};

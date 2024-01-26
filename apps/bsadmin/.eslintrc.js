// module.exports = {
//   root: true,
//   extends: ["custom/next"],
// };


module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};

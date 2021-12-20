module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: ["airbnb-base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: 0,
    "no-plusplus": 0,
    "no-console": 0,
    "implicit-arrow-linebreak": 0,
    "function-paren-newline": 0,
    "comma-dangle": 0,
    "operator-linebreak": 0,
  },
};

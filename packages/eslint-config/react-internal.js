const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo"
  ],
  plugins: ["only-warn"],
  globals: {
    React: "writable",
    JSX: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
    'tailwind.config.js',
    'next.config.js',
    'postcss.config.js'
  ],
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ["*.js?(x)", "*.ts?(x)"] },
  ],
  rules: {
    'no-unused-vars': 'off', // Disable the base rule
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  }
};

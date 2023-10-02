/* eslint-env node */

module.exports = {
  root: true,
  ignorePatterns: ["vite.config.ts"],
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh'],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "comma-dangle": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/comma-dangle": ["error", "never"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "quotes": ["error", "double"],
    "arrow-body-style": ["error", "as-needed"],
    'react-refresh/only-export-components': [
      'off',
      { allowConstantExport: true },
    ],
  },
}

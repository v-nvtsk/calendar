module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ["airbnb-base", "airbnb-typescript/base", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@stylistic/eslint-plugin-ts", "@typescript-eslint"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.eslint.json", "./tsconfig.json"],
    tsconfigRootDir: __dirname,
  },
  rules: {
    "import/no-unresolved": "off",
    "import/extensions": ["warn", "never"],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.d.ts",
          "**/*.{test,spec,types}.{ts,tsx}",
          "**/test-*.{ts,tsx}",
          "**/jest-setup.ts",
          "./webpack.config.js",
          "playwright.config.ts",
        ],
      },
    ],
    "import/prefer-default-export": "off",
    "max-len": [
      "error",
      {
        code: 120,
        comments: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
  ignorePatterns: ["node_modules", ".git", "coverage", "dist"],
};

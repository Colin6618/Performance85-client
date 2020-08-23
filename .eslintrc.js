module.exports = {
  extends: ["react-app"],
  rules: {
    // enable additional rules
    // "indent": ["error", 4],
    "linebreak-style": ["error", "unix"],
    // "quotes": ["error", "double"],
    // "semi": ["error", "always"],

    // override default options for rules from base configurations
    // "comma-dangle": ["error", "always"],
    // "no-cond-assign": ["error", "always"],

    // disable rules from base configurations
    // "no-console": "off",
    "react-hooks/exhaustive-deps": "off", 
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        // typescript-eslint specific options
        warnOnUnsupportedTypeScriptVersion: true,
      },
      plugins: ["@typescript-eslint"],
      rules: {
        "@typescript-eslint/consistent-type-assertions": "off",
        "no-useless-rename": "off",
        "@typescript-eslint/no-unused-vars": "off",
      },
    },
  ],
};

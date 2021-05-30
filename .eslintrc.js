'user string';

module.exports = {
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'camelcase': 0,
    'curly': ['error', 'multi-line'],
    'global-require': 'error',
    'max-nested-callbacks': 0,
    'no-extra-parens': ['error', 'functions'],
    'no-magic-numbers': 0,
    'one-var': ['error', 'never'],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js"]
      }
    }
  }
};

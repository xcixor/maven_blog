module.exports = {
  env: {
    node: true,
    es2021: true,
    mocha: true
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': 0
  },
};

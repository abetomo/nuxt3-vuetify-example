module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  parserOptions: {
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ]
}

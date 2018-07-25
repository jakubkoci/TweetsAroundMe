module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'react', 'jsx-a11y', 'import'],
  rules: {
    'no-use-before-define': 'off', // http://eslint.org/docs/rules/no-use-before-define because of top-bottom
    'react/sort-comp': [
      1,
      {
        order: ['static-methods', 'lifecycle', 'everything-else', 'render'],
      },
    ],
    'import/extensions': ['error', { json: 'always', css: 'always' }],
    'import/prefer-default-export': 'off',
    'react/prop-types': 'off', // because of Flow types instead of prop-types
    'react/jsx-filename-extension': 'off',
  },
  globals: {
    fetch: false,
    navigator: false,
  },
}

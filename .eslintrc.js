module.exports = {
  extends: [
    'standard-with-typescript',
    'prettier',
    'plugin:sonarjs/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/method-signature-style': 'off',
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
          'unknown',
        ],
        'newlines-between': 'always',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: 'package/*/tsconfig.json',
      },
    },
  },
}

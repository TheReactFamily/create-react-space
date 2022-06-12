export const ESLINT_FILE_NAME = '.eslintrc.json';

export const ESLINT_CONFIGURATION = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['react-app'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint']
};

export const ESLINT_RULES_JS = {
  'no-unused-vars': 'warn',
  'react/default-props-match-prop-types': 'warn',
  'react/no-unused-prop-types': 'warn'
};

export const ESLINT_RULES_TS = {
  '@typescript-eslint/no-unused-vars': 'warn',
  'react-hooks/exhaustive-deps': 'warn',
  'react-hooks/rules-of-hooks': 'error',
  'react/jsx-key': 'error',
  'react/jsx-no-duplicate-props': 'error',
  'react/jsx-no-target-blank': 'error',
  'react/jsx-no-undef': 'warn',
  'react/jsx-no-useless-fragment': 'error',
  'react/jsx-sort-default-props': 'warn',
  'react/jsx-sort-props': 'warn',
  'react/jsx-uses-react': 'warn',
  'react/jsx-uses-vars': 'warn',
  'react/no-array-index-key': 'error',
  'react/no-deprecated': 'error',
  'react/no-direct-mutation-state': 'error',
  'react/no-multi-comp': 'error',
  'react/no-unused-state': 'warn',
  semi: ['error', 'always']
};

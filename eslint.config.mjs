import eslint from '@eslint/js';
import globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import tsdoc from 'eslint-plugin-tsdoc';
import tseslint from 'typescript-eslint';

export default [
  eslint.configs.recommended,
  stylistic.configs['recommended'],
  {
    ignores: ['node_modules/*', 'docs/*', '**/*.min.js', '**/*.min.mjs'],
  },
  {
    languageOptions: {
      ecmaVersion: 2016,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/max-len': ['warn', { ignoreUrls: true }],
    },
  },

  // TypeScript
  // https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin/src/configs
  tseslint.configs.base,
  tseslint.configs.eslintRecommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    plugins: {
      tsdoc: tsdoc,
    },
    languageOptions: {
      parserOptions: {
        project: './tsconfig.base.json',
      },
    },
    rules: {
      ...tseslint.configs.strictTypeChecked[2].rules,
      ...tseslint.configs.stylisticTypeChecked[2].rules,
      'tsdoc/syntax': 'warn',
    },
  },
];

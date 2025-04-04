import type { Linter } from 'eslint'
import { CONFIG_PREFIX } from '../constants'
import globals from 'globals'

export async function javascript(): Promise<Linter.Config[]> {
  return [{
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      sourceType: 'module',
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    name: `${CONFIG_PREFIX}/javascript/setup`,
  },
  {
    name: `${CONFIG_PREFIX}/javascript/rules`,
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-lone-blocks': 'error',
      'no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: true,
      }],
    },
  },
  ]
}
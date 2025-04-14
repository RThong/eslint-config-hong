import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export function javascript (): TypedFlatConfigItem {
  return {
    rules: {
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-lone-blocks': 'error',
      'no-unused-expressions': ['error', {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: true,
      }],
      'no-var': 'error',
      'prefer-const': [
        'error',
        {
          destructuring: 'all',
          ignoreReadBeforeAssign: true,
        },
      ],
    },
  }
}

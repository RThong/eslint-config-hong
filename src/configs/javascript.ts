import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export function javascript (): TypedFlatConfigItem {
  return {
    rules: {
      'no-console': 'off',
      'no-debugger': 'off',
      'no-lone-blocks': 'off',
      'no-unused-expressions': [ 'error', { // 未使用表达式是否有效的规则
        allowShortCircuit: true,
        allowTernary: true,
      }],
    },
  }
}

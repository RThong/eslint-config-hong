import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export function imports (): TypedFlatConfigItem {
  return {
    rules: {
      'import/first': 'off',
    },
  }
}

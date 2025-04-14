import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export function style (): TypedFlatConfigItem {
  return {
    rules: {
      'style/semi': ['error', 'never'],
      'style/semi-spacing': 'error',
      'style/quotes': ['error', 'single'],
      'style/rest-spread-spacing': ['error', 'never'],
      'style/computed-property-spacing': ['error', 'never'],
      'style/space-before-function-paren': ['error', 'always'],
      'style/indent': ['error', 2, {
        SwitchCase: 1,
        ignoredNodes: ['TemplateLiteral'],
      }],
      'style/template-tag-spacing': 'error',
      'style/switch-colon-spacing': 'error',
      'curly': ['error', 'all'],
    },
  }
}

import { Linter } from 'eslint'

import { interopDefault } from '../utils'
import { CONFIG_PREFIX } from 'src/constants'

export async function stylistic(): Promise<Linter.Config[]> {
  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

  return [
    {
      name: `${CONFIG_PREFIX}/stylistic/rules`,
      plugins: {
        style: pluginStylistic,
      },
      rules: {
        'style/semi': ['error', 'never'],
        'style/semi-spacing': 'error',
        'style/quotes': ['error', 'single'],
        'style/rest-spread-spacing': ['error', 'never'],
        'style/computed-property-spacing': ['error', 'never'],
        'style/space-before-function-paren': ['error', 'always'],
        'style/indent': ['error', 2, {
          SwitchCase: 1,
          ignoredNodes: ['TemplateLiteral']
        }],
        'style/template-tag-spacing': 'error',
        'style/switch-colon-spacing': 'error',
      },
    },
  ]
}

import { Linter } from 'eslint'
import { pluginAntfu } from '../plugins'

import { interopDefault } from '../utils'
import { CONFIG_PREFIX } from '../constants'
import { StylisticConfig } from '../types'

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 2,
  jsx: true,
  quotes: 'single',
  semi: false,
}

export async function stylistic(): Promise<Linter.Config[]> {
  const {
    indent,
    jsx,
    // overrides = {},
    quotes,
    semi,
  } = {
    ...StylisticConfigDefaults,
    // ...options,
  }

  const pluginStylistic = await interopDefault(import('@stylistic/eslint-plugin'))

  const config = pluginStylistic.configs.customize({
    indent,
    jsx,
    pluginName: 'style',
    quotes,
    semi,
  })

  return [
    {
      name: `${CONFIG_PREFIX}/stylistic/rules`,
      plugins: {
        style: pluginStylistic,
        antfu: pluginAntfu,
      },
      rules: {
        ...config.rules,
        'antfu/consistent-chaining': 'error',
        'antfu/consistent-list-newline': 'error',

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
    },
  ]
}

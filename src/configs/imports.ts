import type { Linter } from 'eslint'
import { CONFIG_PREFIX } from '../constants'
import { pluginImport } from '../plugins'

export async function imports (): Promise<Linter.Config[]> {
  return [
    {
      name: `${CONFIG_PREFIX}/imports/rules`,
      plugins: {
        import: pluginImport as any,
      },
      rules: {
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-mutable-exports': 'error',
        'import/no-named-default': 'error',
        'import/no-self-import': 'error',
        'import/no-webpack-loader-syntax': 'error',

        'import/newline-after-import': ['error', { count: 1 }],
      },
    },
  ]
}

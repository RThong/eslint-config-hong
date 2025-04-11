import { CONFIG_PREFIX } from '../constants'
import { interopDefault, renameRules } from '../utils'
import { Linter } from 'eslint'
import { GLOB_TS, GLOB_TSX } from '../globs'

export async function typescript (): Promise<Linter.Config[]> {
  const [
    pluginTs,
    parserTs,
  ] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  const files = [
    GLOB_TS,
    GLOB_TSX,
  ]

  return [
    {
      name: `${CONFIG_PREFIX}/typescript/setup`,
      plugins: {
        ts: pluginTs as any,
      },
      files,
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          sourceType: 'module',
        },
      },
    },

    {
      files,
      name: `${CONFIG_PREFIX}/typescript/rules`,
      rules: {
        // 规则的@typescript-eslint前缀 改为 ts，匹配plugins的定义
        ...renameRules(
          pluginTs.configs['eslint-recommended'].overrides![0].rules!,
          { '@typescript-eslint': 'ts' },
        ),
        ...renameRules(
          pluginTs.configs.strict.rules!,
          { '@typescript-eslint': 'ts' },
        ),

        'ts/no-explicit-any': 'off',
        'ts/no-non-null-assertion': 'off',
        'ts/no-empty-object-type': ['error', { allowInterfaces: 'always' }],
        'ts/consistent-type-imports': ['error', {
          disallowTypeAnnotations: false,
          fixStyle: 'separate-type-imports',
          prefer: 'type-imports',
        }],
      },
    },
  ]
}

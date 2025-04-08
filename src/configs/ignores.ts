import { GLOB_EXCLUDE } from '../globs'
import { Linter } from 'eslint'
import { CONFIG_PREFIX } from '../constants'

export async function ignores (userIgnores: string[] = []): Promise<Linter.Config[]> {
  return [
    {
      ignores: [
        ...GLOB_EXCLUDE,
        ...userIgnores,
      ],
      name: `${CONFIG_PREFIX}/ignores`,
    },
  ]
}

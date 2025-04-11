import { Linter } from 'eslint'
import { javascript, stylistic, typescript, ignores, vue } from './configs'
import { Awaitable } from './types'
import { combine } from './utils'

export async function lintFactory (options: Linter.Config = {}, ...userConfigs: Linter.Config[]) {
  const configs: Awaitable<Linter.Config[]>[] = []

  configs.push(ignores(), javascript(), stylistic(), typescript(), vue(), userConfigs)

  const res = await combine(...configs)

  // console.log('【res--------', res)
  return res
}

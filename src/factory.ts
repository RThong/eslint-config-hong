import { Linter } from 'eslint'
import { javascript, stylistic, typescript } from './configs'
import { Awaitable } from './types'
import { combine } from './utils'

export async function lintFactory (options: Linter.Config = {}, 
  ...userConfigs: Linter.Config[]
) {
  const configs: Awaitable<Linter.Config[]>[] = []

  configs.push(javascript(), stylistic(), typescript(), userConfigs)

  const res = await combine(...configs)
  // console.log('【res---------',res)
  return res
}

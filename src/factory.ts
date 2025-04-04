import { Linter } from 'eslint'
import { javascript, stylistic } from './configs'
import { Awaitable } from './types'
import { combine } from './utils'

export async function lintFactory() {
  const configs: Awaitable<Linter.Config<Linter.RulesRecord>[]>[] = []

  configs.push(javascript(), stylistic())

  return combine(...configs)
}

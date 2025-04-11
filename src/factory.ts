import type { Linter } from 'eslint'
import { javascript, stylistic, typescript, ignores, vue } from './configs'
import type { Awaitable, OptionsConfig } from './types'
import { combine, resolveSubOptions } from './utils'
import { isPackageExists } from 'local-pkg'

const VuePackages = [
  'vue',
]

export async function lintFactory (options: OptionsConfig & Linter.Config = {}, ...userConfigs: Linter.Config[]) {
  const {
    // gitignore: enableGitignore = true,
    // jsx: enableJsx = true,
    // react: enableReact = false,
    // typescript: enableTypeScript = isPackageExists('typescript'),
    vue: enableVue = VuePackages.some(i => isPackageExists(i)),
  } = options

  const configs: Awaitable<Linter.Config[]>[] = []

  configs.push(ignores(), javascript(), stylistic(), typescript())

  if (enableVue) {
    configs.push(vue({
      ...resolveSubOptions(options, 'vue'),
    }))
  }

  configs.push(userConfigs)

  const res = await combine(...configs)

  // console.log('【res--------', res)
  return res
}

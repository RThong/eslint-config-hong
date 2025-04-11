import type { Linter } from 'eslint'
import type { Awaitable, OptionsConfig } from './types'
import { isPackageExists } from 'local-pkg'
import { ignores, javascript, node, stylistic, typescript, vue } from './configs'
import { imports } from './configs/imports'
import { perfectionist } from './configs/perfectionist'
import { combine, resolveSubOptions } from './utils'

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

  configs.push(
    ignores(),
    javascript(),
    node(),
    stylistic(),
    typescript(),
    imports(),
    perfectionist(),
  )

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

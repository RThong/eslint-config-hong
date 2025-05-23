import antfu, { GLOB_MARKDOWN } from '@antfu/eslint-config'
import { imports, javascript, style, vue } from './configs'

export default function hong (...args: Parameters<typeof antfu>): ReturnType<typeof antfu> {
  const [ options = {}, ...configs ] = args

  const ignores = [ ...(options.ignores ?? []), GLOB_MARKDOWN ]

  return antfu(
    {
      isInEditor: false,
      formatters: true,
      yaml: false,
      markdown: false,
      toml: false,
      ...options,
      ignores
    },
    javascript(),
    imports(),
    style(),
    vue(),
    ...configs,
  )
}

import antfu from '@antfu/eslint-config'
import { imports, javascript, style, vue } from './configs'

export default function hong (...args: Parameters<typeof antfu>): ReturnType<typeof antfu> {
  const [options = {}, ...configs] = args

  return antfu(
    {
      isInEditor: false,
      formatters: true,
      ...options,
    },
    javascript(),
    style(),
    vue(),
    imports(),
    ...configs,
  )
}

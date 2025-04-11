import fs from 'node:fs/promises'

import { flatConfigsToRulesDTS } from 'eslint-typegen/core'

import { builtinRules } from 'eslint/use-at-your-own-risk'
import { combine } from 'src/utils'
import { imports, javascript, node, perfectionist, stylistic, typescript, vue } from '../src'

const configs = await combine(
  // 生成eslint rules的类型
  {
    plugins: {
      '': {
        rules: Object.fromEntries(builtinRules.entries()),
      },
    },
  },
  javascript(),
  stylistic(),
  typescript(),
  node(),
  vue(),
  imports(),
  perfectionist(),

)

const dts = await flatConfigsToRulesDTS(configs, {
  // includeAugmentation: false,
})

await fs.writeFile('src/typegen.d.ts', dts)

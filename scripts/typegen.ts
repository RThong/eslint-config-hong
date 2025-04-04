import fs from 'node:fs/promises'

import { flatConfigsToRulesDTS } from 'eslint-typegen/core'

import { javascript, stylistic } from '../src'
import { combine } from 'src/utils'
import { builtinRules } from 'eslint/use-at-your-own-risk'

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
)

let dts = await flatConfigsToRulesDTS(configs, {
  // includeAugmentation: false,
})

await fs.writeFile('src/typegen.d.ts', dts)

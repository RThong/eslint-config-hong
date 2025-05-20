import type { TypedFlatConfigItem } from '@antfu/eslint-config'

export function style (): TypedFlatConfigItem {
  const INDENT = 2

  return {
    rules: {
      'antfu/top-level-function': 'off', // 关闭必须用function声明函数

      'style/template-tag-spacing': 'error',
      'style/switch-colon-spacing': 'error',
      'style/semi': [ 'error', 'never' ],
      'style/semi-spacing': 'error',
      'style/quotes': [ 'error', 'single' ],
      'style/rest-spread-spacing': [ 'error', 'never' ],
      'style/computed-property-spacing': [ 'error', 'never' ],
      'style/space-before-function-paren': [ 'error', 'always' ], // 定义 function 括号前必需加空格
      'style/indent': [ 'error', INDENT, {
        SwitchCase: 1,
        ignoredNodes: [ 'TemplateLiteral' ], // see https://github.com/babel/babel-eslint/issues/681#issuecomment-451336031
      }],

      'style/comma-dangle': 'off', // 尾行逗号检查
      'style/block-spacing': 'error',
      'style/quote-props': [ 'error', 'consistent-as-needed' ], // 在同一对象中，所有属性使用一致的引号
      'style/space-infix-ops': 'error', // 单位与单位间需要空格
      'style/key-spacing': [ 'error', {
        beforeColon: false,
        afterColon: true,
      }],
      'style/keyword-spacing': [ 'error', { before: true }],
      'style/arrow-spacing': [ 'error', { // 箭头(=>)左右空格规则
        before: true,
        after: true,
      }],
      'style/comma-spacing': [ 'error', { // 逗号前后空格规则
        before: false,
        after: true,
      }],
      'style/func-call-spacing': [ 'error', 'never' ],
      'style/template-curly-spacing': [ 'error', 'never' ], // 模版字符串中的空格规则
      'style/array-bracket-spacing': [ 'error', 'always', { // 数组左右括号空格规则
        arraysInArrays: false,
        objectsInArrays: false,
      }],
      'style/object-curly-spacing': [ 'error', 'always', { // 对象左右括号空格规则
        arraysInObjects: false,
        objectsInObjects: false,
      }],
    },
  }
}

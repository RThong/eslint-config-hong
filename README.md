# eslint-config-hong

在 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 的基础上，分场景维护公司级别的rule

## 核心

### 1. 模块化的规则管理

- 按场景分类管理规则：
  ```
  src/configs/
  ├── javascript.ts  # JavaScript 规则
  ├── vue.ts        # Vue 规则
  ├── style.ts      # 代码风格规则
  └── imports.ts    # 导入规则
  ```
- 每个规则集都是独立维护的函数，便于维护和扩展
- 团队成员可以轻松找到并修改特定场景的规则

### 2. 完善的测试机制

- 包含完整的测试用例
- 每个规则修改都可以立即验证效果
- 新增规则时有明确的验证流程

### 3. 类型支持

- 使用 TypeScript 编写，提供完整的类型定义
- 可以通过查看rule定义来马上查看其含义

### 4. 开发工具支持

- 使用 @eslint/config-inspector 查看当前配置下所有生效的rule


| 特性 | 传统组织内 ESLint 配置 | eslint-config-hong |
|------|----------------------|-------------------|
| 规则管理 | 所有规则集中在单个文件中 | 按场景模块化管理（JavaScript/Vue/Style/Imports） |
| 规则验证 | 需要在实际项目中验证效果 | 完善的测试用例，可立即验证效果 |
| 类型支持 | 缺乏类型提示和检查 | 完整的 TypeScript 类型支持 |
| 规则注释 | 需要额外添加注释解释规则含义 | 通过 TypeScript 类型定义直接查看规则说明
| 配置方式 | 传统的 `.eslintrc` 配置 | eslint V9 的 Flat Config 配置 |

## 使用特点

### 1. 去除prettier，只用eslint，样式类rule使用[ESLint Stylistic](https://github.com/eslint-stylistic/eslint-stylistic)

### 2. 可配置式，动态引入rule，目前公司内的自意义规则中没有加入react

### 3. 使用eslint v9 的 [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new)

## 使用

```ts
// eslint.config.ts
import hong from 'eslint-config-hong'

export default hong()
```
### [具体自定义配置](https://github.com/antfu/eslint-config?tab=readme-ov-file#customization)

在@antfu/eslint-config的基础上，增加了以下配置：
```ts
{
  isInEditor: false,
  formatters: true,
  yaml: false,
  markdown: false,
  toml: false
}
```

### [IDE 支持](https://github.com/antfu/eslint-config?tab=readme-ov-file#ide-support-auto-fix-on-save)

## 项目结构

### fixtures
测试用例相关文件：
- `input/`: 待测试的原始文件
  - 包含各种场景的测试文件（JavaScript、TypeScript、Vue等）
- `output/`: 预期的格式化结果
  - 按测试用例名称分类
  - 用于与实际格式化结果进行对比验证

### test
测试相关代码：
- `fixtures.test.ts`: 测试用例执行文件
  - `runWithConfig`: 执行具体的测试用例
  - 参数对应 `fixtures/output` 下的目录名
  - 自动执行 ESLint 格式化并与预期结果对比

### _fixtures
测试执行时的临时目录：
- 存放测试过程中生成的格式化后的文件
- 用于与 `fixtures/output` 中的预期结果进行对比
- 测试基于构建后（`dist/`）的规则执行

### src/configs

具体规则配置文件


## 开发指南

### 1. 开发流程

在开发新规则或修改现有规则时，可以通过以下流程快速验证效果：

1. 修改规则配置
   - 在 `src/configs/` 下找到对应的规则文件（如 `javascript.ts`、`vue.ts` 等）
   - 添加或修改目标规则

2. 实时验证效果
   - 项目使用源码方式引入 `eslint.config.ts`
   - 注释掉 `eslint.config.ts` 中的 `ignores` 配置：
   ```ts
   export default hong({
     ignores: [
       // 'fixtures', // 注释掉这行
       // '_fixtures', // 注释掉这行
     ],
   })

3. 此时可以直接在 fixtures/input 目录下的原始文件中实时查看规则效果

4. 可对fixtures目录下的原始文件或者目标文件进行修改，以匹配新的rule，并执行测试用例

5. 提交变更

- 确保所有测试通过
- 提交代码时记得恢复 eslint.config.ts 中的 ignores 配置
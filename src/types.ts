import { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'

export type Awaitable<T> = T | Promise<T>

export interface StylisticConfig
  extends Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'jsx' | 'semi'> {
}

export interface OptionsConfig {
  /**
   * Enable Vue support.
   *
   * @default auto-detect based on the dependencies
   */
  vue?: boolean | OptionsVue
}

export interface OptionsVue {
  /**
   * Vue version. Apply different rules set from `eslint-plugin-vue`.
   *
   * @default 3
   */
  vueVersion?: 2 | 3
}

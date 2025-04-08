import { StylisticCustomizeOptions } from '@stylistic/eslint-plugin'

export type Awaitable<T> = T | Promise<T>

export interface StylisticConfig
  extends Pick<StylisticCustomizeOptions, 'indent' | 'quotes' | 'jsx' | 'semi'> {
}
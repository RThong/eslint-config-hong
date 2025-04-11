import type { Linter } from 'eslint'
import type { Awaitable, OptionsConfig } from './types'

/**
 * Combine array and non-array configs into a single array.
 */
export async function interopDefault<T> (m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m
  return (resolved as any).default ?? resolved
}

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine (...configs: Awaitable<Linter.Config | Linter.Config[]>[]): Promise<Linter.Config[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}

/**
 * Rename plugin prefixes in a rule object.
 * Accepts a map of prefixes to rename.
 *
 * @example
 * ```ts
 *
 * export default [{
 *   rules: renameRules(
 *     {
 *       '@typescript-eslint/indent': 'error'
 *     },
 *     { '@typescript-eslint': 'ts' }
 *   )
 * }]
 * ```
 */
export function renameRules (
  rules: Record<string, any>,
  map: Record<string, string>,
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(rules)
      .map(([key, value]) => {
        for (const [from, to] of Object.entries(map)) {
          if (key.startsWith(`${from}/`)) {
            return [to + key.slice(from.length), value]
          }
        }
        return [key, value]
      }),
  )
}

export type ResolvedOptions<T> = T extends boolean
  ? never
  : NonNullable<T>

export function resolveSubOptions<K extends keyof OptionsConfig> (
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean'
    ? {} as any
    : options[key] ?? {} as any
}

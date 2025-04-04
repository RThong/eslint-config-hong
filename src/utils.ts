import { Linter } from "eslint"
import { Awaitable } from "./types"

/**
 * Combine array and non-array configs into a single array.
 */
export async function interopDefault<T>(m: Awaitable<T>): Promise<T extends { default: infer U } ? U : T> {
  const resolved = await m;
  return (resolved as any).default ?? resolved
}

/**
 * Combine array and non-array configs into a single array.
 */
export async function combine(...configs: Awaitable<Linter.Config | Linter.Config[]>[]): Promise<Linter.Config[]> {
  const resolved = await Promise.all(configs)
  return resolved.flat()
}

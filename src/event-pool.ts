import type { Callback } from './callback'

export interface EventPool<TArgs extends unknown[]> {
  on(handler: Callback<TArgs>): Callback<TArgs>
  once(handler: Callback<TArgs>): Callback<TArgs>
  off(handler: Callback<TArgs>): void
  clear(): void
}

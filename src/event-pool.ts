import type { Callback } from './callback'

export interface EventPool<TArgs extends unknown[]> {
  readonly size: number

  on(handler: Callback<TArgs>): Callback<TArgs>
  once(handler: Callback<TArgs>): Callback<TArgs>
  off(handler: Callback<TArgs>): void
  offAll(): void
}

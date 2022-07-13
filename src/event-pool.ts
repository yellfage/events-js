import type { Callback } from './callback'

export interface EventPool<TArgs extends unknown[]> {
  readonly size: number

  on(handler: Callback<TArgs>): () => void
  once(handler: Callback<TArgs>): () => void
  off(handler: Callback<TArgs>): void
  offAll(): void
}

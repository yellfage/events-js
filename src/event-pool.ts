import type { Callback } from './callback'

export interface EventPool<THandler extends Callback> {
  add(handler: THandler): THandler
  remove(handler: THandler): void
  clear(): void
}

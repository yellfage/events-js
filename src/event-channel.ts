import type { Callback } from './callback'

import type { EventPool } from './event-pool'

export interface EventChannel<THandler extends Callback>
  extends EventPool<THandler> {
  clone(): EventChannel<THandler>
  emit(...args: Parameters<THandler>): void
  emitSequentially(...args: Parameters<THandler>): Promise<void>
}

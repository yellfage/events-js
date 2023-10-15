import type { Listeners } from './listeners'
import type { AnyListener } from './any-listener'

/**
 * Sequentially calls all provided listeners with specific arguments.
 * @param listeners The listeners.
 * @param args The args.
 * @param signal The abort signal
 */
export async function emitSequentially<T extends AnyListener>(
  listeners: Listeners<T>,
  args: Parameters<T>,
  signal?: AbortSignal,
): Promise<void> {
  await Array.from(listeners.values()).reduce(async (promise, listener) => {
    await promise.then(async () => {
      signal?.throwIfAborted()

      await listener(...args)
    })
  }, Promise.resolve())
}

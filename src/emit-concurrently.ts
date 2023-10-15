import type { Listeners } from './listeners'
import type { AnyListener } from './any-listener'

/**
 * Concurrently calls all provided listeners with the specified arguments.
 * @param listeners The listeners.
 * @param args The args.
 */
export async function emitConcurrently<T extends AnyListener>(
  listeners: Listeners<T>,
  args: Parameters<T>,
): Promise<void> {
  await Promise.all(
    Array.from(listeners.values()).map(async (listener) => listener(...args)),
  )
}

import type { Callback } from './callback'

import type { EventPool } from './event-pool'

export class EventChannel<THandler extends Callback>
  implements EventPool<THandler>
{
  private readonly handlers: Set<THandler>

  public constructor(handlers: THandler[] | Set<THandler> = []) {
    this.handlers = new Set(handlers)
  }

  public add(handler: THandler): THandler {
    this.handlers.add(handler)

    return handler
  }

  public remove(handler: THandler): void {
    this.handlers.delete(handler)
  }

  public clear(): void {
    this.handlers.clear()
  }

  public clone(): EventChannel<THandler> {
    return new EventChannel(this.handlers)
  }

  public emit(...args: Parameters<THandler>): void {
    this.handlers.forEach((handler) => handler(...args))
  }

  public async emitSequentially(...args: Parameters<THandler>): Promise<void> {
    // Handlers need to be cloned, because it may happen
    // that the executing handler deletes and adds itself,
    // and this will trigger one more call
    for (const handler of [...this.handlers]) {
      // eslint-disable-next-line no-await-in-loop
      await handler(...args)
    }
  }
}

import type { Callback } from './callback'

import type { EventChannel } from './event-channel'

export class BasicEventChannel<THandler extends Callback>
  implements EventChannel<THandler>
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
    return new BasicEventChannel(this.handlers)
  }

  public async emit(...args: Parameters<THandler>): Promise<void> {
    // Handlers need to be cloned, because it may happen
    // that the executing handler deletes and adds itself,
    // and this will trigger one more call
    for (const handler of [...this.handlers]) {
      // eslint-disable-next-line no-await-in-loop
      await handler(...args)
    }
  }
}

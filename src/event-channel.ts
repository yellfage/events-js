import type { Callback } from './callback'

import type { EventPool } from './event-pool'

export class EventChannel<TArgs extends unknown[]> implements EventPool<TArgs> {
  private readonly handlers: Set<Callback<TArgs>>

  public constructor(handlers?: Iterable<Callback<TArgs>>) {
    this.handlers = new Set(handlers)
  }

  public on(handler: Callback<TArgs>): Callback<TArgs> {
    this.handlers.add(handler)

    return handler
  }

  public once(handler: Callback<TArgs>): Callback<TArgs> {
    this.handlers.add(handler)

    const remove = this.on(() => {
      this.off(handler)
      this.off(remove)
    })

    return handler
  }

  public off(handler: Callback<TArgs>): void {
    this.handlers.delete(handler)
  }

  public offAll(): void {
    this.handlers.clear()
  }

  public clone(): EventChannel<TArgs> {
    return new EventChannel(this.handlers)
  }

  public emit(...args: TArgs): void {
    this.handlers.forEach((handler) => handler(...args))
  }

  public async invoke(...args: TArgs): Promise<void> {
    // Handlers need to be cloned, because it may happen
    // that the executing handler deletes and adds itself
    // and this will trigger one more call
    for (const handler of [...this.handlers]) {
      // eslint-disable-next-line no-await-in-loop
      await handler(...args)
    }
  }
}

import type { Callback } from './callback'

import type { EventPool } from './event-pool'

export class EventChannel<TArgs extends unknown[]> implements EventPool<TArgs> {
  public get size(): number {
    return this.handlers.size
  }

  private readonly handlers: Map<Callback<TArgs>, Callback<TArgs>>

  public constructor(handlers?: Iterable<[Callback<TArgs>, Callback<TArgs>]>) {
    this.handlers = new Map(handlers)
  }

  public on(handler: Callback<TArgs>, maxCallCount = -1): () => void {
    let callsCount = 0

    const offHandler = (): void => this.off(handler)

    this.handlers.set(handler, (...args) => {
      handler(...args)

      callsCount += 1

      if (callsCount >= maxCallCount) {
        offHandler()
      }
    })

    return offHandler
  }

  public once(handler: Callback<TArgs>): () => void {
    return this.on(handler, 1)
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
    for (const handler of this.handlers.values()) {
      // eslint-disable-next-line no-await-in-loop
      await handler(...args)
    }
  }
}

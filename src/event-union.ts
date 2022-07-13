import type { Callback } from './callback'

import { EventChannel } from './event-channel'

export class EventUnion<TEventMap extends Record<string, unknown[]>> {
  private readonly eventMap: Map<keyof TEventMap, EventChannel<unknown[]>>

  public constructor(
    eventMap: Map<keyof TEventMap, EventChannel<unknown[]>> = new Map(),
  ) {
    this.eventMap = eventMap
  }

  public on<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    handler: Callback<TEventMap[TEventName]>,
  ): Callback<TEventMap[TEventName]> {
    const channel = this.eventMap.get(eventName) ?? new EventChannel()

    if (!this.eventMap.has(eventName)) {
      this.eventMap.set(eventName, channel)
    }

    channel.on(handler)

    return handler
  }

  public once<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    handler: Callback<TEventMap[TEventName]>,
  ): Callback<TEventMap[TEventName]> {
    this.on(eventName, handler)

    const remove = this.on(eventName, () => {
      this.off(eventName, handler)
      this.off(eventName, remove)
    })

    return handler
  }

  public off<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    handler: Callback<TEventMap[TEventName]>,
  ): void {
    this.eventMap.get(eventName)?.off(handler)
  }

  public offAll<TEventName extends keyof TEventMap>(
    eventName: TEventName,
  ): void {
    this.eventMap.delete(eventName)
  }

  public clone(): EventUnion<TEventMap> {
    const eventMap = Array.from(this.eventMap).reduce(
      (map, [key, value]) => map.set(key, value.clone()),
      new Map<keyof TEventMap, EventChannel<unknown[]>>(),
    )

    return new EventUnion(eventMap)
  }

  public emit<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    ...args: TEventMap[TEventName]
  ): void {
    this.eventMap.get(eventName)?.emit(...args)
  }

  public async invoke<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    ...args: TEventMap[TEventName]
  ): Promise<void> {
    return this.eventMap.get(eventName)?.invoke(...args)
  }
}

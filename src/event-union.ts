import type { Callback } from './callback'

import { EventChannel } from './event-channel'

export class EventUnion<TEventMap extends Record<string, Callback>> {
  private readonly eventMap: Map<keyof TEventMap, EventChannel<Callback>>

  public constructor(
    eventMap: Map<keyof TEventMap, EventChannel<Callback>> = new Map(),
  ) {
    this.eventMap = eventMap
  }

  public add<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    handler: TEventMap[TEventName],
  ): TEventMap[TEventName] {
    const channel = this.eventMap.get(eventName) ?? new EventChannel()

    if (!this.eventMap.has(eventName)) {
      this.eventMap.set(eventName, channel)
    }

    channel.add(handler)

    return handler
  }

  public remove<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    handler: TEventMap[TEventName],
  ): void {
    this.eventMap.get(eventName)?.remove(handler)
  }

  public clear<TEventName extends keyof TEventMap>(
    eventName: TEventName,
  ): void {
    this.eventMap.delete(eventName)
  }

  public clone(): EventUnion<TEventMap> {
    const eventMap = Array.from(this.eventMap).reduce(
      (map, [key, value]) => map.set(key, value.clone()),
      new Map<keyof TEventMap, EventChannel<Callback>>(),
    )

    return new EventUnion(eventMap)
  }

  public emit<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    ...args: Parameters<TEventMap[TEventName]>
  ): void {
    this.eventMap.get(eventName)?.emit(...args)
  }

  public async invoke<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    ...args: Parameters<TEventMap[TEventName]>
  ): Promise<void> {
    return this.eventMap.get(eventName)?.invoke(...args)
  }
}

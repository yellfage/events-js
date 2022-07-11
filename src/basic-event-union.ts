import { BasicEventChannel } from './basic-event-channel'

import type { Callback } from './callback'

import type { EventChannel } from './event-channel'

import type { EventUnion } from './event-union'

export class BasicEventUnion<TEventMap extends Record<string, Callback>>
  implements EventUnion<TEventMap>
{
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
    const channel = this.eventMap.get(eventName) ?? new BasicEventChannel()

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

    return new BasicEventUnion(eventMap)
  }

  public emit<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    ...args: Parameters<TEventMap[TEventName]>
  ): void {
    this.eventMap.get(eventName)?.emit(...args)
  }

  public async emitSequentially<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    ...args: Parameters<TEventMap[TEventName]>
  ): Promise<void> {
    return this.eventMap.get(eventName)?.emitSequentially(...args)
  }
}

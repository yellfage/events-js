import type { Callback } from './callback'

export interface EventUnion<TEventMap extends Record<string, Callback>> {
  add<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    handler: TEventMap[TEventName],
  ): TEventMap[TEventName]
  remove<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    handler: TEventMap[TEventName],
  ): void
  clear<TEventName extends keyof TEventMap>(eventName: TEventName): void
  clone(): EventUnion<TEventMap>
  emit<TEventName extends keyof TEventMap>(
    eventName: TEventName,
    ...args: Parameters<TEventMap[TEventName]>
  ): Promise<void>
}

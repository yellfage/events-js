import type { AnyListener } from './any-listener'

export class Listeners<T extends AnyListener> {
  /**
   * The count of listeners
   */
  get size(): number {
    return this.listeners.size
  }

  private readonly listeners: Map<string | T, T>

  constructor(
    listeners?:
      | Iterable<Readonly<[string | T, T]>>
      | Array<Readonly<[string | T, T]>>
      | null
      | undefined,
  ) {
    this.listeners = new Map(listeners)
  }

  /**
   * @param listener The listener
   * @returns boolean indicating whether a specific listener exists or not.
   */
  has(listener: T): boolean
  /**
   * @param marker The marker
   * @returns boolean indicating whether a listener with a specific marker exists or not.
   */
  has(marker: string): boolean
  /**
   * @param key The listener or marker
   * @returns boolean indicating whether the listener or a listener with a specific marker exists or not.
   */
  has(key: string | T): boolean
  has(key: string | T): boolean {
    return this.listeners.has(key)
  }

  /**
   * Adds a new listener. If the listener already exists, it will be replaced.
   * @param listener The listener.
   * @returns A callback to remove the added listener.
   */
  set(listener: T): () => void
  /**
   * Adds a new listener with a specific marker. If the listener with the specified marker already exists, it will be replaced.
   * @param marker The marker.
   * @param listener The listener.
   * @returns A callback to remove the added listener.
   */
  set(marker: string, listener: T): () => void
  /**
   * Adds a new listener with or without a specific marker. If the listener or a listener with the specified marker already exists, it will be replaced.
   * @param key The listener or marker.
   * @param value The listener.
   * @returns A callback to remove the added listener.
   */
  set(key: string | T, value: T | undefined): () => void
  set(key: string | T, value?: T): () => void {
    if (typeof key === 'string') {
      if (value == null) {
        return () => {}
      }

      this.listeners.set(key, value)
    } else {
      const listener = key

      this.listeners.set(key, listener)
    }

    return () => {
      this.delete(key)
    }
  }

  /**
   * Adds a new unique listener.
   * If the listener already exists, the new one will be ignored.
   * @param listener The listener.
   * @returns A callback to remove the added listener.
   */
  append(listener: T): () => void
  /**
   * Adds a new unique listener with a specific marker.
   * If the listener with the specified marker already exists, the new one will be ignored.
   * @param marker The marker.
   * @param listener The listener.
   * @returns A callback to remove the added listener.
   */
  append(marker: string, listener: T): () => void
  /**
   * Adds a new unique listener with or without a specific marker.
   * If the listener or a listener with the specified marker already exists, the new one will be ignored.
   * @param key The listener or marker.
   * @param value The listener.
   * @returns A callback to remove the added listener.
   */
  append(key: string | T, value: T | undefined): () => void
  append(key: string | T, value?: T): () => void {
    if (!this.has(key)) {
      return this.set(key, value)
    }

    return () => {
      this.delete(key)
    }
  }

  /**
   * Removes a specific listener.
   * @param listener The listener.
   * @returns boolean indicating whether the specified listener has been removed or not.
   */
  delete(listener: T): boolean
  /**
   * Removes a listener with a specific marker.
   * @param marker The marker.
   * @returns boolean indicating whether a listener with the specified marker has been removed or not.
   */
  delete(marker: string): boolean
  /**
   * Removes a specific listener or a listener with a specific marker.
   * @param key The marker or listener.
   * @returns boolean indicating whether the specified listener or a listener with the specified marker has been removed or not.
   */
  delete(key: string | T): boolean
  delete(key: string | T): boolean {
    return this.listeners.delete(key)
  }

  /**
   * Removes all listeners.
   */
  clear(): void {
    this.listeners.clear()
  }

  /**
   * Executes a specific function once per each [listener or marker]/listener pair in insertion order.
   * @param callbackfn The callback function.
   */
  forEach(
    callbackfn: (value: T, key: string | T, listeners: Listeners<T>) => void,
  ): void {
    this.listeners.forEach((value, key) => {
      callbackfn(value, key, this)
    })
  }

  /**
   * @returns an iterable of [listener or marker]/listener pairs.
   */
  entries(): IterableIterator<[string | T, T]> {
    return this.listeners.entries()
  }

  /**
   * @returns an iterable of listeners or markers
   */
  keys(): IterableIterator<string | T> {
    return this.listeners.keys()
  }

  /**
   * @returns an iterable of listeners
   */
  values(): IterableIterator<T> {
    return this.listeners.values()
  }

  /**
   * @returns an iterable of [listener or marker]/listener pairs.
   */
  [Symbol.iterator](): IterableIterator<[string | T, T]> {
    return this.entries()
  }
}

// Simple wrapper around Map to expose a getOrSet
export class PropertyCache<K, V> {
  private cache: Map<K, V> = new Map();

  public getOrSet(key: K, value: V): V {
    if (this.cache.has(key)) {
      return this.cache.get(key)!;
    } else {
      this.cache.set(key, value);
      return value;
    }
  }
}

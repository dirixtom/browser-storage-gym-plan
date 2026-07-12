// In-memory localStorage stand-in for node:test (no real browser/jsdom).
// Must be imported before any `src/lib/*` module: storage.ts's `hasStorage`
// is computed once at module-load time, so `window`/`localStorage` have to
// exist on globalThis before that first import runs.

class FakeLocalStorage {
  private map = new Map<string, string>();

  getItem(key: string): string | null {
    return this.map.has(key) ? this.map.get(key)! : null;
  }

  setItem(key: string, val: string): void {
    this.map.set(key, String(val));
  }

  removeItem(key: string): void {
    this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  key(i: number): string | null {
    return [...this.map.keys()][i] ?? null;
  }

  get length(): number {
    return this.map.size;
  }
}

export const fakeLocalStorage = new FakeLocalStorage();

(globalThis as unknown as { window: unknown }).window = globalThis;
(globalThis as unknown as { localStorage: unknown }).localStorage = fakeLocalStorage;

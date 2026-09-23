// Loads the JSON files from public/data/ (made by scripts/build-data.ts).
// Each file is fetched only once; after that the same data is reused from memory.

const cache = new Map<string, Promise<unknown>>()

export function loadJson<T>(file: string): Promise<T> {
  let request = cache.get(file)
  if (!request) {
    request = fetch(`${import.meta.env.BASE_URL}data/${file}`).then(
      (response) => {
        if (!response.ok) {
          throw new Error(`Could not load ${file} (HTTP ${response.status})`)
        }
        return response.json()
      },
    )
    // If loading fails (e.g. no internet), forget it so the next call can try again.
    request.catch(() => cache.delete(file))
    cache.set(file, request)
  }
  return request as Promise<T>
}

/** Forgets all loaded files. Only needed in tests. */
export function clearCache(): void {
  cache.clear()
}

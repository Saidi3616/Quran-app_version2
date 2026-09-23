import { readFileSync } from 'node:fs'
import { vi } from 'vitest'

// In tests there is no web server, so fetch() is replaced by this fake,
// which reads the generated files in public/data/ from disk.
export const fakeFetch = vi.fn(async (url: string) => {
  const file = url.split('/').pop()
  return new Response(readFileSync(`public/data/${file}`, 'utf8'))
})

import type { VerseKey } from './types'

/** Builds a verse key, e.g. toVerseKey(2, 255) → "2:255". */
export function toVerseKey(sura: number, aya: number): VerseKey {
  return `${sura}:${aya}`
}

/** Reads a verse key. Returns null if the text is not in the form "number:number". */
export function parseVerseKey(
  key: string,
): { sura: number; aya: number } | null {
  const match = /^(\d+):(\d+)$/.exec(key)
  if (!match) return null
  return { sura: Number(match[1]), aya: Number(match[2]) }
}

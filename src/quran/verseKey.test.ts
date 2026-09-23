import { describe, expect, it } from 'vitest'
import { parseVerseKey, toVerseKey } from './verseKey'

describe('toVerseKey', () => {
  it('joins sura and aya with a colon', () => {
    expect(toVerseKey(2, 255)).toBe('2:255')
  })
})

describe('parseVerseKey', () => {
  it('reads a valid key', () => {
    expect(parseVerseKey('2:255')).toEqual({ sura: 2, aya: 255 })
  })

  it('returns null for text that is not a verse key', () => {
    expect(parseVerseKey('Al-Baqara')).toBeNull()
    expect(parseVerseKey('2:')).toBeNull()
    expect(parseVerseKey('2:255:1')).toBeNull()
  })
})

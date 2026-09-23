import { readFileSync } from 'node:fs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  findJuz,
  findPage,
  getSura,
  getSuras,
  getTranslation,
  verseExists,
} from './index'
import { clearCache } from './load'

// In tests there is no web server, so we replace fetch() with a fake
// that reads the generated files in public/data/ from disk.
const fakeFetch = vi.fn(async (url: string) => {
  const file = url.split('/').pop()
  return new Response(readFileSync(`public/data/${file}`, 'utf8'))
})

beforeEach(() => {
  clearCache()
  fakeFetch.mockClear()
  vi.stubGlobal('fetch', fakeFetch)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('getSuras', () => {
  it('returns all 114 suras', async () => {
    const suras = await getSuras()
    expect(suras).toHaveLength(114)
    expect(suras[35].nameTransliterated).toBe('Yaseen')
  })

  it('loads each file only once', async () => {
    await getSuras()
    await getSuras()
    await getSura(1)
    await getSura(2)
    const urls = fakeFetch.mock.calls.map(([url]) => url)
    expect(urls).toEqual(['/data/suras.json', '/data/quran-uthmani.json'])
  })

  it('tries again next time if loading failed', async () => {
    fakeFetch.mockResolvedValueOnce(new Response('', { status: 503 }))
    await expect(getSuras()).rejects.toThrow('Could not load suras.json')
    expect(await getSuras()).toHaveLength(114)
  })
})

describe('getSura', () => {
  it('returns a sura with all its verses in order', async () => {
    const result = await getSura(1)
    expect(result?.sura.nameArabic).toBe('الفاتحة')
    expect(result?.ayahs.map((a) => a.aya)).toEqual([1, 2, 3, 4, 5, 6, 7])
  })

  it('returns null for suras that do not exist', async () => {
    expect(await getSura(0)).toBeNull()
    expect(await getSura(115)).toBeNull()
    expect(await getSura(2.5)).toBeNull()
    expect(await getSura(NaN)).toBeNull()
  })
})

describe('getTranslation', () => {
  it('returns the English translation of a sura', async () => {
    const verses = await getTranslation(112)
    expect(verses).toHaveLength(4)
    expect(verses?.[0].text).toBe('Say, "He is Allah, [who is] One,')
  })

  it('returns null for suras that do not exist', async () => {
    expect(await getTranslation(115)).toBeNull()
  })
})

describe('verseExists', () => {
  it('knows which verses exist', async () => {
    expect(await verseExists({ sura: 1, aya: 7 })).toBe(true)
    expect(await verseExists({ sura: 2, aya: 286 })).toBe(true)
    expect(await verseExists({ sura: 1, aya: 8 })).toBe(false)
    expect(await verseExists({ sura: 115, aya: 1 })).toBe(false)
    expect(await verseExists({ sura: 1, aya: 0 })).toBe(false)
  })
})

describe('findJuz', () => {
  it('returns the first verse of a juz', async () => {
    expect(await findJuz(1)).toEqual({ sura: 1, aya: 1 })
    expect(await findJuz(2)).toEqual({ sura: 2, aya: 142 })
    expect(await findJuz(30)).toEqual({ sura: 78, aya: 1 })
  })

  it('returns null outside 1–30', async () => {
    expect(await findJuz(0)).toBeNull()
    expect(await findJuz(31)).toBeNull()
  })
})

describe('findPage', () => {
  it('returns the first verse on a page', async () => {
    expect(await findPage(1)).toEqual({ sura: 1, aya: 1 })
    expect(await findPage(42)).toEqual({ sura: 2, aya: 253 })
    expect(await findPage(604)).toEqual({ sura: 112, aya: 1 })
  })

  it('returns null outside 1–604', async () => {
    expect(await findPage(0)).toBeNull()
    expect(await findPage(605)).toBeNull()
  })
})

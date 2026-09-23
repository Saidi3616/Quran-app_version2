// @vitest-environment node
//
// Data integrity (constitution principle 1 · spec 001: SC-003, SC-004).
// Checks that the generated JSON in public/data/ matches the Tanzil source files exactly.
//
// On purpose, this test does NOT use scripts/tanzil.ts to read the XML. It reads it
// in a different, simpler way, so a bug in the build script cannot hide itself.
import { createHash } from 'node:crypto'
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import type {
  Ayah,
  QuranTextFile,
  SuraListFile,
  VerseText,
  VerseTextFile,
} from '../src/quran/types.ts'

const readSource = (file: string) => readFileSync(`data/tanzil/${file}`, 'utf8')
const readJson = <T>(file: string): T =>
  JSON.parse(readFileSync(`public/data/${file}`, 'utf8'))

const suras = readJson<SuraListFile>('suras.json')
const quran = readJson<QuranTextFile>('quran-uthmani.json')
const clean = readJson<VerseTextFile>('quran-clean.json')
const sahih = readJson<VerseTextFile>('en.sahih.json')

const key = (v: { sura: number; aya: number }) => `${v.sura}:${v.aya}`
const find = (sura: number, aya: number): Ayah => {
  const ayah = quran.ayahs.find((a) => a.sura === sura && a.aya === aya)
  if (!ayah) throw new Error(`Verse ${sura}:${aya} not found`)
  return ayah
}

/** Reads every verse of a Tanzil XML file with plain regular expressions. */
function versesFromXml(file: string): Map<string, string> {
  const decode = (s: string) =>
    s
      .replaceAll('&quot;', '"')
      .replaceAll('&apos;', "'")
      .replaceAll('&lt;', '<')
      .replaceAll('&gt;', '>')
      .replaceAll('&amp;', '&')
  const verses = new Map<string, string>()
  const xml = readSource(file)
  for (const [, sura, body] of xml.matchAll(
    /<sura index="(\d+)"[^>]*>([\s\S]*?)<\/sura>/g,
  )) {
    for (const [, aya, text] of body.matchAll(
      /<aya index="(\d+)" text="([^"]*)"/g,
    )) {
      verses.set(`${sura}:${aya}`, decode(text))
    }
  }
  return verses
}

describe('Tanzil source files', () => {
  it('are unchanged (SHA-256 matches data/tanzil/README.md)', () => {
    const readme = readSource('README.md')
    const expected = [...readme.matchAll(/^([0-9a-f]{64}) {2}(\S+\.xml)$/gm)]
    expect(expected).toHaveLength(4)
    for (const [, hash, file] of expected) {
      const actual = createHash('sha256')
        .update(readFileSync(`data/tanzil/${file}`))
        .digest('hex')
      expect(actual, file).toBe(hash)
    }
  })
})

describe('Suras', () => {
  it('has 114 suras numbered 1 to 114', () => {
    expect(suras.suras.map((s) => s.number)).toEqual(
      Array.from({ length: 114 }, (_, i) => i + 1),
    )
  })

  it('has verse counts that add up to 6,236', () => {
    const total = suras.suras.reduce((sum, s) => sum + s.ayahCount, 0)
    expect(total).toBe(6236)
  })

  it('knows the names and places of revelation', () => {
    expect(suras.suras[0]).toMatchObject({
      nameArabic: 'الفاتحة',
      nameTransliterated: 'Al-Faatiha',
      ayahCount: 7,
      revelation: 'Meccan',
    })
    expect(suras.suras[1]).toMatchObject({
      nameArabic: 'البقرة',
      revelation: 'Medinan',
    })
  })
})

describe('Arabic text (Uthmani)', () => {
  it('has 6,236 verses', () => {
    expect(quran.ayahs).toHaveLength(6236)
  })

  it('has every sura complete, with verses numbered 1, 2, 3, … in order', () => {
    for (const sura of suras.suras) {
      const numbers = quran.ayahs
        .filter((a) => a.sura === sura.number)
        .map((a) => a.aya)
      expect(numbers, `sura ${sura.number}`).toEqual(
        Array.from({ length: sura.ayahCount }, (_, i) => i + 1),
      )
    }
  })

  // SC-003 asks for at least 20 samples. Checking every verse is just as fast.
  it('is identical, character for character, to the Tanzil file (all verses)', () => {
    const source = versesFromXml('quran-uthmani.xml')
    expect(source.size).toBe(6236)
    for (const ayah of quran.ayahs) {
      expect(ayah.text, key(ayah)).toBe(source.get(key(ayah)))
    }
  })

  // The expected texts below are typed by hand, and editors often "normalize"
  // Unicode (NFC), which reorders marks like shadda + fatha. So we compare the
  // normalized forms here. The exact character-for-character check is the test above.
  it('contains well-known verses', () => {
    const same = (actual: string, expected: string) =>
      expect(actual.normalize('NFC')).toBe(expected.normalize('NFC'))
    same(find(1, 1).text, 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ')
    same(find(112, 1).text, 'قُلْ هُوَ ٱللَّهُ أَحَدٌ')
    same(find(114, 6).text, 'مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ')
  })

  it("is NOT Unicode-normalized: Tanzil's order of marks is kept", () => {
    // In Tanzil's text, shadda (U+0651) comes before fatha (U+064E) in "ٱللَّهِ".
    // Unicode normalization (NFC) would swap them and change 5,748 verses.
    expect(find(1, 1).text).toContain('\u0644\u0651\u064E\u0647')
    expect(find(1, 1).text).not.toBe(find(1, 1).text.normalize('NFC'))
  })

  it('includes the copyright notice from Tanzil', () => {
    expect(quran.notice).toContain('Tanzil')
    expect(quran.notice).toContain('Creative Commons Attribution 3.0')
    expect(quran.notice).toContain('CHANGING IT IS NOT ALLOWED')
  })
})

describe('Bismillah', () => {
  const withBismillah = quran.ayahs.filter((a) => a.bismillah !== undefined)

  it('is a heading on 112 suras: all except 1 (where it is verse 1) and 9', () => {
    expect(withBismillah).toHaveLength(112)
    expect(withBismillah.every((a) => a.aya === 1)).toBe(true)
    expect(withBismillah.some((a) => a.sura === 1 || a.sura === 9)).toBe(false)
  })

  it('is never part of the verse text itself', () => {
    expect(find(2, 1).text).toBe('الٓمٓ')
    expect(find(2, 1).bismillah).toBe(find(1, 1).text) // the same Bismillah as verse 1:1
  })
})

describe('Juz and pages (SC-004)', () => {
  const metadata = readSource('quran-data.xml')
  const starts = (tag: string) =>
    [
      ...metadata.matchAll(
        new RegExp(`<${tag} index="(\\d+)" sura="(\\d+)" aya="(\\d+)"`, 'g'),
      ),
    ].map(([, index, sura, aya]) => ({
      index: Number(index),
      sura: Number(sura),
      aya: Number(aya),
    }))

  it('starts every juz (1–30) exactly where Tanzil says', () => {
    const juzStarts = starts('juz')
    expect(juzStarts).toHaveLength(30)
    for (const start of juzStarts) {
      const i = quran.ayahs.findIndex(
        (a) => a.sura === start.sura && a.aya === start.aya,
      )
      expect(quran.ayahs[i].juz, `juz ${start.index}`).toBe(start.index)
      if (i > 0) expect(quran.ayahs[i - 1].juz).toBe(start.index - 1)
    }
  })

  it('starts every page (1–604) exactly where Tanzil says', () => {
    const pageStarts = starts('page')
    expect(pageStarts).toHaveLength(604)
    for (const start of pageStarts) {
      const i = quran.ayahs.findIndex(
        (a) => a.sura === start.sura && a.aya === start.aya,
      )
      expect(quran.ayahs[i].page, `page ${start.index}`).toBe(start.index)
      if (i > 0) expect(quran.ayahs[i - 1].page).toBe(start.index - 1)
    }
  })

  it('matches a printed Madani mushaf for well-known verses', () => {
    expect(find(1, 1)).toMatchObject({ juz: 1, page: 1 })
    expect(find(2, 1)).toMatchObject({ juz: 1, page: 2 })
    expect(find(2, 255)).toMatchObject({ juz: 3, page: 42 }) // Ayat al-Kursi
    expect(find(18, 1)).toMatchObject({ juz: 15, page: 293 }) // Al-Kahf
    expect(find(78, 1)).toMatchObject({ juz: 30, page: 582 }) // start of juz 30
    expect(find(114, 6)).toMatchObject({ juz: 30, page: 604 })
  })
})

describe.each([
  ['Search text (Simple Clean)', clean, 'quran-simple-clean.xml'],
  ['Translation (Sahih International)', sahih, 'en.sahih.xml'],
] as const)('%s', (_, file: VerseTextFile, source) => {
  it('has exactly one verse for every Arabic verse, in the same order', () => {
    expect(file.ayahs.map(key)).toEqual(quran.ayahs.map(key))
  })

  it('is identical, character for character, to the Tanzil file (all verses)', () => {
    const verses = versesFromXml(source)
    for (const ayah of file.ayahs as VerseText[]) {
      expect(ayah.text, key(ayah)).toBe(verses.get(key(ayah)))
    }
  })
})

describe('Translation (Sahih International)', () => {
  it('turns &quot; into real quotation marks', () => {
    expect(sahih.ayahs.some((a) => a.text.includes('"'))).toBe(true)
    expect(sahih.ayahs.some((a) => a.text.includes('&quot;'))).toBe(false)
  })

  it('names the translation in its notice', () => {
    expect(sahih.notice).toContain('Saheeh International')
  })
})

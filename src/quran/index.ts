// Everything the app needs to read the Quran (plan, section 5).
// Pages and components use these functions and never read the JSON files themselves.
//
// All functions return null for numbers that do not exist (e.g. sura 115),
// so the screen can show a friendly message instead of crashing (spec H2.2).
import { loadJson } from './load'
import type {
  Ayah,
  QuranTextFile,
  Sura,
  SuraListFile,
  VerseRef,
  VerseText,
  VerseTextFile,
} from './types'

export const JUZ_COUNT = 30
export const PAGE_COUNT = 604

const isInRange = (n: number, max: number) =>
  Number.isInteger(n) && n >= 1 && n <= max

/** All 114 suras (FR-001). */
export async function getSuras(): Promise<Sura[]> {
  const file = await loadJson<SuraListFile>('suras.json')
  return file.suras
}

/** One sura with all its verses in Uthmani script (FR-002). */
export async function getSura(
  number: number,
): Promise<{ sura: Sura; ayahs: Ayah[] } | null> {
  const suras = await getSuras()
  if (!isInRange(number, suras.length)) return null
  const quran = await loadJson<QuranTextFile>('quran-uthmani.json')
  return {
    sura: suras[number - 1],
    ayahs: quran.ayahs.filter((ayah) => ayah.sura === number),
  }
}

/** The English translation (Sahih International) of one sura (FR-007). */
export async function getTranslation(
  number: number,
): Promise<VerseText[] | null> {
  const suras = await getSuras()
  if (!isInRange(number, suras.length)) return null
  const translation = await loadJson<VerseTextFile>('en.sahih.json')
  return translation.ayahs.filter((ayah) => ayah.sura === number)
}

/** Does this verse exist? E.g. 1:7 does, 1:8 does not (spec H2.2). */
export async function verseExists({ sura, aya }: VerseRef): Promise<boolean> {
  const suras = await getSuras()
  return (
    isInRange(sura, suras.length) && isInRange(aya, suras[sura - 1].ayahCount)
  )
}

/** The first verse of a juz, 1–30 (FR-005). */
export async function findJuz(juz: number): Promise<VerseRef | null> {
  if (!isInRange(juz, JUZ_COUNT)) return null
  return firstVerseWhere((ayah) => ayah.juz === juz)
}

/** The first verse on a page of the Madani mushaf, 1–604 (FR-005). */
export async function findPage(page: number): Promise<VerseRef | null> {
  if (!isInRange(page, PAGE_COUNT)) return null
  return firstVerseWhere((ayah) => ayah.page === page)
}

async function firstVerseWhere(
  test: (ayah: Ayah) => boolean,
): Promise<VerseRef | null> {
  const quran = await loadJson<QuranTextFile>('quran-uthmani.json')
  const ayah = quran.ayahs.find(test)
  return ayah ? { sura: ayah.sura, aya: ayah.aya } : null
}

/** The copyright/source notices from the Tanzil files, for the About page (FR-017). */
export async function getSourceNotices(): Promise<{
  quran: string
  translation: string
  metadata: string
}> {
  const [quran, translation, suras] = await Promise.all([
    loadJson<QuranTextFile>('quran-uthmani.json'),
    loadJson<VerseTextFile>('en.sahih.json'),
    loadJson<SuraListFile>('suras.json'),
  ])
  return {
    quran: quran.notice,
    translation: translation.notice,
    metadata: suras.notice,
  }
}

// Types for the Quran data (spec 001, section 5 · plan, section 6).
// The data itself comes unmodified from Tanzil (data/tanzil/).

/** Unique reference to a verse, written as "sura:aya", e.g. "2:255". */
export type VerseKey = `${number}:${number}`

/** Where a sura was revealed. The values match Tanzil's metadata. */
export type Revelation = 'Meccan' | 'Medinan'

export interface Sura {
  /** 1–114 */
  number: number
  /** Arabic name, e.g. "البقرة" */
  nameArabic: string
  /** Transliterated name, e.g. "Al-Baqara" */
  nameTransliterated: string
  ayahCount: number
  revelation: Revelation
}

export interface Ayah {
  sura: number
  aya: number
  /** Uthmani text, unmodified from Tanzil. */
  text: string
  /** Only on verse 1 of suras that show Bismillah as a heading (all except 1 and 9). */
  bismillah?: string
  /** 1–30 */
  juz: number
  /** 1–604 (Madani mushaf) */
  page: number
}

/** The English translation of one verse. */
export interface TranslatedAyah {
  sura: number
  aya: number
  text: string
}

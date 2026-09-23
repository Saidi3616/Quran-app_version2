// Functions for reading Tanzil's XML files (see data/tanzil/README.md for the format).
// They only move the text into another format: no verse text is ever changed.
import { XMLParser } from 'fast-xml-parser'
import type { Ayah, Revelation, Sura, VerseText } from '../src/quran/types.ts'

/** The first verse of a juz or a page. */
export interface VerseStart {
  index: number
  sura: number
  aya: number
}

/** A verse read from a Tanzil text file, before juz and page are added. */
export interface RawVerse extends VerseText {
  bismillah?: string
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  // Keep every attribute exactly as written: no trimming, no number conversion.
  trimValues: false,
  parseAttributeValue: false,
  // These tags must always be lists, even if a file only contains one of them.
  isArray: (tagName) => ['sura', 'aya', 'juz', 'page'].includes(tagName),
})

/**
 * Splits the copyright comment at the top of a Tanzil file from the XML itself.
 *
 * The comment in en.sahih.xml contains "--", which is not allowed in XML,
 * so it must be removed before the XML is parsed. The file on disk is not changed.
 */
export function splitLeadingComment(xml: string): {
  notice: string
  body: string
} {
  const match = /^\s*(<\?xml[^>]*\?>)?\s*<!--([\s\S]*?)-->/.exec(xml)
  if (!match) return { notice: '', body: xml }
  const notice = match[2]
    .split('\n')
    .map((line) => line.replace(/^#\s?/, '').trimEnd())
    .filter((line) => !/^\s*[-=]+\s*$/.test(line)) // drop "-----" and "=====" rulers
    .join('\n')
    .trim()
  return { notice, body: (match[1] ?? '') + xml.slice(match[0].length) }
}

interface RawAya {
  index: string
  text: string
  bismillah?: string
}

interface RawSura {
  index: string
  aya: RawAya[]
}

/** Reads a Quran text file (Uthmani or Simple Clean) or a translation file. */
export function parseVerseFile(xml: string): {
  notice: string
  verses: RawVerse[]
} {
  const { notice, body } = splitLeadingComment(xml)
  const suras: RawSura[] = parser.parse(body).quran.sura
  const verses = suras.flatMap((sura) =>
    sura.aya.map((aya) => {
      const verse: RawVerse = {
        sura: Number(sura.index),
        aya: Number(aya.index),
        text: aya.text,
      }
      if (aya.bismillah !== undefined) verse.bismillah = aya.bismillah
      return verse
    }),
  )
  return { notice, verses }
}

interface RawMetadata {
  quran: {
    copyright: string
    license: string
    suras: {
      sura: {
        index: string
        ayas: string
        name: string
        tname: string
        type: Revelation
      }[]
    }
    juzs: { juz: { index: string; sura: string; aya: string }[] }
    pages: { page: { index: string; sura: string; aya: string }[] }
  }
}

/** Reads quran-data.xml: suras, and where each juz and page starts. */
export function parseMetadata(xml: string): {
  notice: string
  suras: Sura[]
  juzStarts: VerseStart[]
  pageStarts: VerseStart[]
} {
  const { quran } = parser.parse(xml) as RawMetadata
  const toStart = (s: { index: string; sura: string; aya: string }) => ({
    index: Number(s.index),
    sura: Number(s.sura),
    aya: Number(s.aya),
  })
  return {
    notice: `Tanzil Quran Metadata. Copyright ${quran.copyright}. License: ${quran.license}.`,
    suras: quran.suras.sura.map((s) => ({
      number: Number(s.index),
      nameArabic: s.name,
      nameTransliterated: s.tname,
      ayahCount: Number(s.ayas),
      revelation: s.type,
    })),
    juzStarts: quran.juzs.juz.map(toStart),
    pageStarts: quran.pages.page.map(toStart),
  }
}

/** Is verse a (sura:aya) at or after verse b? */
function isAtOrAfter(a: VerseText | VerseStart, b: VerseStart): boolean {
  return a.sura > b.sura || (a.sura === b.sura && a.aya >= b.aya)
}

/**
 * Gives every verse its juz and page number.
 *
 * Tanzil only says where each juz and page *starts*, so a verse belongs to the
 * last juz (and page) that starts at or before it. Verses must be in Quran order.
 */
export function addJuzAndPage(
  verses: RawVerse[],
  juzStarts: VerseStart[],
  pageStarts: VerseStart[],
): Ayah[] {
  let juz = 0
  let page = 0
  return verses.map((verse) => {
    while (juz + 1 < juzStarts.length && isAtOrAfter(verse, juzStarts[juz + 1]))
      juz++
    while (
      page + 1 < pageStarts.length &&
      isAtOrAfter(verse, pageStarts[page + 1])
    )
      page++
    return {
      ...verse,
      juz: juzStarts[juz].index,
      page: pageStarts[page].index,
    }
  })
}

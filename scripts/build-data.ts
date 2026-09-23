// Converts Tanzil's XML files (data/tanzil/) into the JSON files the app loads (public/data/).
// Runs automatically before `npm run dev`, `npm run build` and `npm test`.
// Usage: node scripts/build-data.ts
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import type {
  QuranTextFile,
  SuraListFile,
  VerseTextFile,
} from '../src/quran/types.ts'
import { addJuzAndPage, parseMetadata, parseVerseFile } from './tanzil.ts'

const SOURCE_DIR = 'data/tanzil'
const OUTPUT_DIR = 'public/data'
const SURA_COUNT = 114
const VERSE_COUNT = 6236

function read(file: string): string {
  return readFileSync(`${SOURCE_DIR}/${file}`, 'utf8')
}

function write(file: string, data: unknown): void {
  writeFileSync(`${OUTPUT_DIR}/${file}`, JSON.stringify(data))
  console.log(`  ✓ ${OUTPUT_DIR}/${file}`)
}

/** Stops the build if a file does not have the expected number of verses. */
function checkCount(name: string, actual: number, expected: number): void {
  if (actual !== expected) {
    throw new Error(`${name}: expected ${expected}, found ${actual}`)
  }
}

const meta = parseMetadata(read('quran-data.xml'))
const uthmani = parseVerseFile(read('quran-uthmani.xml'))
const clean = parseVerseFile(read('quran-simple-clean.xml'))
const sahih = parseVerseFile(read('en.sahih.xml'))

checkCount('suras in quran-data.xml', meta.suras.length, SURA_COUNT)
checkCount('verses in quran-uthmani.xml', uthmani.verses.length, VERSE_COUNT)
checkCount('verses in quran-simple-clean.xml', clean.verses.length, VERSE_COUNT)
checkCount('verses in en.sahih.xml', sahih.verses.length, VERSE_COUNT)

const suraList: SuraListFile = { notice: meta.notice, suras: meta.suras }
const quranText: QuranTextFile = {
  notice: uthmani.notice,
  ayahs: addJuzAndPage(uthmani.verses, meta.juzStarts, meta.pageStarts),
}
// Bismillah headings are only shown from the Uthmani text, so they are left out here.
const searchText: VerseTextFile = {
  notice: clean.notice,
  ayahs: clean.verses.map(({ sura, aya, text }) => ({ sura, aya, text })),
}
const translation: VerseTextFile = {
  notice: sahih.notice,
  ayahs: sahih.verses,
}

console.log('Building Quran data from Tanzil files:')
mkdirSync(OUTPUT_DIR, { recursive: true })
write('suras.json', suraList)
write('quran-uthmani.json', quranText)
write('quran-clean.json', searchText)
write('en.sahih.json', translation)

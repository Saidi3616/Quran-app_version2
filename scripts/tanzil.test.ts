// @vitest-environment node
import { describe, expect, it } from 'vitest'
import {
  addJuzAndPage,
  parseVerseFile,
  splitLeadingComment,
  type RawVerse,
} from './tanzil.ts'

describe('splitLeadingComment', () => {
  it('removes a comment containing "--", which is not valid XML', () => {
    const xml =
      '<?xml version="1.0"?>\n<!--\n# -----\n#  Name: Test\n# -----\n-->\n<quran/>'
    const { notice, body } = splitLeadingComment(xml)
    expect(notice).toBe('Name: Test')
    expect(body).not.toContain('--')
    expect(body).toContain('<quran/>')
  })

  it('leaves files without a comment unchanged', () => {
    expect(splitLeadingComment('<quran/>')).toEqual({
      notice: '',
      body: '<quran/>',
    })
  })
})

describe('parseVerseFile', () => {
  const xml = `<quran>
    <sura index="1" name="">
      <aya index="1" text="He said, &quot;Peace.&quot;" />
    </sura>
    <sura index="2" name="">
      <aya index="1" text=" الٓمٓ " bismillah="بِسْمِ" />
    </sura>
  </quran>`

  it('reads sura and verse numbers as numbers', () => {
    const { verses } = parseVerseFile(xml)
    expect(verses.map((v) => [v.sura, v.aya])).toEqual([
      [1, 1],
      [2, 1],
    ])
  })

  it('turns &quot; into a real quotation mark', () => {
    expect(parseVerseFile(xml).verses[0].text).toBe('He said, "Peace."')
  })

  it('keeps the text exactly as written, including spaces', () => {
    expect(parseVerseFile(xml).verses[1].text).toBe(' الٓمٓ ')
  })

  it('keeps the bismillah attribute only where it exists', () => {
    const { verses } = parseVerseFile(xml)
    expect(verses[0]).not.toHaveProperty('bismillah')
    expect(verses[1].bismillah).toBe('بِسْمِ')
  })
})

describe('addJuzAndPage', () => {
  const verse = (sura: number, aya: number): RawVerse => ({
    sura,
    aya,
    text: '',
  })

  it('gives each verse the last juz and page that start at or before it', () => {
    const verses = [verse(1, 1), verse(1, 2), verse(2, 1), verse(2, 2)]
    const juzStarts = [
      { index: 1, sura: 1, aya: 1 },
      { index: 2, sura: 2, aya: 2 },
    ]
    const pageStarts = [
      { index: 1, sura: 1, aya: 1 },
      { index: 2, sura: 2, aya: 1 },
    ]
    const result = addJuzAndPage(verses, juzStarts, pageStarts)
    expect(result.map((a) => [a.juz, a.page])).toEqual([
      [1, 1],
      [1, 1],
      [1, 2],
      [2, 2],
    ])
  })
})

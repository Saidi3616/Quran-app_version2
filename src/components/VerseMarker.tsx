import { toArabicDigits } from '../quran/arabicDigits'

const END_OF_AYAH = '۝' // ۝ — the font draws the digits after it inside the mark

/**
 * The end-of-verse mark with the verse number, e.g. ۝١٢ (FR-004).
 * It is part of how we show the verse, not part of the Quran text itself.
 */
export function VerseMarker({ number }: { number: number }) {
  return (
    <span className="verse-marker" role="img" aria-label={`Verse ${number}`}>
      {END_OF_AYAH + toArabicDigits(number)}
    </span>
  )
}

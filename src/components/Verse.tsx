import type { Ayah } from '../quran/types'
import { VerseMarker } from './VerseMarker'
import './Verse.css'

/**
 * One verse in Uthmani script, right to left, ending with its verse mark (FR-002–FR-004).
 *
 * The text is shown exactly as it comes from Tanzil. Never change it here —
 * not even with .normalize() (plan, section 7).
 */
export function Verse({ ayah }: { ayah: Pick<Ayah, 'aya' | 'text'> }) {
  return (
    <p className="verse arabic" lang="ar" dir="rtl">
      {ayah.text}
      {/* A no-break space keeps the mark on the same line as the last word. */}
      {' '}
      <VerseMarker number={ayah.aya} />
    </p>
  )
}

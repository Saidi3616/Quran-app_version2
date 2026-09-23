// Types for the user's own data, stored on the device (spec 001, section 5 · plan, section 6).
import type { VerseKey } from '../quran/types'

export interface Bookmark {
  key: VerseKey
  /** ISO date, e.g. "2026-09-23T21:30:00.000Z" */
  createdAt: string
}

export type Theme = 'light' | 'dark' | 'system'

export interface Settings {
  showTranslation: boolean
  /** Font sizes in pixels. */
  arabicFontSize: number
  translationFontSize: number
  theme: Theme
}

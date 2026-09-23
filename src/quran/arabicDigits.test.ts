import { describe, expect, it } from 'vitest'
import { toArabicDigits } from './arabicDigits'

describe('toArabicDigits', () => {
  it.each([
    [0, '٠'],
    [7, '٧'],
    [12, '١٢'],
    [255, '٢٥٥'],
    [286, '٢٨٦'],
  ])('%i → %s', (n, expected) => {
    expect(toArabicDigits(n)).toBe(expected)
  })
})

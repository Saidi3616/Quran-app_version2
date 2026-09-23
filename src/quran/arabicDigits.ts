const ARABIC_DIGITS = '٠١٢٣٤٥٦٧٨٩' // U+0660–U+0669

/** Writes a number with Arabic-Indic digits, e.g. 255 → "٢٥٥". */
export function toArabicDigits(n: number): string {
  return String(n).replace(/\d/g, (digit) => ARABIC_DIGITS[Number(digit)])
}

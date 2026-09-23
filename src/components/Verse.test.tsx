import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Verse } from './Verse'

// "لِلَّهِ" as in Tanzil: shadda (U+0651) BEFORE fatha (U+064E).
// Written with escape codes, because editors often normalize Arabic text (NFC)
// and would silently swap the two marks — which is exactly what we test for.
const ayah = { aya: 2, text: '\u0644\u0650\u0644\u0651\u064E\u0647\u0650' }

describe('Verse', () => {
  it('uses a test text that Unicode normalization would change', () => {
    expect(ayah.text).not.toBe(ayah.text.normalize('NFC'))
  })

  it('shows the text exactly as given, without changing a single character', () => {
    const { container } = render(<Verse ayah={ayah} />)
    const shown = container.querySelector('.verse')?.firstChild?.textContent
    expect(shown).toBe(ayah.text)
  })

  it('is Arabic and right to left (FR-003)', () => {
    const { container } = render(<Verse ayah={ayah} />)
    const verse = container.querySelector('.verse')
    expect(verse).toHaveAttribute('dir', 'rtl')
    expect(verse).toHaveAttribute('lang', 'ar')
    expect(verse).toHaveClass('arabic')
  })

  it('ends with the verse mark and the number in Arabic digits (FR-004)', () => {
    render(<Verse ayah={{ aya: 12, text: 'نص' }} />)
    const marker = screen.getByRole('img', { name: 'Verse 12' })
    expect(marker).toHaveTextContent('۝١٢')
  })

  it('keeps the mark on the same line as the last word', () => {
    const { container } = render(<Verse ayah={ayah} />)
    expect(container.textContent).toBe(`${ayah.text} ۝٢`)
  })
})

import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import { describe, expect, it } from 'vitest'
import { ReaderPage } from './ReaderPage'

function renderReader(url: string) {
  return render(
    <MemoryRouter initialEntries={[url]}>
      <Routes>
        <Route path="/sura/:sura" element={<ReaderPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('ReaderPage', () => {
  it('shows the sura name as the heading', async () => {
    renderReader('/sura/2')
    expect(
      await screen.findByRole('heading', { level: 1, name: '2. Al-Baqara' }),
    ).toBeInTheDocument()
    expect(screen.getByText('البقرة')).toBeInTheDocument()
    expect(screen.getByText('Medinan · 286 verses')).toBeInTheDocument()
  })

  it('shows every verse of the sura, in order', async () => {
    renderReader('/sura/2')
    const markers = await screen.findAllByRole('img', { name: /^Verse \d+$/ })
    expect(markers).toHaveLength(286)
    expect(markers[0]).toHaveAccessibleName('Verse 1')
    expect(markers[285]).toHaveAccessibleName('Verse 286')
  })

  it('shows Bismillah as a heading, not as verse 1 (H1.4)', async () => {
    const { container } = renderReader('/sura/2')
    const bismillah = await screen.findByRole('heading', { level: 2 })
    expect(bismillah.textContent?.startsWith('بِسْمِ')).toBe(true)
    const firstVerse = container.querySelector('.verse')
    expect(firstVerse?.textContent?.startsWith('الٓمٓ')).toBe(true)
  })

  it.each([1, 9])('shows no Bismillah heading in sura %i', async (sura) => {
    renderReader(`/sura/${sura}`)
    await screen.findByRole('heading', { level: 1 })
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull()
  })

  it.each(['/sura/0', '/sura/115', '/sura/abc'])(
    '%s shows a friendly message',
    async (url) => {
      renderReader(url)
      expect(
        await screen.findByRole('heading', { name: 'Sura not found' }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('link', { name: 'Go to the list of suras' }),
      ).toBeInTheDocument()
    },
  )
})

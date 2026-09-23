import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { AboutPage } from './AboutPage'

function renderAbout() {
  render(
    <MemoryRouter>
      <AboutPage />
    </MemoryRouter>,
  )
}

describe('AboutPage (FR-017)', () => {
  it('credits Tanzil with a link and names the licence', () => {
    renderAbout()
    expect(screen.getByRole('link', { name: 'tanzil.net' })).toHaveAttribute(
      'href',
      'https://tanzil.net',
    )
    expect(
      screen.getByRole('link', { name: 'Creative Commons Attribution 3.0' }),
    ).toBeInTheDocument()
  })

  it('names the translation and its non-commercial terms', () => {
    renderAbout()
    expect(screen.getByText('Saheeh International')).toBeInTheDocument()
    expect(screen.getByText(/non-commercial purposes only/)).toBeInTheDocument()
  })

  it('links to the font licence', () => {
    renderAbout()
    expect(
      screen.getByRole('link', { name: 'SIL Open Font License 1.1' }),
    ).toHaveAttribute('href', '/licenses/amiri-quran-OFL.txt')
  })

  it("shows Tanzil's copyright notice exactly as in the data files", async () => {
    renderAbout()
    const notices = await screen.findAllByText(/Tanzil/, { selector: 'pre' })
    expect(notices[0]).toHaveTextContent(
      'Copyright (C) 2007-2026 Tanzil Project',
    )
    expect(notices[0]).toHaveTextContent('CHANGING IT IS NOT ALLOWED')
  })
})

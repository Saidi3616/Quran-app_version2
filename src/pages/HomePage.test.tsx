import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import { fakeFetch } from '../test/fakeFetch'
import { HomePage } from './HomePage'

function renderHome() {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  )
}

describe('HomePage', () => {
  it('shows "Loading…" while the suras are loading', () => {
    renderHome()
    expect(screen.getByRole('status')).toHaveTextContent('Loading…')
  })

  it('lists all 114 suras', async () => {
    renderHome()
    const list = await screen.findByRole('list', { name: 'Suras' })
    expect(within(list).getAllByRole('listitem')).toHaveLength(114)
  })

  it('shows number, names, place of revelation and verse count (FR-001)', async () => {
    renderHome()
    const first = (await screen.findAllByRole('listitem'))[0]
    expect(first).toHaveTextContent('1')
    expect(first).toHaveTextContent('Al-Faatiha')
    expect(first).toHaveTextContent('الفاتحة')
    expect(first).toHaveTextContent('Meccan · 7 verses')
  })

  it('links each sura to its reading page', async () => {
    renderHome()
    const link = await screen.findByRole('link', { name: /Yaseen/ })
    expect(link).toHaveAttribute('href', '/sura/36')
  })

  it('shows a friendly message if the suras cannot be loaded', async () => {
    fakeFetch.mockResolvedValueOnce(new Response('', { status: 503 }))
    renderHome()
    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Could not load the Quran text',
    )
  })
})

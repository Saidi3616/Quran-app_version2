import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, expect, it } from 'vitest'
import App from './App'

// MemoryRouter lets a test pretend the browser is at a given address.
function renderAt(url: string) {
  render(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App routes (plan, section 5)', () => {
  it.each([
    ['/', 'Suras'],
    ['/sura/2', 'Sura 2'],
    ['/sura/2/255', 'Sura 2'],
    ['/juz/30', 'Juz 30'],
    ['/page/604', 'Page 604'],
    ['/search', 'Search'],
    ['/bookmarks', 'Bookmarks'],
    ['/settings', 'Settings'],
    ['/about', 'About'],
    ['/does-not-exist', 'Page not found'],
  ])('%s shows "%s"', (url, heading) => {
    renderAt(url)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(heading)
  })

  it('shows the menu on every page', () => {
    renderAt('/about')
    const menu = screen.getByRole('navigation', { name: 'Main' })
    expect(menu).toHaveTextContent('Search')
    expect(menu).toHaveTextContent('Bookmarks')
    expect(menu).toHaveTextContent('Settings')
  })
})

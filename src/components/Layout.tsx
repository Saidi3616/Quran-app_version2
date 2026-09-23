import { Link, NavLink, Outlet } from 'react-router'
import './Layout.css'

/** The frame around every screen: a top bar with the menu, the page, and a footer. */
export function Layout() {
  return (
    <>
      <header className="topbar">
        <div className="topbar__inner">
          <Link to="/" className="topbar__title">
            Quran
          </Link>
          <nav aria-label="Main">
            <ul className="topbar__nav">
              <li>
                <NavLink to="/search">Search</NavLink>
              </li>
              <li>
                <NavLink to="/bookmarks">Bookmarks</NavLink>
              </li>
              <li>
                <NavLink to="/settings">Settings</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        {/* Tanzil's terms: the source must be clearly indicated, with a link. */}
        <p>
          Quran text: <a href="https://tanzil.net">Tanzil.net</a> ·{' '}
          <Link to="/about">About &amp; sources</Link>
        </p>
      </footer>
    </>
  )
}

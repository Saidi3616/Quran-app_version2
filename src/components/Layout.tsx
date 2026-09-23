import type { ReactNode } from 'react'
import './Layout.css'

/** The frame around every screen: a top bar and the content below it. */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="topbar">
        <div className="topbar__inner">
          <h1 className="topbar__title">Quran</h1>
          <span className="topbar__arabic arabic" lang="ar" aria-hidden="true">
            القرآن الكريم
          </span>
        </div>
      </header>
      <main className="content">{children}</main>
    </>
  )
}

import { Link } from 'react-router'
import type { Sura } from '../quran/types'
import './SuraList.css'

/** The list of all suras on the home screen (FR-001 · H1.1). */
export function SuraList({ suras }: { suras: Sura[] }) {
  return (
    <ol className="sura-list" aria-label="Suras">
      {suras.map((sura) => (
        <li key={sura.number}>
          <Link to={`/sura/${sura.number}`} className="sura-list__item">
            <span className="sura-list__number">{sura.number}</span>
            <span className="sura-list__info">
              <span className="sura-list__name">{sura.nameTransliterated}</span>
              <span className="sura-list__details">
                {sura.revelation} · {sura.ayahCount} verses
              </span>
            </span>
            <span className="sura-list__arabic arabic" lang="ar">
              {sura.nameArabic}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  )
}

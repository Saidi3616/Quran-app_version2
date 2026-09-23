import { Link, useParams } from 'react-router'
import { AsyncStatus } from '../components/AsyncStatus'
import { Verse } from '../components/Verse'
import { useAsync } from '../hooks/useAsync'
import { getSura } from '../quran'
import './ReaderPage.css'

// "/sura/:sura" and "/sura/:sura/:aya" — reading a sura (H1). Jumping to a verse comes in T015.
export function ReaderPage() {
  const suraNumber = Number(useParams().sura)
  const result = useAsync(() => getSura(suraNumber), [suraNumber])

  if (result.status !== 'done') return <AsyncStatus state={result} />

  if (result.data === null) {
    return (
      <>
        <h1>Sura not found</h1>
        <p>
          There is no sura with this number. The Quran has 114 suras.{' '}
          <Link to="/">Go to the list of suras</Link>
        </p>
      </>
    )
  }

  const { sura, ayahs } = result.data
  // Tanzil marks Bismillah on verse 1 of every sura except 1 (where it is verse 1) and 9.
  const bismillah = ayahs[0]?.bismillah

  return (
    <article className="reader">
      <header className="reader__header">
        <h1 className="reader__title">
          {sura.number}. {sura.nameTransliterated}
        </h1>
        <p className="reader__arabic-name arabic" lang="ar">
          {sura.nameArabic}
        </p>
        <p className="reader__details">
          {sura.revelation} · {sura.ayahCount} verses
        </p>
      </header>

      {bismillah && (
        <h2 className="reader__bismillah arabic" lang="ar" dir="rtl">
          {bismillah}
        </h2>
      )}

      <div className="reader__verses">
        {ayahs.map((ayah) => (
          <Verse key={ayah.aya} ayah={ayah} />
        ))}
      </div>
    </article>
  )
}

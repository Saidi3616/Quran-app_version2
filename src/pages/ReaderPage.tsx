import { useParams } from 'react-router'

// "/sura/:sura" and "/sura/:sura/:aya" — reading a sura (H1, H2). Filled in by T014 and T015.
export function ReaderPage() {
  const { sura, aya } = useParams()
  return (
    <>
      <h1>Sura {sura}</h1>
      {aya && <p>Verse {aya}</p>}
    </>
  )
}

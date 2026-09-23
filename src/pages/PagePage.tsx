import { useParams } from 'react-router'

// "/page/:page" — sends the reader to the first verse on a mushaf page (H2). Filled in by T016.
export function PagePage() {
  const { page } = useParams()
  return <h1>Page {page}</h1>
}

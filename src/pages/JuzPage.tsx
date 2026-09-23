import { useParams } from 'react-router'

// "/juz/:juz" — sends the reader to the first verse of the juz (H2). Filled in by T016.
export function JuzPage() {
  const { juz } = useParams()
  return <h1>Juz {juz}</h1>
}

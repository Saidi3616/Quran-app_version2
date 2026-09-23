import { AsyncStatus } from '../components/AsyncStatus'
import { SuraList } from '../components/SuraList'
import { useAsync } from '../hooks/useAsync'
import { getSuras } from '../quran'

// "/" — the list of suras (H1). "Continue reading" (H4) is added in T021.
export function HomePage() {
  const suras = useAsync(getSuras, [])
  return (
    <>
      <h1>Suras</h1>
      {suras.status === 'done' ? (
        <SuraList suras={suras.data} />
      ) : (
        <AsyncStatus state={suras} />
      )}
    </>
  )
}

import type { AsyncState } from '../hooks/useAsync'

/** Shows "Loading…" or an error message while data is not ready. */
export function AsyncStatus({ state }: { state: AsyncState<unknown> }) {
  if (state.status === 'loading') {
    return <p role="status">Loading…</p>
  }
  if (state.status === 'error') {
    return (
      <p role="alert">
        Could not load the Quran text. Please check your internet connection and
        try again.
      </p>
    )
  }
  return null
}

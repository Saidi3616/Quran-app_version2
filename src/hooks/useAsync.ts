import { useEffect, useState } from 'react'

export type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'error'; error: Error }
  | { status: 'done'; data: T }

/**
 * Runs an async function (e.g. getSuras) and keeps track of its result,
 * so a screen can show "Loading…", an error, or the data.
 *
 * `deps` works like in useEffect: when a value in it changes (e.g. the sura
 * number in the address), the function runs again.
 */
export function useAsync<T>(
  load: () => Promise<T>,
  deps: readonly unknown[],
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ status: 'loading' })

  // The caller decides the deps, so the linter cannot check them here.
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    // If deps change before the old request finishes, ignore the old result.
    let cancelled = false
    setState({ status: 'loading' })
    load().then(
      (data) => !cancelled && setState({ status: 'done', data }),
      (error: Error) => !cancelled && setState({ status: 'error', error }),
    )
    return () => {
      cancelled = true
    }
  }, deps)
  /* eslint-enable react-hooks/exhaustive-deps */

  return state
}

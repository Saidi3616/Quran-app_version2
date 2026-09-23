import { Link } from 'react-router'

// Any address that does not exist.
export function NotFoundPage() {
  return (
    <>
      <h1>Page not found</h1>
      <p>
        This page does not exist. <Link to="/">Go to the list of suras</Link>
      </p>
    </>
  )
}

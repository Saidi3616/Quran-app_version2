// Runs before every test file.
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'
// Adds DOM matchers like toBeInTheDocument() to Vitest's expect.
import '@testing-library/jest-dom/vitest'

// Remove what a test rendered, so the next test starts with an empty page.
afterEach(() => {
  cleanup()
})

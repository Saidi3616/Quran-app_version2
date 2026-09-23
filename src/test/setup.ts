// Runs before every test file.
import { cleanup } from '@testing-library/react'
import { afterEach, beforeEach, vi } from 'vitest'
// Adds DOM matchers like toBeInTheDocument() to Vitest's expect.
import '@testing-library/jest-dom/vitest'
import { clearCache } from '../quran/load'
import { fakeFetch } from './fakeFetch'

beforeEach(() => {
  clearCache()
  fakeFetch.mockClear()
  vi.stubGlobal('fetch', fakeFetch)
})

afterEach(() => {
  // Remove what a test rendered, so the next test starts with an empty page.
  cleanup()
  vi.unstubAllGlobals()
})

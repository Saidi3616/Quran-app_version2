import { defineConfig, devices } from '@playwright/test'

// Acceptance tests: one file per user story in specs/001-tekst-og-navigation/spec.md
export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://localhost:4173',
    // Mobile first (NFR-003): test on a small phone-sized screen.
    ...devices['Pixel 5'],
    launchOptions: {
      // Optional: use a preinstalled Chromium instead of Playwright's own download.
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined,
    },
  },
  webServer: {
    command: 'npm run build && npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
})

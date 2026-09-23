import { expect, test } from '@playwright/test'

test('the app opens on the list of suras', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: 'Quran' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Suras')
})

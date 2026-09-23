import { expect, test } from '@playwright/test'

test('the app opens and shows its title', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Quran' })).toBeVisible()
})

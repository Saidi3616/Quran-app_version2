import { expect, test } from '@playwright/test'

// T011: every screen has its own address, and the back button works.

test('a link can open a screen directly', async ({ page }) => {
  await page.goto('/sura/2/255')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    '2. Al-Baqara',
  )
})

test('the back button returns to the previous screen', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Search' }).click()
  await expect(page).toHaveURL('/search')
  await page.getByRole('link', { name: 'Settings' }).click()
  await expect(page).toHaveURL('/settings')

  await page.goBack()
  await expect(page).toHaveURL('/search')
  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Suras')
})

test('the menu shows which screen you are on', async ({ page }) => {
  await page.goto('/bookmarks')
  await expect(page.getByRole('link', { name: 'Bookmarks' })).toHaveClass(
    /active/,
  )
  await expect(page.getByRole('link', { name: 'Search' })).not.toHaveClass(
    /active/,
  )
})

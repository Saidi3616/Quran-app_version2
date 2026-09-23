import { expect, test } from '@playwright/test'

// Spec 001 · Story 1: Read a sura (P1)

test('H1.1 · the home screen lists all 114 suras with number, names, verse count and place of revelation', async ({
  page,
}) => {
  // Given that I open the app
  await page.goto('/')

  // When the home screen is shown
  const list = page.getByRole('list', { name: 'Suras' })

  // Then I see all 114 suras with number, Arabic name, transliterated name,
  // number of verses and whether the sura is from Mecca or Medina
  await expect(list.getByRole('listitem')).toHaveCount(114)

  const fatiha = list.getByRole('listitem').first()
  await expect(fatiha).toContainText('1')
  await expect(fatiha).toContainText('الفاتحة')
  await expect(fatiha).toContainText('Al-Faatiha')
  await expect(fatiha).toContainText('7 verses')
  await expect(fatiha).toContainText('Meccan')

  const baqara = list.getByRole('listitem').nth(1)
  await expect(baqara).toContainText('البقرة')
  await expect(baqara).toContainText('286 verses')
  await expect(baqara).toContainText('Medinan')

  const nas = list.getByRole('listitem').last()
  await expect(nas).toContainText('114')
  await expect(nas).toContainText('الناس')
})

test('H1.1 · choosing a sura opens its reading page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /Yaseen/ }).click()
  await expect(page).toHaveURL('/sura/36')
})

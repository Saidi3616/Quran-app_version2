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

test('H1.2 · a sura shows all its verses in Uthmani script, in order, right to left', async ({
  page,
  request,
}) => {
  // Given the list, when I choose a sura
  await page.goto('/')
  await page.getByRole('link', { name: /Al-Faatiha/ }).click()

  // Then all its verses are shown in the right order, right to left
  const verses = page.locator('.verse')
  await expect(verses).toHaveCount(7)
  await expect(verses.first()).toHaveCSS('direction', 'rtl')

  // …exactly as in the Tanzil text, character for character
  const data = await (await request.get('/data/quran-uthmani.json')).json()
  const expected: string[] = data.ayahs
    .filter((a: { sura: number }) => a.sura === 1)
    .map((a: { text: string }) => a.text)
  const shown = await verses.evaluateAll((elements) =>
    elements.map((el) => el.firstChild?.textContent),
  )
  expect(shown).toEqual(expected)
})

test('H1.3 · every verse ends with a clear Arabic verse mark with its number', async ({
  page,
}) => {
  // Given a verse
  await page.goto('/sura/2')

  // Then the verse number is shown at the end of the verse as an Arabic mark
  const verse12 = page.locator('.verse').nth(11)
  const marker = verse12.getByRole('img', { name: 'Verse 12' })
  await expect(marker).toHaveText('۝١٢')
  // …and it is the last thing in the verse
  await expect(verse12).toHaveText(/۝١٢$/)
})

test('H1.4 · Bismillah is a heading above the sura, not verse 1', async ({
  page,
}) => {
  await page.goto('/sura/2')
  const bismillah = page.getByRole('heading', { level: 2 })
  await expect(bismillah).toHaveText(/^بِسْمِ/)
  await expect(page.locator('.verse').first()).toHaveText(/^الٓمٓ/)
})

test('H1.4 · Al-Fatiha has Bismillah as verse 1 and no extra heading', async ({
  page,
}) => {
  await page.goto('/sura/1')
  await expect(page.locator('.verse').first()).toHaveText(/^بِسْمِ/)
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(0)
})

test('H1.4 · At-Tawba has no Bismillah', async ({ page }) => {
  await page.goto('/sura/9')
  await expect(page.locator('.verse').first()).toBeVisible()
  await expect(page.getByRole('heading', { level: 2 })).toHaveCount(0)
})

import { expect, test } from '@playwright/test'

// T010: font and basic layout (FR-003, NFR-003).

test('Arabic text is shown in the Amiri Quran font', async ({ page }) => {
  await page.goto('/')
  const arabic = page.locator('.arabic').first()
  await expect(arabic).toBeVisible()
  await expect(arabic).toHaveCSS('direction', 'rtl')

  // Note: document.fonts.check() also returns true when the font does not
  // exist at all, so we look for an Amiri Quran font face that has actually loaded.
  const loadedFonts = await page.evaluate(async () => {
    await document.fonts.ready
    return [...document.fonts]
      .filter((font) => font.status === 'loaded')
      .map((font) => font.family.replaceAll('"', ''))
  })
  expect(loadedFonts).toContain('Amiri Quran')
})

test('there is no horizontal scrolling on a 360 px wide phone', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 740 })
  await page.goto('/')
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  )
  expect(overflow).toBeLessThanOrEqual(0)
})

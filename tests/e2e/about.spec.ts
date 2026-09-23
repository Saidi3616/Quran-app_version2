import { expect, test } from '@playwright/test'

// FR-017: an About page with the source and licence of all content (specs/licenser.md).

test('every page names Tanzil as the source, with a link', async ({ page }) => {
  for (const url of ['/', '/sura/1', '/settings']) {
    await page.goto(url)
    const footer = page.getByRole('contentinfo')
    await expect(
      footer.getByRole('link', { name: 'Tanzil.net' }),
    ).toHaveAttribute('href', 'https://tanzil.net')
  }
})

test('the About page shows sources, licences and the copyright notice', async ({
  page,
}) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'About & sources' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('About')

  await expect(
    page.getByText('Creative Commons Attribution 3.0').first(),
  ).toBeVisible()
  await expect(page.getByText('Saheeh International').first()).toBeVisible()
  await expect(page.locator('pre').first()).toContainText(
    'CHANGING IT IS NOT ALLOWED',
  )
})

test('the font licence file can be opened', async ({ page, request }) => {
  await page.goto('/about')
  const href = await page
    .getByRole('link', { name: 'SIL Open Font License 1.1' })
    .getAttribute('href')
  const response = await request.get(href!)
  expect(response.ok()).toBe(true)
  expect(await response.text()).toContain('SIL Open Font License')
})

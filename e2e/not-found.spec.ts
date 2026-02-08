import { test, expect } from '@playwright/test'

test.describe('404 Page', () => {
  test('should show 404 for invalid URL', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')
    await expect(page.getByText('404')).toBeVisible({ timeout: 15000 })
    await expect(page.getByText('Page non trouvée')).toBeVisible()
  })

  test('should have a working link back to home', async ({ page }) => {
    await page.goto('/nonexistent-route')
    const homeLink = page.getByRole('link', { name: /retour/i })
    await expect(homeLink).toBeVisible({ timeout: 15000 })
    await homeLink.click()
    await expect(page).toHaveURL(/\/$/)
  })
})

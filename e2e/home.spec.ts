import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load and display the main heading', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Pystep/)
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 15000 })
  })

  test('should have a CTA button linking to register', async ({ page }) => {
    await page.goto('/')
    const cta = page.getByRole('link', { name: /commencer gratuitement/i })
    await expect(cta).toBeVisible({ timeout: 15000 })
  })

  test('should navigate to login page via header', async ({ page }) => {
    await page.goto('/')
    // Wait for React to mount
    await page.waitForLoadState('networkidle')
    const loginLink = page.getByRole('link', { name: /se connecter/i }).first()
    await expect(loginLink).toBeVisible({ timeout: 15000 })
    await loginLink.click()
    await expect(page).toHaveURL(/\/login/)
  })
})

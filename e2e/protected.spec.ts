import { test, expect } from '@playwright/test'

test.describe('Protected Routes', () => {
  test('should redirect /dashboard to /login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard')
    // Wait for Supabase auth check + redirect (loading → no user → Navigate to /login)
    await expect(page).toHaveURL(/\/login/, { timeout: 15000 })
  })

  test('should redirect /course to /login when not authenticated', async ({ page }) => {
    await page.goto('/course')
    await expect(page).toHaveURL(/\/login/, { timeout: 15000 })
  })

  test('should redirect /lesson/1.1 to /login when not authenticated', async ({ page }) => {
    await page.goto('/lesson/1.1')
    await expect(page).toHaveURL(/\/login/, { timeout: 15000 })
  })
})

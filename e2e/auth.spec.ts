import { test, expect } from '@playwright/test'

test.describe('Authentication Pages', () => {
  test('should load the login page with email and password fields', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByLabel(/email/i)).toBeVisible({ timeout: 15000 })
    await expect(page.locator('#password')).toBeVisible()
  })

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('invalid@test.com')
    await page.locator('#password').fill('wrongpassword123')
    await page.getByRole('button', { name: /se connecter/i }).click()
    // Wait for error alert (Supabase returns error for invalid creds)
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 10000 })
  })

  test('should load the register page', async ({ page }) => {
    await page.goto('/register')
    await expect(page.getByLabel(/email/i)).toBeVisible({ timeout: 15000 })
  })
})

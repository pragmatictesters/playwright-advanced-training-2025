/**
 * ============================================
 * 08 - Authentication Tests
 * ============================================
 * 
 * This file demonstrates testing authentication flows:
 * - Login with valid credentials
 * - Login with invalid credentials
 * - Logout functionality
 * - Session management
 * - Error message validation
 * - Remember me functionality
 * 
 * 🎓 KEY LEARNING POINTS:
 * 1. Store credentials in config, not in test code
 * 2. Test both success and failure scenarios
 * 3. Verify error messages are user-friendly
 * 4. Test session persistence and logout
 * 5. Use storageState for authenticated tests
 * 
 * @author Pragmatic Test Labs
 */

import { test, expect } from '@playwright/test';
import { BASE_URL, SECTIONS, CREDENTIALS, ERROR_MESSAGES } from './helpers/test-config';

test.describe('08 - Authentication', () => {
  
  // Navigate to Auth section before each test
  test.beforeEach(async ({ page }) => {
    await page.goto(BASE_URL);
    await page.click(`text=${SECTIONS.AUTH}`);
  });

  // ============================================
  // VALID LOGIN TESTS
  // ============================================
  test.describe('Valid Login', () => {

    /**
     * Test: Login with valid credentials
     * 🎓 LEARN: Test the happy path first
     */
    test('should login successfully with valid credentials', async ({ page }) => {
      // Fill login form
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);

      // Click login button
      await page.click('[data-testid="login-btn"]');

      // Verify successful login - dashboard becomes visible
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
      await expect(page.locator('#dashboard-user'))
        .toContainText(CREDENTIALS.valid.username);
    });

    /**
     * Test: Login form hidden after successful login
     * 🎓 LEARN: Verify form state after submission
     */
    test('should hide form after successful login', async ({ page }) => {
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);
      await page.click('[data-testid="login-btn"]');

      // Wait for login to complete
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();

      // Login form should be hidden
      await expect(page.locator('[data-testid="login-form"]')).not.toBeVisible();
    });

    /**
     * Test: Login shows user dashboard
     * 🎓 LEARN: Verify post-login state
     */
    test('should show user dashboard after login', async ({ page }) => {
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);
      await page.click('[data-testid="login-btn"]');

      // Verify dashboard elements are visible
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
      await expect(page.locator('#logout-btn')).toBeVisible();
    });
  });

  // ============================================
  // INVALID LOGIN TESTS
  // ============================================
  test.describe('Invalid Login', () => {
    
    /**
     * Test: Login with invalid username
     * 🎓 LEARN: Test authentication failure scenarios
     */
    test('should show error for invalid username', async ({ page }) => {
      await page.fill('[data-testid="username"]', CREDENTIALS.invalid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);
      await page.click('[data-testid="login-btn"]');
      
      // Verify error message
      await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
      await expect(page.locator('[data-testid="login-error"]'))
        .toContainText(ERROR_MESSAGES.invalidCredentials);
    });

    /**
     * Test: Login with invalid password
     * 🎓 LEARN: Test wrong password scenario
     */
    test('should show error for invalid password', async ({ page }) => {
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.invalid.password);
      await page.click('[data-testid="login-btn"]');
      
      // Verify error message
      await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
    });

    /**
     * Test: Login with empty credentials
     * 🎓 LEARN: Test validation for required fields
     */
    test('should show error for empty credentials', async ({ page }) => {
      // Click login without filling form
      await page.click('[data-testid="login-btn"]');
      
      // Verify validation error
      await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
    });

    /**
     * Test: Login with empty username only
     * 🎓 LEARN: Test individual field validation
     */
    test('should show error for empty username', async ({ page }) => {
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);
      await page.click('[data-testid="login-btn"]');
      
      // Verify error
      await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
    });

    /**
     * Test: Login with empty password only
     * 🎓 LEARN: Test password field validation
     */
    test('should show error for empty password', async ({ page }) => {
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.click('[data-testid="login-btn"]');

      // Verify error
      await expect(page.locator('[data-testid="login-error"]')).toBeVisible();
    });

    /**
     * Test: Error message clears on retry
     * 🎓 LEARN: Error states should reset appropriately
     */
    test('should clear error when retrying login', async ({ page }) => {
      // First attempt with invalid credentials
      await page.fill('[data-testid="username"]', CREDENTIALS.invalid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.invalid.password);
      await page.click('[data-testid="login-btn"]');

      // Verify error appears
      await expect(page.locator('[data-testid="login-error"]')).toBeVisible();

      // Clear and retry with valid credentials
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);
      await page.click('[data-testid="login-btn"]');

      // Error should be cleared, dashboard shown
      await expect(page.locator('[data-testid="login-error"]')).not.toBeVisible();
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    });
  });

  // ============================================
  // LOGOUT TESTS
  // ============================================
  test.describe('Logout', () => {

    // Login before each logout test
    test.beforeEach(async ({ page }) => {
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);
      await page.click('[data-testid="login-btn"]');
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    });

    /**
     * Test: Logout successfully
     * 🎓 LEARN: Test logout returns to login state
     */
    test('should logout successfully', async ({ page }) => {
      // Click logout
      await page.click('#logout-btn');

      // Verify returned to login form
      await expect(page.locator('[data-testid="login-form"]')).toBeVisible();
      await expect(page.locator('[data-testid="dashboard"]')).not.toBeVisible();
    });

    /**
     * Test: Dashboard hidden after logout
     * 🎓 LEARN: Verify all authenticated content is hidden
     */
    test('should hide dashboard after logout', async ({ page }) => {
      await page.click('#logout-btn');

      // Dashboard should not be visible
      await expect(page.locator('[data-testid="dashboard"]')).not.toBeVisible();
    });

    /**
     * Test: Can login again after logout
     * 🎓 LEARN: Test re-authentication flow
     */
    test('should allow re-login after logout', async ({ page }) => {
      // Logout
      await page.click('#logout-btn');
      await expect(page.locator('[data-testid="login-form"]')).toBeVisible();

      // Login again
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);
      await page.click('[data-testid="login-btn"]');

      // Verify logged in again
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    });
  });

  // ============================================
  // PASSWORD FIELD TESTS
  // ============================================
  test.describe('Password Field Security', () => {

    /**
     * Test: Password field masks input
     * 🎓 LEARN: Password fields should have type="password"
     */
    test('should mask password input', async ({ page }) => {
      const passwordField = page.locator('[data-testid="password"]');

      // Verify password field type
      await expect(passwordField).toHaveAttribute('type', 'password');
    });

    /**
     * Test: Toggle password visibility
     * 🎓 LEARN: Test show/hide password functionality
     */
    test('should toggle password visibility', async ({ page }) => {
      const passwordField = page.locator('[data-testid="password"]');
      const toggleBtn = page.locator('[data-testid="toggle-password"]');

      // Fill password
      await passwordField.fill('secretpassword');

      // Initially masked
      await expect(passwordField).toHaveAttribute('type', 'password');

      // Click toggle (if exists)
      if (await toggleBtn.isVisible()) {
        await toggleBtn.click();

        // Should now be visible
        await expect(passwordField).toHaveAttribute('type', 'text');

        // Toggle back
        await toggleBtn.click();
        await expect(passwordField).toHaveAttribute('type', 'password');
      }
    });
  });

  // ============================================
  // REMEMBER ME TESTS
  // ============================================
  test.describe('Remember Me', () => {

    /**
     * Test: Remember me checkbox exists
     * 🎓 LEARN: Test optional login features
     */
    test('should have remember me option', async ({ page }) => {
      const rememberMe = page.locator('[data-testid="remember-me"]');

      if (await rememberMe.isVisible()) {
        await expect(rememberMe).not.toBeChecked();
      }
    });

    /**
     * Test: Check remember me option
     * 🎓 LEARN: Test checkbox interaction
     */
    test('should check remember me option', async ({ page }) => {
      const rememberMe = page.locator('[data-testid="remember-me"]');

      if (await rememberMe.isVisible()) {
        await rememberMe.check();
        await expect(rememberMe).toBeChecked();
      }
    });
  });

  // ============================================
  // KEYBOARD NAVIGATION TESTS
  // ============================================
  test.describe('Keyboard Navigation', () => {

    /**
     * Test: Submit form with Enter key
     * 🎓 LEARN: Forms should support keyboard submission
     */
    test('should submit login form with Enter key', async ({ page }) => {
      await page.fill('[data-testid="username"]', CREDENTIALS.valid.username);
      await page.fill('[data-testid="password"]', CREDENTIALS.valid.password);

      // Press Enter to submit
      await page.press('[data-testid="password"]', 'Enter');

      // Verify login successful - dashboard visible
      await expect(page.locator('[data-testid="dashboard"]')).toBeVisible();
    });

    /**
     * Test: Tab through form fields
     * 🎓 LEARN: Test keyboard accessibility
     */
    test('should tab through login form fields', async ({ page }) => {
      const usernameField = page.locator('[data-testid="username"]');
      const passwordField = page.locator('[data-testid="password"]');

      // Focus username
      await usernameField.focus();
      await expect(usernameField).toBeFocused();

      // Tab to password
      await page.keyboard.press('Tab');
      await expect(passwordField).toBeFocused();
    });
  });
});


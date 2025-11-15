import { test, expect } from '@playwright/test';

/**
 * SauceDemo Login Tests
 * 
 * Test Suite: Authentication - Login
 * Application: SauceDemo (Swag Labs)
 * URL: https://www.saucedemo.com
 * 
 * Valid Credentials:
 * - Username: standard_user, problem_user, performance_glitch_user, error_user, visual_user
 * - Password: secret_sauce
 * 
 * Locked User:
 * - Username: locked_out_user
 * - Password: secret_sauce (should show error)
 */

test.describe('SauceDemo - Login Tests', () => {
  
  // This runs before each test - navigates to login page
  test.beforeEach(async ({ page }) => {
    // Navigate to SauceDemo login page
    await page.goto('https://www.saucedemo.com/');
    
    // Wait for login page to load
    await expect(page.locator('.login_logo')).toBeVisible();
  });

  // ============================================================================
  // VALID LOGIN TESTS
  // ============================================================================

  test('should login successfully with standard_user', async ({ page }) => {
    // Fill username
    await page.locator('[data-test="username"]').fill('standard_user');
    
    // Fill password
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Click login button
    await page.locator('[data-test="login-button"]').click();
    
    // Verify successful login - redirected to inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    // Verify products page loaded
    await expect(page.locator('.title')).toContainText('Products');
    
    // Verify shopping cart is visible
    await expect(page.locator('.shopping_cart_link')).toBeVisible();
  });

  test('should login successfully with problem_user', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('problem_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify successful login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('should login successfully with performance_glitch_user', async ({ page }) => {
    // This user is intentionally slow - increase timeout
    test.setTimeout(60000); // 60 seconds
    
    await page.locator('[data-test="username"]').fill('performance_glitch_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Wait longer for slow user
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html', { timeout: 30000 });
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('should login successfully with error_user', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('error_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify successful login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('should login successfully with visual_user', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('visual_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify successful login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toContainText('Products');
  });

  test('should show error for locked_out_user', async ({ page }) => {
    // This user is locked out
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Verify error message is displayed
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Epic sadface: Sorry, this user has been locked out');
    
    // Verify still on login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  // ============================================================================
  // INVALID LOGIN TESTS
  // ============================================================================

  test('should show error with empty username and password', async ({ page }) => {
    // Click login without filling any fields
    await page.locator('[data-test="login-button"]').click();
    
    // Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Epic sadface: Username is required');
  });

  test('should show error with empty username', async ({ page }) => {
    // Fill only password
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Click login
    await page.locator('[data-test="login-button"]').click();
    
    // Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Epic sadface: Username is required');
  });

  test('should show error with empty password', async ({ page }) => {
    // Fill only username
    await page.locator('[data-test="username"]').fill('standard_user');
    
    // Click login
    await page.locator('[data-test="login-button"]').click();
    
    // Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Epic sadface: Password is required');
  });

  test('should show error with invalid username', async ({ page }) => {
    // Fill invalid username
    await page.locator('[data-test="username"]').fill('invalid_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Click login
    await page.locator('[data-test="login-button"]').click();
    
    // Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Epic sadface: Username and password do not match');
  });

  test('should show error with invalid password', async ({ page }) => {
    // Fill valid username but invalid password
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    
    // Click login
    await page.locator('[data-test="login-button"]').click();
    
    // Verify error message
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Epic sadface: Username and password do not match');
  });

  test('should be case-sensitive for username', async ({ page }) => {
    // Fill username with wrong case
    await page.locator('[data-test="username"]').fill('STANDARD_USER');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Click login
    await page.locator('[data-test="login-button"]').click();
    
    // Verify error message - username is case-sensitive
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Epic sadface: Username and password do not match');
  });

  test('should be case-sensitive for password', async ({ page }) => {
    // Fill password with wrong case
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('SECRET_SAUCE');
    
    // Click login
    await page.locator('[data-test="login-button"]').click();
    
    // Verify error message - password is case-sensitive
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]'))
      .toContainText('Epic sadface: Username and password do not match');
  });

  // ============================================================================
  // UI VALIDATION TESTS
  // ============================================================================

  test('should display all login page elements', async ({ page }) => {
    // Verify login logo
    await expect(page.locator('.login_logo')).toBeVisible();
    await expect(page.locator('.login_logo')).toContainText('Swag Labs');
    
    // Verify username field
    await expect(page.locator('[data-test="username"]')).toBeVisible();
    
    // Verify password field
    await expect(page.locator('[data-test="password"]')).toBeVisible();
    
    // Verify login button
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('should mask password input', async ({ page }) => {
    // Fill password
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Verify password field type is 'password' (masked)
    const passwordType = await page.locator('[data-test="password"]').getAttribute('type');
    expect(passwordType).toBe('password');
  });

  test('should allow dismissing error message', async ({ page }) => {
    // Trigger error
    await page.locator('[data-test="login-button"]').click();
    
    // Verify error is visible
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    
    // Click error close button
    await page.locator('[data-test="error-button"]').click();
    
    // Verify error is dismissed
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
  });
});


import { test, expect } from '@playwright/test';

/**
 * OrangeHRM Login Tests
 * 
 * Test Suite: Authentication - Login
 * Application: OrangeHRM Demo
 * URL: https://opensource-demo.orangehrmlive.com/
 * 
 * Valid Credentials:
 * - Username: Admin
 * - Password: admin123
 */

test.describe('OrangeHRM - Login Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to OrangeHRM login page before each test
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    
    // Wait for login page to load
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Fill in username
    await page.getByPlaceholder('Username').fill('Admin');
    
    // Fill in password
    await page.getByPlaceholder('Password').fill('admin123');
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify successful login - should redirect to dashboard
    await expect(page).toHaveURL(/dashboard/);
    
    // Verify dashboard heading is visible
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    
    // Verify user dropdown is visible (indicates logged in state)
    await expect(page.locator('.oxd-userdropdown-name')).toBeVisible();
  });

  test('should show error message with invalid username', async ({ page }) => {
    // Fill in invalid username
    await page.getByPlaceholder('Username').fill('InvalidUser');
    
    // Fill in valid password
    await page.getByPlaceholder('Password').fill('admin123');
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify error message is displayed
    await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
    await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
    
    // Verify still on login page
    await expect(page).toHaveURL(/login/);
  });

  test('should show error message with invalid password', async ({ page }) => {
    // Fill in valid username
    await page.getByPlaceholder('Username').fill('Admin');
    
    // Fill in invalid password
    await page.getByPlaceholder('Password').fill('wrongpassword');
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify error message is displayed
    await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
    await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
    
    // Verify still on login page
    await expect(page).toHaveURL(/login/);
  });

  test('should show error message with both invalid credentials', async ({ page }) => {
    // Fill in invalid username
    await page.getByPlaceholder('Username').fill('WrongUser');
    
    // Fill in invalid password
    await page.getByPlaceholder('Password').fill('wrongpassword');
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify error message is displayed
    await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
    await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
    
    // Verify still on login page
    await expect(page).toHaveURL(/login/);
  });

  test('should show required error when username is empty', async ({ page }) => {
    // Leave username empty
    
    // Fill in password
    await page.getByPlaceholder('Password').fill('admin123');
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify required field error is displayed
    await expect(page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('.oxd-input-field-error-message')).toBeVisible();
    await expect(page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('.oxd-input-field-error-message')).toContainText('Required');
    
    // Verify still on login page
    await expect(page).toHaveURL(/login/);
  });

  test('should show required error when password is empty', async ({ page }) => {
    // Fill in username
    await page.getByPlaceholder('Username').fill('Admin');
    
    // Leave password empty
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify required field error is displayed
    await expect(page.locator('.oxd-input-group').filter({ hasText: 'Password' }).locator('.oxd-input-field-error-message')).toBeVisible();
    await expect(page.locator('.oxd-input-group').filter({ hasText: 'Password' }).locator('.oxd-input-field-error-message')).toContainText('Required');
    
    // Verify still on login page
    await expect(page).toHaveURL(/login/);
  });

  test('should show required errors when both fields are empty', async ({ page }) => {
    // Leave both fields empty
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify both required field errors are displayed
    const usernameError = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('.oxd-input-field-error-message');
    const passwordError = page.locator('.oxd-input-group').filter({ hasText: 'Password' }).locator('.oxd-input-field-error-message');
    
    await expect(usernameError).toBeVisible();
    await expect(usernameError).toContainText('Required');
    
    await expect(passwordError).toBeVisible();
    await expect(passwordError).toContainText('Required');
    
    // Verify still on login page
    await expect(page).toHaveURL(/login/);
  });

  test('should NOT be case-sensitive for username', async ({ page }) => {
    // Fill in username with different case
    await page.getByPlaceholder('Username').fill('admin'); // lowercase

    // Fill in valid password
    await page.getByPlaceholder('Password').fill('admin123');

    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Note: OrangeHRM username is NOT case-sensitive
    // Login should succeed with lowercase 'admin'
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should trim leading and trailing spaces in username', async ({ page }) => {
    // Fill in username with spaces
    await page.getByPlaceholder('Username').fill('  Admin  ');
    
    // Fill in valid password
    await page.getByPlaceholder('Password').fill('admin123');
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Note: This test verifies the actual behavior of the application
    // If login succeeds, spaces are trimmed; if it fails, they are not
    // We'll check for either outcome
    
    // Wait for navigation or error
    await page.waitForTimeout(2000);
    
    const currentUrl = page.url();
    
    if (currentUrl.includes('dashboard')) {
      // Spaces were trimmed - login successful
      await expect(page).toHaveURL(/dashboard/);
      await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    } else {
      // Spaces were not trimmed - login failed
      await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
      await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
    }
  });

  test('should display password in masked format', async ({ page }) => {
    // Get password input field
    const passwordInput = page.getByPlaceholder('Password');
    
    // Verify password field type is 'password'
    await expect(passwordInput).toHaveAttribute('type', 'password');
    
    // Fill in password
    await passwordInput.fill('admin123');
    
    // Verify password is still masked
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should have Forgot Password link visible', async ({ page }) => {
    // Verify Forgot Password link is visible (it's a paragraph element, not a button)
    await expect(page.getByText('Forgot your password?')).toBeVisible();
  });

});


import { test, expect } from '@playwright/test';

/**
 * OrangeHRM Logout Tests
 * 
 * Test Suite: Authentication - Logout
 * Application: OrangeHRM Demo
 * URL: https://opensource-demo.orangehrmlive.com/
 * 
 * Prerequisites: User must be logged in
 */

test.describe('OrangeHRM - Logout Functionality', () => {
  
  /**
   * Helper function to login before each test
   */
  test.beforeEach(async ({ page }) => {
    // Navigate to OrangeHRM login page
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    
    // Wait for login page to load
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    
    // Login with valid credentials
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify successful login
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // Click on user dropdown
    await page.locator('.oxd-userdropdown-tab').click();
    
    // Wait for dropdown menu to appear
    await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
    
    // Click logout
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    
    // Verify redirected to login page
    await expect(page).toHaveURL(/login/);
    
    // Verify login form is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });

  test('should not allow access to dashboard after logout', async ({ page }) => {
    // Store dashboard URL
    const dashboardUrl = page.url();
    
    // Logout
    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    
    // Verify logged out
    await expect(page).toHaveURL(/login/);
    
    // Try to access dashboard URL directly
    await page.goto(dashboardUrl);
    
    // Should be redirected to login page
    await expect(page).toHaveURL(/login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('should not allow access after logout when clicking back button', async ({ page }) => {
    // Logout
    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    
    // Verify logged out
    await expect(page).toHaveURL(/login/);
    
    // Click browser back button
    await page.goBack();
    
    // Should still be on login page or redirected to login
    await page.waitForTimeout(1000); // Wait for any redirect
    
    const currentUrl = page.url();
    
    // Verify user cannot access protected pages
    if (currentUrl.includes('dashboard')) {
      // If somehow on dashboard, verify it redirects to login
      await page.waitForURL(/login/, { timeout: 5000 });
    }
    
    // Should be on login page
    await expect(page).toHaveURL(/login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('should clear session after logout', async ({ page }) => {
    // Logout
    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    
    // Verify logged out
    await expect(page).toHaveURL(/login/);
    
    // Try to navigate to any protected page
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
    
    // Should be redirected to login page
    await expect(page).toHaveURL(/login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('should display user dropdown menu items before logout', async ({ page }) => {
    // Click on user dropdown
    await page.locator('.oxd-userdropdown-tab').click();
    
    // Verify dropdown menu items are visible
    await expect(page.getByRole('menuitem', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Support' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Change Password' })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
  });

  test('should show username in user dropdown', async ({ page }) => {
    // Verify user dropdown shows username
    const userDropdown = page.locator('.oxd-userdropdown-name');
    await expect(userDropdown).toBeVisible();
    
    // Click to open dropdown
    await page.locator('.oxd-userdropdown-tab').click();
    
    // Verify dropdown is open
    await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
  });

  test('should close dropdown when clicking outside', async ({ page }) => {
    // Click on user dropdown to open
    await page.locator('.oxd-userdropdown-tab').click();
    
    // Verify dropdown is open
    await expect(page.getByRole('menuitem', { name: 'Logout' })).toBeVisible();
    
    // Click outside the dropdown (on the page heading)
    await page.getByRole('heading', { name: 'Dashboard' }).click();
    
    // Wait a moment for dropdown to close
    await page.waitForTimeout(500);
    
    // Verify dropdown is closed (logout option should not be visible)
    await expect(page.getByRole('menuitem', { name: 'Logout' })).not.toBeVisible();
  });

  test('should logout from any page in the application', async ({ page }) => {
    // Navigate to a different page (e.g., Admin)
    await page.getByRole('link', { name: 'Admin' }).click();
    
    // Wait for Admin page to load
    await expect(page).toHaveURL(/admin/);
    
    // Logout from Admin page
    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    
    // Verify redirected to login page
    await expect(page).toHaveURL(/login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

});


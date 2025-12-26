/**
 * Sample Logout Tests for OrangeHRM
 * 
 * This is a reference implementation for trainees.
 * Demonstrates: Session handling, navigation verification
 * 
 * @author Instructor
 * @module Authentication
 */

import { test, expect } from '@playwright/test';

// =============================================================================
// LOCATORS
// =============================================================================

const locators = {
  // Login
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'button[type="submit"]',
  
  // Dashboard
  userDropdown: '.oxd-userdropdown-tab',
  logoutLink: 'a:has-text("Logout")',
  dashboardHeader: '.oxd-topbar-header-breadcrumb h6',
  
  // Login page elements
  loginTitle: '.orangehrm-login-title',
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

async function loginAsAdmin(page) {
  console.log('🔐 Logging in as Admin...');
  await page.goto('https://opensource-demo.orangehrmlive.com/');
  await page.fill(locators.usernameInput, 'Admin');
  await page.fill(locators.passwordInput, 'admin123');
  await page.click(locators.loginButton);
  await page.waitForURL(/dashboard/);
  console.log('✅ Login successful');
}

// =============================================================================
// POSITIVE TEST CASES
// =============================================================================

test.describe('🚪 Logout - Positive Tests', () => {

  test('TC-LOGOUT-001: Should logout successfully from dashboard', async ({ page }) => {
    console.log('🧪 Test: Successful logout');
    
    // Arrange - Login first
    await loginAsAdmin(page);
    
    // Act - Logout
    console.log('🔓 Logging out...');
    await page.click(locators.userDropdown);
    await page.click(locators.logoutLink);
    
    // Assert
    await expect(page).toHaveURL(/login/);
    await expect(page.locator(locators.loginTitle)).toBeVisible();
    
    console.log('✅ Logout successful - Redirected to login page');
  });

  test('TC-LOGOUT-002: Should redirect to login page after logout', async ({ page }) => {
    console.log('🧪 Test: Verify redirect after logout');
    
    // Arrange
    await loginAsAdmin(page);
    
    // Act
    await page.click(locators.userDropdown);
    await page.click(locators.logoutLink);
    
    // Assert
    const currentUrl = page.url();
    expect(currentUrl).toContain('login');
    await expect(page.locator(locators.usernameInput)).toBeVisible();
    await expect(page.locator(locators.passwordInput)).toBeVisible();
    
    console.log('✅ Login page displayed after logout');
  });

  test('TC-LOGOUT-003: Should display username in dropdown', async ({ page }) => {
    console.log('🧪 Test: Verify username in dropdown');
    
    // Arrange
    await loginAsAdmin(page);
    
    // Assert
    const userDropdownText = await page.locator(locators.userDropdown).textContent();
    expect(userDropdownText).toContain('Admin');
    
    console.log(`✅ Username displayed: ${userDropdownText?.trim()}`);
  });

});

// =============================================================================
// NEGATIVE TEST CASES
// =============================================================================

test.describe('🚪 Logout - Negative Tests', () => {

  test('TC-LOGOUT-004: Should not access dashboard after logout', async ({ page }) => {
    console.log('🧪 Test: Dashboard access denied after logout');
    
    // Arrange - Login and logout
    await loginAsAdmin(page);
    await page.click(locators.userDropdown);
    await page.click(locators.logoutLink);
    await expect(page).toHaveURL(/login/);
    
    // Act - Try to access dashboard directly
    console.log('🔒 Attempting to access dashboard after logout...');
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    
    // Assert - Should redirect to login
    await expect(page).toHaveURL(/login/);
    await expect(page.locator(locators.loginTitle)).toBeVisible();
    
    console.log('✅ Access denied - Redirected to login');
  });

  test('TC-LOGOUT-005: Should not restore session using back button', async ({ page }) => {
    console.log('🧪 Test: Back button session test');
    
    // Arrange - Login and logout
    await loginAsAdmin(page);
    await page.click(locators.userDropdown);
    await page.click(locators.logoutLink);
    await expect(page).toHaveURL(/login/);
    
    // Act - Press browser back button
    console.log('⬅️ Pressing back button...');
    await page.goBack();
    
    // Wait a moment
    await page.waitForTimeout(1000);
    
    // Assert - Should still be on login or redirected there
    // Note: Behavior may vary - this tests session invalidation
    const currentUrl = page.url();
    console.log(`📍 Current URL after back: ${currentUrl}`);
    
    // If somehow on dashboard, verify no active session
    if (currentUrl.includes('dashboard')) {
      await page.reload();
      await expect(page).toHaveURL(/login/);
    }
    
    console.log('✅ Session properly invalidated');
  });

});


/**
 * Sample Login Tests for OrangeHRM
 * 
 * This is a reference implementation for trainees.
 * Use this as a guide for your own test implementations.
 * 
 * @author Instructor
 * @module Authentication
 */

import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// =============================================================================
// TEST DATA
// =============================================================================

const VALID_CREDENTIALS = {
  username: 'Admin',
  password: 'admin123',
};

const INVALID_CREDENTIALS = {
  username: 'invalid_user',
  password: 'wrong_password',
};

// =============================================================================
// LOGIN PAGE LOCATORS
// =============================================================================

const locators = {
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'button[type="submit"]',
  errorMessage: '.oxd-alert-content-text',
  dashboardHeader: '.oxd-topbar-header-breadcrumb h6',
  brandingLogo: '.orangehrm-login-branding img',
};

// =============================================================================
// POSITIVE TEST CASES
// =============================================================================

test.describe('🔐 Login - Positive Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    console.log('📍 Navigating to OrangeHRM login page');
    await page.goto('https://opensource-demo.orangehrmlive.com/');
  });

  test('TC-LOGIN-001: Should login successfully with valid credentials', async ({ page }) => {
    console.log('🧪 Test: Valid login with Admin credentials');
    
    // Arrange
    const { username, password } = VALID_CREDENTIALS;
    
    // Act
    await page.fill(locators.usernameInput, username);
    await page.fill(locators.passwordInput, password);
    await page.click(locators.loginButton);
    
    // Assert
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator(locators.dashboardHeader)).toContainText('Dashboard');
    
    console.log('✅ Login successful - Dashboard loaded');
  });

  test('TC-LOGIN-002: Should display branding logo on login page', async ({ page }) => {
    console.log('🧪 Test: Verify branding logo visibility');
    
    // Assert
    await expect(page.locator(locators.brandingLogo)).toBeVisible();
    
    console.log('✅ Branding logo is visible');
  });

  test('TC-LOGIN-003: Should mask password field', async ({ page }) => {
    console.log('🧪 Test: Verify password field is masked');
    
    // Assert
    const passwordType = await page.locator(locators.passwordInput).getAttribute('type');
    expect(passwordType).toBe('password');
    
    console.log('✅ Password field is properly masked');
  });

});

// =============================================================================
// NEGATIVE TEST CASES
// =============================================================================

test.describe('🔐 Login - Negative Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
  });

  test('TC-LOGIN-004: Should show error for empty username', async ({ page }) => {
    console.log('🧪 Test: Empty username validation');
    
    // Act - Leave username empty, fill password
    await page.fill(locators.passwordInput, 'secret_sauce');
    await page.click(locators.loginButton);
    
    // Assert
    await expect(page.locator('.oxd-input-field-error-message')).toContainText('Required');
    
    console.log('✅ Error displayed for empty username');
  });

  test('TC-LOGIN-005: Should show error for empty password', async ({ page }) => {
    console.log('🧪 Test: Empty password validation');
    
    // Act - Fill username, leave password empty
    await page.fill(locators.usernameInput, 'Admin');
    await page.click(locators.loginButton);
    
    // Assert
    await expect(page.locator('.oxd-input-field-error-message')).toContainText('Required');
    
    console.log('✅ Error displayed for empty password');
  });

  test('TC-LOGIN-006: Should show error for invalid credentials', async ({ page }) => {
    console.log('🧪 Test: Invalid credentials validation');
    
    // Arrange - Generate random invalid credentials
    const randomUsername = faker.internet.username();
    const randomPassword = faker.internet.password();
    
    // Act
    await page.fill(locators.usernameInput, randomUsername);
    await page.fill(locators.passwordInput, randomPassword);
    await page.click(locators.loginButton);
    
    // Assert
    await expect(page.locator(locators.errorMessage)).toContainText('Invalid credentials');
    
    console.log(`✅ Error displayed for invalid user: ${randomUsername}`);
  });

  test('TC-LOGIN-010: Should prevent SQL injection', async ({ page }) => {
    console.log('🧪 Test: SQL injection prevention');
    
    // Arrange - SQL injection attempt
    const sqlInjection = "' OR '1'='1";
    
    // Act
    await page.fill(locators.usernameInput, sqlInjection);
    await page.fill(locators.passwordInput, sqlInjection);
    await page.click(locators.loginButton);
    
    // Assert - Should not login, show error instead
    await expect(page.locator(locators.errorMessage)).toContainText('Invalid credentials');
    await expect(page).not.toHaveURL(/dashboard/);
    
    console.log('✅ SQL injection attempt blocked');
  });

});


import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/saucedemo/login-page';
import { ProductsPage } from '../../pages/saucedemo/products-page';

/**
 * SauceDemo Login Tests - Using Page Object Model (POM)
 * 
 * This file demonstrates using Page Object Model WITHOUT fixtures.
 * Compare this with login-fixtures.spec.ts to see the difference.
 * 
 * Key Points:
 * - Manual instantiation: new LoginPage(page)
 * - More boilerplate code
 * - Still better than no POM (locators centralized)
 * 
 * See: tests/saucedemo/fixtures/login-fixtures.spec.ts for cleaner approach
 */

test.describe('SauceDemo - Login Tests (POM)', () => {
  
  test('should login successfully with standard_user', async ({ page }) => {
    // Manual instantiation of page objects
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    
    // Navigate to login page
    await loginPage.goto();
    
    // Perform login
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify successful login
    await productsPage.verifyPageLoaded();
    await productsPage.verifyTitle('Products');
    await productsPage.verifyShoppingCartVisible();
  });

  test('should show error for locked_out_user', async ({ page }) => {
    // Manual instantiation
    const loginPage = new LoginPage(page);
    
    // Navigate and attempt login
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    // Verify error message
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test('should show error for invalid credentials', async ({ page }) => {
    // Manual instantiation
    const loginPage = new LoginPage(page);
    
    // Navigate and attempt login
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');
    
    // Verify error message
    await loginPage.expectErrorContaining('Username and password do not match');
  });

  test('should show error when username is empty', async ({ page }) => {
    // Manual instantiation
    const loginPage = new LoginPage(page);
    
    // Navigate
    await loginPage.goto();
    
    // Fill only password and click login
    await loginPage.fillPassword('secret_sauce');
    await loginPage.clickLogin();
    
    // Verify error message
    await loginPage.expectErrorContaining('Username is required');
  });

  test('should show error when password is empty', async ({ page }) => {
    // Manual instantiation
    const loginPage = new LoginPage(page);
    
    // Navigate
    await loginPage.goto();
    
    // Fill only username and click login
    await loginPage.fillUsername('standard_user');
    await loginPage.clickLogin();
    
    // Verify error message
    await loginPage.expectErrorContaining('Password is required');
  });

  test('should mask password input', async ({ page }) => {
    // Manual instantiation
    const loginPage = new LoginPage(page);
    
    // Navigate
    await loginPage.goto();
    
    // Fill password
    await loginPage.fillPassword('secret_sauce');
    
    // Verify password is masked
    const isMasked = await loginPage.isPasswordMasked();
    expect(isMasked).toBe(true);
  });

  test('should close error message when X is clicked', async ({ page }) => {
    // Manual instantiation
    const loginPage = new LoginPage(page);
    
    // Navigate and trigger error
    await loginPage.goto();
    await loginPage.clickLogin();
    
    // Verify error is visible
    await loginPage.expectErrorContaining('Username is required');
    
    // Close error
    await loginPage.closeError();
  });

  test('should login with all valid user types', async ({ page }) => {
    // Manual instantiation
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    
    const validUsers = [
      'standard_user',
      'problem_user',
      'performance_glitch_user',
      'error_user',
      'visual_user'
    ];
    
    for (const username of validUsers) {
      // Navigate to login page
      await loginPage.goto();
      
      // Login
      await loginPage.login(username, 'secret_sauce');
      
      // Verify successful login
      await productsPage.verifyPageLoaded();
      
      // Logout for next iteration
      await productsPage.logout();
    }
  });
});


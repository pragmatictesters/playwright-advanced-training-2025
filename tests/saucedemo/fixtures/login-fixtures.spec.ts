import { test, expect } from '../../fixtures/saucedemo-fixtures';

/**
 * SauceDemo Login Tests - Using Fixtures with Page Object Model
 * 
 * This file demonstrates using Page Object Model WITH fixtures.
 * Compare this with login-pom.spec.ts to see the difference.
 * 
 * Key Benefits:
 * - No manual instantiation needed
 * - Cleaner, more readable test code
 * - Less boilerplate
 * - Automatic dependency injection
 * 
 * Notice how loginPage and productsPage are automatically available!
 */

test.describe('SauceDemo - Login Tests (Fixtures)', () => {
  
  test('should login successfully with standard_user', async ({ loginPage, productsPage }) => {
    // No manual instantiation! loginPage is automatically available
    
    // Navigate to login page
    await loginPage.goto();
    
    // Perform login
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Verify successful login
    await productsPage.verifyPageLoaded();
    await productsPage.verifyTitle('Products');
    await productsPage.verifyShoppingCartVisible();
  });

  test('should show error for locked_out_user', async ({ loginPage }) => {
    // Navigate and attempt login
    await loginPage.goto();
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    // Verify error message
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    // Navigate and attempt login
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_password');
    
    // Verify error message
    await loginPage.expectErrorContaining('Username and password do not match');
  });

  test('should show error when username is empty', async ({ loginPage }) => {
    // Navigate
    await loginPage.goto();
    
    // Fill only password and click login
    await loginPage.fillPassword('secret_sauce');
    await loginPage.clickLogin();
    
    // Verify error message
    await loginPage.expectErrorContaining('Username is required');
  });

  test('should show error when password is empty', async ({ loginPage }) => {
    // Navigate
    await loginPage.goto();
    
    // Fill only username and click login
    await loginPage.fillUsername('standard_user');
    await loginPage.clickLogin();
    
    // Verify error message
    await loginPage.expectErrorContaining('Password is required');
  });

  test('should mask password input', async ({ loginPage }) => {
    // Navigate
    await loginPage.goto();
    
    // Fill password
    await loginPage.fillPassword('secret_sauce');
    
    // Verify password is masked
    const isMasked = await loginPage.isPasswordMasked();
    expect(isMasked).toBe(true);
  });

  test('should close error message when X is clicked', async ({ loginPage }) => {
    // Navigate and trigger error
    await loginPage.goto();
    await loginPage.clickLogin();
    
    // Verify error is visible
    await loginPage.expectErrorContaining('Username is required');
    
    // Close error
    await loginPage.closeError();
  });

  test('should login with all valid user types', async ({ loginPage, productsPage }) => {
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

/**
 * COMPARISON: POM vs Fixtures
 * 
 * Without Fixtures (login-pom.spec.ts):
 * ----------------------------------------
 * test('my test', async ({ page }) => {
 *   const loginPage = new LoginPage(page);     // Manual instantiation
 *   const productsPage = new ProductsPage(page); // Manual instantiation
 *   await loginPage.goto();
 * });
 * 
 * With Fixtures (this file):
 * ----------------------------------------
 * test('my test', async ({ loginPage, productsPage }) => {
 *   // No instantiation needed! Cleaner code!
 *   await loginPage.goto();
 * });
 * 
 * Benefits:
 * ✅ Less code to write
 * ✅ More readable
 * ✅ Automatic setup/teardown
 * ✅ Easier to maintain
 */


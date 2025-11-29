/**
 * Day 4 Exercise: Login Tests for SauceDemo
 * 
 * This file demonstrates:
 * - Page Object Model (POM) usage
 * - Custom fixtures for dependency injection
 * - Parameterized tests
 * - Best practices in test organization
 * 
 * Learning Objectives:
 * - Understand how to use POM in tests
 * - Learn fixture-based dependency injection
 * - Apply coding conventions and best practices
 */

import { test, expect } from '../../fixtures/saucedemo-fixtures';

// Test data - centralized and easily maintainable
const VALID_CREDENTIALS = {
  username: 'standard_user',
  password: 'secret_sauce'
};

const LOCKED_USER = {
  username: 'locked_out_user',
  password: 'secret_sauce'
};

test.describe('SauceDemo Login Tests', () => {
  
  test.beforeEach(async ({ loginPage }) => {
    // Navigate to login page before each test
    await loginPage.goto();
  });

  test.describe('Successful Login', () => {
    
    test('should login successfully with valid credentials', async ({ loginPage, productsPage }) => {
      // Arrange - credentials are already defined
      
      // Act
      await loginPage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
      
      // Assert
      await productsPage.verifyPageLoaded();
      await productsPage.verifyTitle('Products');
    });

    test('should display 6 products after successful login', async ({ loginPage, productsPage }) => {
      // Act
      await loginPage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
      
      // Assert
      await productsPage.verifyPageLoaded();
      const productCount = await productsPage.getProductCount();
      expect(productCount).toBe(6);
    });

  });

  test.describe('Failed Login Scenarios', () => {
    
    // Parameterized tests for different error scenarios
    const invalidLoginScenarios = [
      { 
        username: '', 
        password: 'secret_sauce', 
        expectedError: 'Username is required',
        description: 'empty username'
      },
      { 
        username: 'standard_user', 
        password: '', 
        expectedError: 'Password is required',
        description: 'empty password'
      },
      { 
        username: 'invalid_user', 
        password: 'invalid_pass', 
        expectedError: 'Username and password do not match',
        description: 'invalid credentials'
      },
    ];

    for (const scenario of invalidLoginScenarios) {
      test(`should show error for ${scenario.description}`, async ({ loginPage }) => {
        // Act
        await loginPage.login(scenario.username, scenario.password);
        
        // Assert
        await loginPage.verifyErrorMessage(scenario.expectedError);
      });
    }

    test('should show locked out user error', async ({ loginPage }) => {
      // Act
      await loginPage.login(LOCKED_USER.username, LOCKED_USER.password);
      
      // Assert
      await loginPage.verifyErrorMessage('Sorry, this user has been locked out');
    });

    test('should be able to close error message', async ({ loginPage }) => {
      // Arrange - trigger an error
      await loginPage.login('', '');
      await loginPage.verifyErrorMessage('Username is required');
      
      // Act - close the error
      await loginPage.closeError();
      
      // Assert - error should no longer be visible
      await expect(loginPage.errorMessage).not.toBeVisible();
    });

  });

  test.describe('Login Page UI Validation', () => {
    
    test('should have password field masked', async ({ loginPage }) => {
      // Assert
      const isMasked = await loginPage.isPasswordMasked();
      expect(isMasked).toBe(true);
    });

    test('should display login button', async ({ loginPage }) => {
      // Assert
      await expect(loginPage.loginButton).toBeVisible();
      await expect(loginPage.loginButton).toHaveValue('Login');
    });

  });

});


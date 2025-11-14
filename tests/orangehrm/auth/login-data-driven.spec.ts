import { test, expect } from '@playwright/test';
import { readCSV } from '../../../utils/csv-reader';

/**
 * OrangeHRM Data-Driven Login Tests
 * 
 * Test Suite: Authentication - Data-Driven Login Tests
 * Application: OrangeHRM Demo
 * URL: https://opensource-demo.orangehrmlive.com/
 * 
 * Data Source: test-data/orangehrm/invalid-logins.csv
 * 
 * This test suite demonstrates data-driven testing by reading test data
 * from a CSV file and executing tests for each row of data.
 */

// Read test data from CSV file
const invalidLoginData = readCSV('invalid-logins.csv');

test.describe('OrangeHRM - Data-Driven Login Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to OrangeHRM login page before each test
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    
    // Wait for login page to load
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  // Generate a test for each row in the CSV file
  for (const data of invalidLoginData) {
    test(`should show "${data.expectedError}" error for username: "${data.username}" and password: "${data.password}"`, async ({ page }) => {
      
      // Fill in username if provided
      if (data.username) {
        await page.getByPlaceholder('Username').fill(data.username);
      }
      
      // Fill in password if provided
      if (data.password) {
        await page.getByPlaceholder('Password').fill(data.password);
      }
      
      // Click login button
      await page.getByRole('button', { name: 'Login' }).click();
      
      // Wait for error message or validation
      await page.waitForTimeout(1000);
      
      // Verify error message based on expected error type
      if (data.expectedError === 'Invalid credentials') {
        // Check for invalid credentials alert
        await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
        await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
      } else if (data.expectedError === 'Required') {
        // Check for required field validation
        // If username is empty, check username field error
        if (!data.username) {
          const usernameError = page.locator('.oxd-input-group').filter({ hasText: 'Username' }).locator('.oxd-input-field-error-message');
          await expect(usernameError).toBeVisible();
          await expect(usernameError).toContainText('Required');
        }
        
        // If password is empty, check password field error
        if (!data.password) {
          const passwordError = page.locator('.oxd-input-group').filter({ hasText: 'Password' }).locator('.oxd-input-field-error-message');
          await expect(passwordError).toBeVisible();
          await expect(passwordError).toContainText('Required');
        }
      }
      
      // Verify still on login page
      await expect(page).toHaveURL(/login/);
    });
  }

  // Additional test to verify CSV data was loaded
  test('should have loaded test data from CSV file', async () => {
    // Verify that we have test data
    expect(invalidLoginData.length).toBeGreaterThan(0);
    
    // Verify data structure
    expect(invalidLoginData[0]).toHaveProperty('username');
    expect(invalidLoginData[0]).toHaveProperty('password');
    expect(invalidLoginData[0]).toHaveProperty('expectedError');
    
    // Log the number of test cases
    console.log(`Loaded ${invalidLoginData.length} test cases from CSV file`);
  });

  // Test to verify all CSV rows have required fields
  test('should have valid data structure in CSV file', async () => {
    for (const data of invalidLoginData) {
      // Verify each row has the expected properties
      expect(data).toHaveProperty('username');
      expect(data).toHaveProperty('password');
      expect(data).toHaveProperty('expectedError');
      
      // Verify expectedError has valid values
      expect(['Invalid credentials', 'Required']).toContain(data.expectedError);
    }
  });

});

/**
 * Example CSV file structure:
 * 
 * username,password,expectedError
 * Admin,wrongpassword,Invalid credentials
 * invaliduser,admin123,Invalid credentials
 * ,admin123,Required
 * Admin,,Required
 * ,,Required
 * admin,admin123,Invalid credentials
 * ADMIN,ADMIN123,Invalid credentials
 * 
 * How to add more test cases:
 * 1. Open test-data/orangehrm/invalid-logins.csv
 * 2. Add a new row with username, password, and expectedError
 * 3. Run the tests - a new test will be automatically generated
 * 
 * Benefits of data-driven testing:
 * - Easy to add new test cases without modifying code
 * - Test data is separate from test logic
 * - Non-technical users can add test cases
 * - Same test logic runs for all data combinations
 * - Easy to maintain and update test data
 */


/**
 * Sample Add Employee Tests for OrangeHRM
 * 
 * This is a reference implementation for trainees.
 * Demonstrates: Faker.js, POM concepts, logging
 * 
 * @author Instructor
 * @module PIM - Employee Management
 */

import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

// =============================================================================
// TEST DATA GENERATOR
// =============================================================================

interface EmployeeData {
  firstName: string;
  middleName: string;
  lastName: string;
  employeeId: string;
}

function generateEmployee(): EmployeeData {
  return {
    firstName: faker.person.firstName(),
    middleName: faker.person.middleName(),
    lastName: faker.person.lastName(),
    employeeId: faker.string.numeric(4),
  };
}

// =============================================================================
// LOCATORS
// =============================================================================

const locators = {
  // Login
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  loginButton: 'button[type="submit"]',
  
  // Navigation
  pimMenu: 'a:has-text("PIM")',
  addEmployeeButton: 'a:has-text("Add Employee")',
  
  // Add Employee Form
  firstNameInput: 'input[name="firstName"]',
  middleNameInput: 'input[name="middleName"]',
  lastNameInput: 'input[name="lastName"]',
  employeeIdInput: '.oxd-input--active',
  saveButton: 'button[type="submit"]',
  cancelButton: 'button:has-text("Cancel")',
  
  // Messages
  successToast: '.oxd-toast--success',
  errorMessage: '.oxd-input-field-error-message',
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

async function navigateToAddEmployee(page) {
  console.log('📍 Navigating to Add Employee page...');
  await page.click(locators.pimMenu);
  await page.click(locators.addEmployeeButton);
  await expect(page.locator('h6:has-text("Add Employee")')).toBeVisible();
  console.log('✅ Add Employee page loaded');
}

// =============================================================================
// POSITIVE TEST CASES
// =============================================================================

test.describe('👥 Add Employee - Positive Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await navigateToAddEmployee(page);
  });

  test('TC-EMP-001: Add employee with mandatory fields only', async ({ page }) => {
    console.log('🧪 Test: Add employee with required fields');
    
    // Arrange
    const employee = generateEmployee();
    console.log(`📝 Generated: ${employee.firstName} ${employee.lastName}`);
    
    // Act
    await page.fill(locators.firstNameInput, employee.firstName);
    await page.fill(locators.lastNameInput, employee.lastName);
    await page.click(locators.saveButton);
    
    // Assert
    await expect(page.locator(locators.successToast)).toBeVisible({ timeout: 10000 });
    
    console.log(`✅ Employee added: ${employee.firstName} ${employee.lastName}`);
  });

  test('TC-EMP-002: Add employee with all fields', async ({ page }) => {
    console.log('🧪 Test: Add employee with all details');
    
    // Arrange
    const employee = generateEmployee();
    console.log(`📝 Generated: ${employee.firstName} ${employee.middleName} ${employee.lastName}`);
    
    // Act
    await page.fill(locators.firstNameInput, employee.firstName);
    await page.fill(locators.middleNameInput, employee.middleName);
    await page.fill(locators.lastNameInput, employee.lastName);
    await page.click(locators.saveButton);
    
    // Assert
    await expect(page.locator(locators.successToast)).toBeVisible({ timeout: 10000 });
    
    console.log(`✅ Employee added with ID: ${employee.employeeId}`);
  });

});

// =============================================================================
// NEGATIVE TEST CASES
// =============================================================================

test.describe('👥 Add Employee - Negative Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await navigateToAddEmployee(page);
  });

  test('TC-EMP-007: Should show error for empty first name', async ({ page }) => {
    console.log('🧪 Test: Empty first name validation');
    
    // Act - Leave first name empty
    await page.fill(locators.lastNameInput, faker.person.lastName());
    await page.click(locators.saveButton);
    
    // Assert
    await expect(page.locator(locators.errorMessage).first()).toContainText('Required');
    
    console.log('✅ Error displayed for empty first name');
  });

  test('TC-EMP-008: Should show error for empty last name', async ({ page }) => {
    console.log('🧪 Test: Empty last name validation');
    
    // Act - Leave last name empty
    await page.fill(locators.firstNameInput, faker.person.firstName());
    await page.click(locators.saveButton);
    
    // Assert
    await expect(page.locator(locators.errorMessage)).toContainText('Required');
    
    console.log('✅ Error displayed for empty last name');
  });

});


import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

/**
 * OrangeHRM - Add Employee with Faker.js
 * 
 * Test Suite: Employee Management - Add Employee with Faker
 * Application: OrangeHRM Demo
 * URL: https://opensource-demo.orangehrmlive.com/
 * 
 * This test demonstrates using Faker.js to generate realistic test data
 * for employee creation instead of using hardcoded values.
 * 
 * Benefits of using Faker:
 * - Unique data for each test run
 * - Realistic test data
 * - Reduces data conflicts
 * - Easy to maintain
 */

test.describe('OrangeHRM - Add Employee with Faker', () => {
  
  /**
   * Login before each test
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

  test('should add new employee with faker-generated data', async ({ page }) => {
    // Generate realistic employee data using Faker
    const employee = {
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      employeeId: faker.number.int({ min: 1000, max: 9999 }).toString()
    };
    
    // Log the generated data for debugging
    console.log('🎭 Generated Employee Data:');
    console.log(`   First Name: ${employee.firstName}`);
    console.log(`   Middle Name: ${employee.middleName}`);
    console.log(`   Last Name: ${employee.lastName}`);
    console.log(`   Employee ID: ${employee.employeeId}`);
    
    // Navigate to PIM module
    await page.getByRole('link', { name: 'PIM' }).click();
    await expect(page).toHaveURL(/pim/);
    
    // Click Add Employee
    await page.getByRole('link', { name: 'Add Employee' }).click();
    await expect(page).toHaveURL(/addEmployee/);
    
    // Wait for the form to load
    await expect(page.getByPlaceholder('First Name')).toBeVisible();
    
    // Fill employee details with Faker data
    await page.getByPlaceholder('First Name').fill(employee.firstName);
    await page.getByPlaceholder('Middle Name').fill(employee.middleName);
    await page.getByPlaceholder('Last Name').fill(employee.lastName);
    
    // Clear and fill employee ID
    // The employee ID field is the 5th input on the page
    const employeeIdInput = page.locator('.oxd-input').nth(4);
    await employeeIdInput.clear();
    await employeeIdInput.fill(employee.employeeId);
    
    // Save the employee
    await page.getByRole('button', { name: 'Save' }).click();

    // Wait for success message - check for the toast content directly
    const toastMessage = page.locator('.oxd-toast-content');
    await expect(toastMessage).toBeVisible({ timeout: 15000 });
    await expect(toastMessage).toContainText('Success');
    
    // Verify we're on the employee details page
    await expect(page).toHaveURL(/viewPersonalDetails/);
    
    // Verify employee name is displayed on the page
    const employeeNameHeader = page.locator('.orangehrm-edit-employee-name h6');
    await expect(employeeNameHeader).toBeVisible();
    
    // The full name should contain the first name
    await expect(employeeNameHeader).toContainText(employee.firstName);
    
    console.log('✅ Employee created successfully!');
  });

  test('should add multiple employees with unique faker data', async ({ page }) => {
    // Create 3 employees with unique data
    const numberOfEmployees = 3;
    
    for (let i = 0; i < numberOfEmployees; i++) {
      // Generate unique employee data
      const employee = {
        firstName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        lastName: faker.person.lastName(),
        employeeId: faker.number.int({ min: 1000, max: 9999 }).toString()
      };
      
      console.log(`\n🎭 Creating Employee ${i + 1}/${numberOfEmployees}:`);
      console.log(`   Name: ${employee.firstName} ${employee.middleName} ${employee.lastName}`);
      console.log(`   ID: ${employee.employeeId}`);
      
      // Navigate to Add Employee page
      await page.getByRole('link', { name: 'PIM' }).click();
      await page.getByRole('link', { name: 'Add Employee' }).click();
      await expect(page).toHaveURL(/addEmployee/);
      
      // Fill employee details
      await page.getByPlaceholder('First Name').fill(employee.firstName);
      await page.getByPlaceholder('Middle Name').fill(employee.middleName);
      await page.getByPlaceholder('Last Name').fill(employee.lastName);
      
      // Fill employee ID
      const employeeIdInput = page.locator('.oxd-input').nth(4);
      await employeeIdInput.clear();
      await employeeIdInput.fill(employee.employeeId);
      
      // Save employee
      await page.getByRole('button', { name: 'Save' }).click();

      // Wait for success - check toast content directly
      const toastMessage = page.locator('.oxd-toast-content');
      await expect(toastMessage).toBeVisible({ timeout: 15000 });
      await expect(toastMessage).toContainText('Success');
      
      console.log(`   ✅ Employee ${i + 1} created successfully!`);
    }
    
    console.log(`\n🎉 All ${numberOfEmployees} employees created successfully!`);
  });

  test('should demonstrate various faker data types', async ({ page }) => {
    // This test demonstrates different Faker methods
    // Generate comprehensive employee data
    const employee = {
      // Person data
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      fullName: faker.person.fullName(),
      jobTitle: faker.person.jobTitle(),

      // Numbers
      employeeId: faker.number.int({ min: 1000, max: 9999 }).toString(),
      age: faker.number.int({ min: 18, max: 65 }),

      // Internet
      email: faker.internet.email(),
      username: faker.internet.username(),

      // Phone
      phone: faker.phone.number(),

      // Location
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),

      // Date
      birthDate: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
      hireDate: faker.date.past({ years: 5 })
    };

    console.log('\n🎭 Comprehensive Faker Data Demo:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👤 Person Information:');
    console.log(`   First Name: ${employee.firstName}`);
    console.log(`   Middle Name: ${employee.middleName}`);
    console.log(`   Last Name: ${employee.lastName}`);
    console.log(`   Full Name: ${employee.fullName}`);
    console.log(`   Job Title: ${employee.jobTitle}`);
    console.log(`   Age: ${employee.age}`);
    console.log('\n🔢 Identifiers:');
    console.log(`   Employee ID: ${employee.employeeId}`);
    console.log('\n🌐 Contact Information:');
    console.log(`   Email: ${employee.email}`);
    console.log(`   Username: ${employee.username}`);
    console.log(`   Phone: ${employee.phone}`);
    console.log('\n📍 Location:');
    console.log(`   City: ${employee.city}`);
    console.log(`   State: ${employee.state}`);
    console.log(`   Country: ${employee.country}`);
    console.log('\n📅 Dates:');
    console.log(`   Birth Date: ${employee.birthDate.toLocaleDateString()}`);
    console.log(`   Hire Date: ${employee.hireDate.toLocaleDateString()}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Now use this data to create an employee
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();
    await expect(page).toHaveURL(/addEmployee/);

    // Fill basic employee details
    await page.getByPlaceholder('First Name').fill(employee.firstName);
    await page.getByPlaceholder('Middle Name').fill(employee.middleName);
    await page.getByPlaceholder('Last Name').fill(employee.lastName);

    // Fill employee ID
    const employeeIdInput = page.locator('.oxd-input').nth(4);
    await employeeIdInput.clear();
    await employeeIdInput.fill(employee.employeeId);

    // Save employee
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify success - check toast content directly
    const toastMessage = page.locator('.oxd-toast-content');
    await expect(toastMessage).toBeVisible({ timeout: 15000 });
    await expect(toastMessage).toContainText('Success');

    console.log('\n✅ Employee created with comprehensive Faker data!');
  });

  test('should add employee with seeded faker data (reproducible)', async ({ page }) => {
    // Set seed for reproducible data - useful for debugging
    faker.seed(12345);

    const employee = {
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      // Add timestamp to ensure unique employee ID even with seeded data
      employeeId: `${faker.number.int({ min: 1000, max: 9999 })}-${Date.now().toString().slice(-4)}`
    };

    console.log('\n🎲 Seeded Faker Data (Reproducible):');
    console.log(`   Seed: 12345`);
    console.log(`   First Name: ${employee.firstName}`);
    console.log(`   Middle Name: ${employee.middleName}`);
    console.log(`   Last Name: ${employee.lastName}`);
    console.log(`   Employee ID: ${employee.employeeId}`);
    console.log('   💡 Run this test again - you\'ll get the same data!');

    // Navigate to Add Employee
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();
    await expect(page).toHaveURL(/addEmployee/);

    // Fill employee details
    await page.getByPlaceholder('First Name').fill(employee.firstName);
    await page.getByPlaceholder('Middle Name').fill(employee.middleName);
    await page.getByPlaceholder('Last Name').fill(employee.lastName);

    // Fill employee ID
    const employeeIdInput = page.locator('.oxd-input').nth(4);
    await employeeIdInput.clear();
    await employeeIdInput.fill(employee.employeeId);

    // Save employee
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify success - check toast content directly
    const toastMessage = page.locator('.oxd-toast-content');
    await expect(toastMessage).toBeVisible({ timeout: 15000 });
    await expect(toastMessage).toContainText('Success');

    console.log('✅ Seeded employee created successfully!');
  });
});


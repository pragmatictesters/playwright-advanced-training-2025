/**
 * User Data Generator - Demo Test
 * ================================
 * 
 * This test file demonstrates how to use the UserDataGenerator helper class.
 * It uses console.log to print the generated data - making it easy to see
 * the results without complex assertions.
 * 
 * HOW TO RUN THIS TEST:
 * npx playwright test tests/utils/helpers/user-data-generator.spec.ts --project=chromium
 * 
 * TIP: Add --headed to see the browser, or use --ui for interactive mode
 */

import { test } from '@playwright/test';

// ============================================================
// STEP 1: Import the helper class
// ============================================================
// We import our helper class from the same folder
// The './' means "current directory"
import { UserDataGenerator } from './user-data-generator';

// ============================================================
// STEP 2: Create an instance of the helper
// ============================================================
// We create ONE instance that all tests can share
// This is done outside the tests so it's available to all
const userGenerator = new UserDataGenerator();

// ============================================================
// TEST SUITE: Demonstrating Helper Class Usage
// ============================================================
test.describe('User Data Generator - Demo', () => {
  
  /**
   * Test 1: Generate Individual Fields
   * Shows how to generate specific data fields one at a time
   */
  test('should generate individual user fields', async () => {
    console.log('\n========================================');
    console.log('🧪 TEST 1: Generating Individual Fields');
    console.log('========================================\n');

    // Generate individual fields
    const firstName = userGenerator.generateFirstName();
    const lastName = userGenerator.generateLastName();
    const email = userGenerator.generateEmail();
    const username = userGenerator.generateUsername();
    const password = userGenerator.generatePassword();
    const phone = userGenerator.generatePhone();
    const age = userGenerator.generateAge();

    // Print each field
    console.log('📋 Generated Individual Fields:');
    console.log('--------------------------------');
    console.log(`   First Name: ${firstName}`);
    console.log(`   Last Name:  ${lastName}`);
    console.log(`   Email:      ${email}`);
    console.log(`   Username:   ${username}`);
    console.log(`   Password:   ${password}`);
    console.log(`   Phone:      ${phone}`);
    console.log(`   Age:        ${age}`);
    console.log('');
  });

  /**
   * Test 2: Generate Complete User Object
   * Shows how to generate a full user with all fields at once
   */
  test('should generate a complete user object', async () => {
    console.log('\n========================================');
    console.log('🧪 TEST 2: Generating Complete User');
    console.log('========================================\n');

    // Generate a complete user - this is the most common use case!
    const user = userGenerator.generateUser();

    // Print the entire user object
    console.log('👤 Generated User:');
    console.log('------------------');
    console.log(`   First Name: ${user.firstName}`);
    console.log(`   Last Name:  ${user.lastName}`);
    console.log(`   Email:      ${user.email}`);
    console.log(`   Username:   ${user.username}`);
    console.log(`   Password:   ${user.password}`);
    console.log(`   Phone:      ${user.phone}`);
    console.log(`   Age:        ${user.age}`);
    console.log('');

    // You can also print the whole object as JSON
    console.log('📦 As JSON object:');
    console.log(JSON.stringify(user, null, 2));
    console.log('');
  });

  /**
   * Test 3: Generate User with Address (Full Profile)
   * Shows how to generate a complete user profile including address
   */
  test('should generate a user profile with address', async () => {
    console.log('\n========================================');
    console.log('🧪 TEST 3: Generating User Profile');
    console.log('========================================\n');

    // Generate a complete profile with address
    const profile = userGenerator.generateUserProfile();

    console.log('👤 User Information:');
    console.log('--------------------');
    console.log(`   Name:     ${profile.firstName} ${profile.lastName}`);
    console.log(`   Email:    ${profile.email}`);
    console.log(`   Username: ${profile.username}`);
    console.log('');

    console.log('🏠 Address Information:');
    console.log('-----------------------');
    console.log(`   Street:  ${profile.address.street}`);
    console.log(`   City:    ${profile.address.city}`);
    console.log(`   State:   ${profile.address.state}`);
    console.log(`   Zip:     ${profile.address.zipCode}`);
    console.log(`   Country: ${profile.address.country}`);
    console.log('');
  });

  /**
   * Test 4: Generate Multiple Users
   * Shows how to generate many users at once (useful for bulk testing)
   */
  test('should generate multiple users', async () => {
    console.log('\n========================================');
    console.log('🧪 TEST 4: Generating Multiple Users');
    console.log('========================================\n');

    // Generate 3 users at once
    const users = userGenerator.generateMultipleUsers(3);

    console.log(`📋 Generated ${users.length} Users:\n`);

    // Loop through and print each user
    users.forEach((user, index) => {
      console.log(`   User ${index + 1}: ${user.firstName} ${user.lastName}`);
      console.log(`           Email: ${user.email}`);
      console.log('');
    });
  });

  /**
   * Test 5: Custom Email Domain
   * Shows how to customize generated data
   */
  test('should generate email with custom domain', async () => {
    console.log('\n========================================');
    console.log('🧪 TEST 5: Custom Email Domain');
    console.log('========================================\n');

    // Generate emails with different domains
    const defaultEmail = userGenerator.generateEmail();
    const companyEmail = userGenerator.generateEmail('mycompany.com');
    const testEmail = userGenerator.generateEmail('automation-test.org');

    console.log('📧 Generated Emails:');
    console.log('--------------------');
    console.log(`   Default domain:  ${defaultEmail}`);
    console.log(`   Company domain:  ${companyEmail}`);
    console.log(`   Custom domain:   ${testEmail}`);
    console.log('');
  });
});


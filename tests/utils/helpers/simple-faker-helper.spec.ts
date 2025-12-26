/**
 * Simple Faker Helper - Demo Test
 * ================================
 * 
 * RUN: npx playwright test tests/utils/helpers/simple-faker-helper.spec.ts --project=chromium
 */

import { test } from '@playwright/test';
import { SimpleFakerHelper } from './simple-faker-helper';

// Create helper instance
const helper = new SimpleFakerHelper();

test('generate first and last name', async () => {
  // Get random names
  const firstName = helper.getFirstName();
  const lastName = helper.getLastName();

  // Print to console
  console.log('\n👤 Generated Names:');
  console.log(`   First Name: ${firstName}`);
  console.log(`   Last Name:  ${lastName}`);
  console.log(`   Full Name:  ${firstName} ${lastName}`);
});

test('generate contact info', async () => {
  const fullName = helper.getFullName();
  const email = helper.getEmail();
  const phone = helper.getPhone();

  console.log('\n📋 Generated Contact:');
  console.log(`   Name:  ${fullName}`);
  console.log(`   Email: ${email}`);
  console.log(`   Phone: ${phone}`);
});


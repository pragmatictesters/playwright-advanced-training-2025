/**
 * Faker Data Generator - Demo Test
 * ==================================
 * 
 * This test demonstrates how to use the FakerDataGenerator helper class
 * which wraps @faker-js/faker library for easy test data generation.
 * 
 * HOW TO RUN:
 * npx playwright test tests/utils/helpers/faker-data-generator.spec.ts --project=chromium
 */

import { test } from '@playwright/test';
import { FakerDataGenerator } from './faker-data-generator';

// Create instance of the helper
const faker = new FakerDataGenerator();

// ============================================================
// TEST SUITE: Faker Data Generator Demo
// ============================================================
test.describe('Faker Data Generator - Demo', () => {

  /**
   * Test 1: Generate Realistic User Data
   */
  test('should generate realistic user data', async () => {
    console.log('\n========================================');
    console.log('🧪 TEST 1: Generate Realistic User');
    console.log('========================================\n');

    const user = faker.generateUser();

    console.log('👤 Generated User:');
    console.log('------------------');
    console.log(`   Full Name:     ${user.fullName}`);
    console.log(`   Email:         ${user.email}`);
    console.log(`   Username:      ${user.username}`);
    console.log(`   Password:      ${user.password}`);
    console.log(`   Phone:         ${user.phone}`);
    console.log(`   Date of Birth: ${user.dateOfBirth.toLocaleDateString()}`);
    console.log(`   Age:           ${user.age}`);
    console.log(`   Avatar URL:    ${user.avatar}`);
    console.log('');
  });

  /**
   * Test 2: Generate Address Data
   */
  test('should generate realistic address', async () => {
    console.log('\n========================================');
    console.log('🧪 TEST 2: Generate Address');
    console.log('========================================\n');

    const address = faker.generateAddress();

    console.log('🏠 Generated Address:');
    console.log('---------------------');
    console.log(`   Street:    ${address.street}`);
    console.log(`   City:      ${address.city}`);
    console.log(`   State:     ${address.state}`);
    console.log(`   Zip Code:  ${address.zipCode}`);
    console.log(`   Country:   ${address.country}`);
    console.log(`   Latitude:  ${address.latitude}`);
    console.log(`   Longitude: ${address.longitude}`);
    console.log('');
  });

  /**
   * Test 3: Generate Company Data
   */
  test('should generate company information', async () => {
    console.log('\n========================================');
    console.log('🧪 TEST 3: Generate Company');
    console.log('========================================\n');

    const company = faker.generateCompany();

    console.log('🏢 Generated Company:');
    console.log('---------------------');
    console.log(`   Name:        ${company.name}`);
    console.log(`   Catch Phrase: ${company.catchPhrase}`);
    console.log(`   Industry:    ${company.industry}`);
    console.log(`   Website:     ${company.website}`);
    console.log(`   Email:       ${company.email}`);
    console.log(`   Phone:       ${company.phone}`);
    console.log('');
  });

  /**
   * Test 4: Generate Product Data (E-Commerce)
   */
  test('should generate product data for e-commerce', async () => {
    console.log('\n========================================');
    console.log('🧪 TEST 4: Generate Products');
    console.log('========================================\n');

    // Generate a single product
    const product = faker.generateProduct();

    console.log('🛍️ Single Product:');
    console.log('------------------');
    console.log(`   ID:          ${product.id}`);
    console.log(`   Name:        ${product.name}`);
    console.log(`   Price:       $${product.price.toFixed(2)}`);
    console.log(`   Category:    ${product.category}`);
    console.log(`   In Stock:    ${product.inStock ? 'Yes' : 'No'}`);
    console.log(`   Quantity:    ${product.quantity}`);
    console.log(`   Description: ${product.description.substring(0, 50)}...`);
    console.log('');

    // Generate multiple products
    const products = faker.generateProducts(3);
    console.log('📦 Multiple Products:');
    console.log('---------------------');
    products.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.name} - $${p.price.toFixed(2)}`);
    });
    console.log('');
  });

  /**
   * Test 5: Generate Credit Card Data (Payment Testing)
   */
  test('should generate credit card data', async () => {
    console.log('\n========================================');
    console.log('🧪 TEST 5: Generate Credit Card');
    console.log('========================================\n');

    const card = faker.generateCreditCard();

    console.log('💳 Generated Credit Card:');
    console.log('-------------------------');
    console.log(`   Card Type:   ${card.cardType}`);
    console.log(`   Number:      ${card.number}`);
    console.log(`   CVV:         ${card.cvv}`);
    console.log(`   Expiry:      ${card.expiryDate}`);
    console.log(`   Holder:      ${card.holderName}`);
    console.log('');
    console.log('   ⚠️  Note: These are FAKE numbers for testing only!');
    console.log('');
  });

  /**
   * Test 6: Utility Methods Demo
   */
  test('should demonstrate utility methods', async () => {
    console.log('\n========================================');
    console.log('🧪 TEST 6: Utility Methods');
    console.log('========================================\n');

    console.log('🔧 Miscellaneous Data:');
    console.log('----------------------');
    console.log(`   UUID:        ${faker.generateUUID()}`);
    console.log(`   Random #:    ${faker.generateNumber(1, 100)}`);
    console.log(`   Boolean:     ${faker.generateBoolean()}`);
    console.log(`   Past Date:   ${faker.generatePastDate(7).toLocaleDateString()}`);
    console.log(`   Future Date: ${faker.generateFutureDate(30).toLocaleDateString()}`);
    console.log('');

    console.log('📝 Lorem Ipsum:');
    console.log('---------------');
    console.log(`   ${faker.generateParagraph(2)}`);
    console.log('');
  });
});


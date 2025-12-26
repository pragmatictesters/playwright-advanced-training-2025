/**
 * Regular Expressions in Playwright - Demo
 * =========================================
 * 
 * Simple examples showing how to use regex in test automation.
 * 
 * RUN: npx playwright test tests/utils/helpers/regex-examples.spec.ts --project=chromium
 */

import { test, expect } from '@playwright/test';

test.describe('Regex Examples for Playwright', () => {

  // ============================================================
  // 1. MATCHING TEXT WITH REGEX
  // ============================================================
  
  test('match text patterns', async () => {
    console.log('\n📝 TEXT MATCHING WITH REGEX\n');

    const message = 'Order #12345 confirmed successfully!';

    // Match order number pattern
    const hasOrderNumber = /Order #\d+/.test(message);
    console.log(`   Message: "${message}"`);
    console.log(`   Has order number? ${hasOrderNumber}`);

    // Extract the order number
    const match = message.match(/Order #(\d+)/);
    const orderNumber = match ? match[1] : null;
    console.log(`   Extracted order #: ${orderNumber}`);

    // Assertions
    expect(message).toMatch(/Order #\d+/);
    expect(message).toMatch(/success/i); // case-insensitive
  });

  // ============================================================
  // 2. EXTRACTING OTP CODES
  // ============================================================

  test('extract OTP from email/SMS', async () => {
    console.log('\n🔐 EXTRACTING OTP CODES\n');

    const emailBody = 'Your verification code is 847291. Valid for 5 minutes.';
    const smsBody = 'Use code: 123456 to login';

    // Extract 6-digit OTP
    const otpFromEmail = emailBody.match(/\b(\d{6})\b/)?.[1];
    const otpFromSms = smsBody.match(/\b(\d{6})\b/)?.[1];

    console.log(`   Email: "${emailBody}"`);
    console.log(`   Extracted OTP: ${otpFromEmail}`);
    console.log('');
    console.log(`   SMS: "${smsBody}"`);
    console.log(`   Extracted OTP: ${otpFromSms}`);

    expect(otpFromEmail).toMatch(/^\d{6}$/);
    expect(otpFromSms).toMatch(/^\d{6}$/);
  });

  // ============================================================
  // 3. VALIDATING UUIDs
  // ============================================================

  test('validate UUID format', async () => {
    console.log('\n🆔 VALIDATING UUIDs\n');

    const validUUID = '550e8400-e29b-41d4-a716-446655440000';
    const invalidUUID = '12345-invalid-uuid';

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    console.log(`   Valid UUID: ${validUUID}`);
    console.log(`   Is valid? ${uuidRegex.test(validUUID)}`);
    console.log('');
    console.log(`   Invalid: ${invalidUUID}`);
    console.log(`   Is valid? ${uuidRegex.test(invalidUUID)}`);

    expect(validUUID).toMatch(uuidRegex);
    expect(invalidUUID).not.toMatch(uuidRegex);
  });

  // ============================================================
  // 4. VALIDATING DATES
  // ============================================================

  test('validate date formats', async () => {
    console.log('\n📅 VALIDATING DATES\n');

    const isoDate = '2025-12-06';
    const usDate = '12/06/2025';

    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const usDateRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    console.log(`   ISO Date: ${isoDate} → Valid: ${isoDateRegex.test(isoDate)}`);
    console.log(`   US Date:  ${usDate} → Valid: ${usDateRegex.test(usDate)}`);

    expect(isoDate).toMatch(isoDateRegex);
    expect(usDate).toMatch(usDateRegex);
  });

  // ============================================================
  // 5. VALIDATING CURRENCY
  // ============================================================

  test('validate currency format', async () => {
    console.log('\n💰 VALIDATING CURRENCY\n');

    const prices = ['$29.99', '$100.00', '$5', '29.99', '$1,299.99'];
    const currencyRegex = /^\$[\d,]+(\.\d{2})?$/;

    prices.forEach(price => {
      const isValid = currencyRegex.test(price);
      console.log(`   ${price} → ${isValid ? '✅' : '❌'}`);
    });
  });

  // ============================================================
  // 6. EMAIL VALIDATION
  // ============================================================

  test('validate email format', async () => {
    console.log('\n📧 VALIDATING EMAILS\n');

    const emails = ['test@example.com', 'invalid-email', 'user.name@domain.co.uk'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emails.forEach(email => {
      const isValid = emailRegex.test(email);
      console.log(`   ${email} → ${isValid ? '✅' : '❌'}`);
    });
  });

  // ============================================================
  // 7. REPLACING/CLEANING DATA
  // ============================================================

  test('clean and replace data', async () => {
    console.log('\n🧹 CLEANING DATA WITH REGEX\n');

    const dirtyPhone = '(555) 123-4567';
    const cleanPhone = dirtyPhone.replace(/\D/g, ''); // Remove non-digits

    console.log(`   Original: ${dirtyPhone}`);
    console.log(`   Cleaned:  ${cleanPhone}`);

    const text = 'Hello   World   with   extra   spaces';
    const cleanText = text.replace(/\s+/g, ' '); // Single spaces

    console.log(`   Original: "${text}"`);
    console.log(`   Cleaned:  "${cleanText}"`);

    expect(cleanPhone).toBe('5551234567');
    expect(cleanText).toBe('Hello World with extra spaces');
  });
});


/**
 * API Token Authentication Examples
 * 
 * 🎯 Learn how to:
 *    1. Login to get a token
 *    2. Extract the token from the response
 *    3. Use the token in subsequent requests
 * 
 * 📚 API Used: https://dummyjson.com (free, no signup required)
 * 
 * Test Credentials:
 *    username: emilys
 *    password: emilyspass
 */

import { test, expect } from '@playwright/test';

// =============================================================================
// CONFIGURATION
// =============================================================================

const BASE_URL = 'https://dummyjson.com';

const TEST_USER = {
  username: 'emilys',
  password: 'emilyspass'
};

// =============================================================================
// EXAMPLE 1: Login and Extract Token
// =============================================================================

test.describe('Token Authentication Basics', () => {

  test('should login and get access token', async ({ request }) => {
    // Step 1: Send login request
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        username: TEST_USER.username,
        password: TEST_USER.password
      }
    });

    // Step 2: Verify login was successful
    expect(response.status()).toBe(200);

    // Step 3: Extract the token from response
    const data = await response.json();
    
    // Verify we got a token
    expect(data.accessToken).toBeTruthy();
    expect(data.username).toBe('emilys');

    console.log('✅ Login successful!');
    console.log(`   Token: ${data.accessToken.substring(0, 30)}...`);
  });

  test('should fail login with wrong credentials', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        username: 'wronguser',
        password: 'wrongpass'
      }
    });

    // API returns 400 for invalid credentials
    expect(response.status()).toBe(400);
    
    const data = await response.json();
    expect(data.message).toBeTruthy();
    
    console.log('✅ Invalid login correctly rejected');
  });
});

// =============================================================================
// EXAMPLE 2: Extract Token and Use in Another Request
// =============================================================================

test.describe('Using Token in Requests', () => {

  test('should login then access protected endpoint', async ({ request }) => {
    // STEP 1: Login to get token
    console.log('1️⃣  Logging in...');
    const loginResponse = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        username: TEST_USER.username,
        password: TEST_USER.password
      }
    });
    
    expect(loginResponse.status()).toBe(200);
    const loginData = await loginResponse.json();
    
    // Extract the token
    const token = loginData.accessToken;
    console.log(`   ✅ Got token: ${token.substring(0, 20)}...`);

    // STEP 2: Use token to access protected endpoint
    console.log('2️⃣  Accessing protected endpoint...');
    const meResponse = await request.get(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    expect(meResponse.status()).toBe(200);
    
    const userData = await meResponse.json();
    expect(userData.username).toBe('emilys');
    expect(userData.email).toBeTruthy();
    
    console.log(`   ✅ Got user data: ${userData.firstName} ${userData.lastName}`);
  });

  test('should fail without token', async ({ request }) => {
    // Try to access protected endpoint WITHOUT token
    const response = await request.get(`${BASE_URL}/auth/me`);

    // Should fail with 401 Unauthorized
    expect(response.status()).toBe(401);
    
    const data = await response.json();
    expect(data.message.toLowerCase()).toContain('token');

    console.log('✅ Request without token correctly rejected');
  });

  test('should fail with invalid token', async ({ request }) => {
    // Try with a fake/invalid token
    const response = await request.get(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': 'Bearer invalid-token-12345'
      }
    });

    expect(response.status()).toBe(401);
    
    console.log('✅ Invalid token correctly rejected');
  });
});


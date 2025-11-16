import { test, expect } from '@playwright/test';

/**
 * Day 4 - API Testing: GET Requests
 * 
 * This file demonstrates:
 * - Making GET requests with Playwright
 * - Validating status codes
 * - Parsing JSON responses
 * - Validating response structure
 * - Handling errors (404)
 * - Query parameters
 * 
 * API: restful-api.dev
 * Documentation: https://restful-api.dev
 */

const BASE_URL = 'https://api.restful-api.dev';

test.describe('GET Requests - restful-api.dev', () => {
  
  /**
   * Test 1: Get All Objects
   * Demonstrates basic GET request and array validation
   */
  test('should get all objects', async ({ request }) => {
    // Make GET request
    const response = await request.get(`${BASE_URL}/objects`);
    
    // Validate status code
    expect(response.status()).toBe(200);
    expect(response.ok()).toBe(true);
    
    // Parse JSON response
    const data = await response.json();
    
    // Validate response is an array
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    
    console.log(`✅ Found ${data.length} objects`);
  });
  
  /**
   * Test 2: Get Single Object by ID
   * Demonstrates getting specific resource
   */
  test('should get single object by ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/objects/1`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    // Validate object properties
    expect(data.id).toBe("1");
    expect(data.name).toBeTruthy();
    expect(data).toHaveProperty('data');
    
    console.log(`✅ Object: ${data.name}`);
  });
  
  /**
   * Test 3: Validate Object Structure
   * Demonstrates response structure validation
   */
  test('should validate object structure', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/objects/1`);
    const data = await response.json();
    
    // Validate all required properties exist
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('data');
    
    // Validate types
    expect(typeof data.id).toBe('string');
    expect(typeof data.name).toBe('string');
    expect(typeof data.data).toBe('object');
    
    console.log('✅ Object structure is valid');
  });
  
  /**
   * Test 4: Get Multiple Objects by IDs
   * Demonstrates query parameters
   */
  test('should get multiple objects by IDs', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/objects`, {
      params: {
        id: [1, 2, 3]
      }
    });
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBe(3);
    
    // Validate each object has an ID
    data.forEach((obj: any) => {
      expect(obj).toHaveProperty('id');
      expect(obj).toHaveProperty('name');
    });
    
    console.log(`✅ Retrieved ${data.length} objects`);
  });
  
  /**
   * Test 5: Handle 404 Error
   * Demonstrates error handling
   */
  test('should return 404 for non-existent object', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/objects/99999`);
    
    // Validate error status
    expect(response.status()).toBe(404);
    expect(response.ok()).toBe(false);
    
    console.log('✅ 404 error handled correctly');
  });
  
  /**
   * Test 6: Validate Response Headers
   * Demonstrates header validation
   */
  test('should have correct response headers', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/objects`);
    
    expect(response.status()).toBe(200);
    
    // Validate content type
    const headers = response.headers();
    expect(headers['content-type']).toContain('application/json');
    
    console.log('✅ Response headers are correct');
  });
  
  /**
   * Test 7: Validate Response Data Types
   * Demonstrates data type validation
   */
  test('should have correct data types in response', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/objects/1`);
    const data = await response.json();
    
    // Validate data types
    expect(typeof data.id).toBe('string');
    expect(typeof data.name).toBe('string');
    
    // Validate nested data object
    if (data.data) {
      expect(typeof data.data).toBe('object');
    }
    
    console.log('✅ Data types are correct');
  });
  
  /**
   * Test 8: Validate Array Elements
   * Demonstrates array element validation
   */
  test('should validate all array elements have required fields', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/objects`);
    const data = await response.json();
    
    // Validate each element
    data.forEach((obj: any, index: number) => {
      expect(obj).toHaveProperty('id');
      expect(obj).toHaveProperty('name');
      expect(obj.id).toBeTruthy();
      expect(obj.name).toBeTruthy();
    });
    
    console.log(`✅ All ${data.length} objects have required fields`);
  });
});


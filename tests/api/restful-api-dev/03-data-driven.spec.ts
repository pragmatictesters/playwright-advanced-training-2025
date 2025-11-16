import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

/**
 * Day 4 - API Testing: Data-Driven Tests
 * 
 * This file demonstrates:
 * - Reading test data from CSV files
 * - Creating multiple objects from data
 * - Data-driven test patterns
 * - Bulk cleanup with afterAll
 * 
 * API: restful-api.dev
 * Documentation: https://restful-api.dev
 */

const BASE_URL = 'https://api.restful-api.dev';

// Read CSV file
const csvPath = path.join(process.cwd(), 'test-data/api/devices.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const devices = parse(csvContent, { columns: true, skip_empty_lines: true });

test.describe('Data-Driven API Tests', () => {
  const createdIds: string[] = [];
  
  /**
   * Cleanup: Delete all created objects after all tests
   */
  test.afterAll(async ({ request }) => {
    console.log(`\n🧹 Cleaning up ${createdIds.length} objects...`);
    
    for (const id of createdIds) {
      await request.delete(`${BASE_URL}/objects/${id}`);
    }
    
    console.log(`✅ Cleaned up ${createdIds.length} objects`);
  });
  
  /**
   * Data-Driven Tests: Create devices from CSV
   * One test per device in the CSV file
   */
  for (const device of devices) {
    test(`should create ${device.name}`, async ({ request }) => {
      const response = await request.post(`${BASE_URL}/objects`, {
        data: {
          name: device.name,
          data: {
            color: device.color,
            price: parseFloat(device.price),
            capacity: device.capacity
          }
        }
      });
      
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      
      // Track ID for cleanup
      createdIds.push(data.id);
      
      // Validate created object
      expect(data.id).toBeTruthy();
      expect(data.name).toBe(device.name);
      expect(data.data.color).toBe(device.color);
      expect(data.data.price).toBe(parseFloat(device.price));
      expect(data.data.capacity).toBe(device.capacity);
      expect(data.createdAt).toBeTruthy();
      
      console.log(`✅ Created: ${device.name} (ID: ${data.id})`);
    });
  }
  
  /**
   * Test: Verify all created devices
   * Runs after all devices are created
   */
  test('should verify all created devices exist', async ({ request }) => {
    console.log(`\n🔍 Verifying ${createdIds.length} created devices...`);
    
    for (const id of createdIds) {
      const response = await request.get(`${BASE_URL}/objects/${id}`);
      expect(response.status()).toBe(200);
      
      const data = await response.json();
      expect(data.id).toBe(id);
      
      console.log(`✅ Verified: ${data.name}`);
    }
    
    console.log(`✅ All ${createdIds.length} devices verified`);
  });
  
  /**
   * Test: Bulk validation
   * Validates all devices have correct structure
   */
  test('should validate all devices have correct structure', async ({ request }) => {
    console.log(`\n📋 Validating structure of ${createdIds.length} devices...`);

    for (const id of createdIds) {
      const response = await request.get(`${BASE_URL}/objects/${id}`);
      const data = await response.json();

      // Validate structure
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('name');
      expect(data).toHaveProperty('data');

      // Validate nested data
      expect(data.data).toHaveProperty('color');
      expect(data.data).toHaveProperty('price');
      expect(data.data).toHaveProperty('capacity');
    }

    console.log(`✅ All devices have correct structure`);
  });
});

/**
 * Alternative Pattern: Using JSON data
 * Demonstrates using JSON instead of CSV
 *
 * Note: This test demonstrates the pattern but may be commented out
 * to avoid API rate limiting during training sessions.
 */
test.describe.skip('Data-Driven with JSON', () => {
  const testDevices = [
    { name: "iPad Pro", color: "Silver", price: 1099, storage: "128GB" },
    { name: "MacBook Air", color: "Space Gray", price: 1199, storage: "256GB" },
    { name: "Apple Watch", color: "Gold", price: 399, storage: "32GB" }
  ];

  const createdIds: string[] = [];

  test.afterAll(async ({ request }) => {
    for (const id of createdIds) {
      await request.delete(`${BASE_URL}/objects/${id}`);
    }
    console.log(`🧹 Cleaned up ${createdIds.length} JSON-based devices`);
  });

  for (const device of testDevices) {
    test(`should create ${device.name} from JSON data`, async ({ request }) => {
      const response = await request.post(`${BASE_URL}/objects`, {
        data: {
          name: device.name,
          data: {
            color: device.color,
            price: device.price,
            storage: device.storage
          }
        }
      });

      expect(response.status()).toBe(200);

      const data = await response.json();
      createdIds.push(data.id);

      expect(data.name).toBe(device.name);
      expect(data.data.price).toBe(device.price);

      console.log(`✅ Created from JSON: ${device.name}`);
    });
  }
});


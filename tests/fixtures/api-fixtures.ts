import { test as base, expect, APIRequestContext } from '@playwright/test';

/**
 * API Fixtures for restful-api.dev
 * 
 * This file provides reusable fixtures for API testing:
 * - apiClient: Pre-configured API client
 * - testDevice: Auto-created device with cleanup
 * - multipleDevices: Multiple test devices with cleanup
 * 
 * Usage:
 * import { test, expect } from './fixtures/api-fixtures';
 * 
 * test('my test', async ({ testDevice }) => {
 *   // testDevice is ready to use, auto-cleanup after test
 * });
 */

const BASE_URL = 'https://api.restful-api.dev';

// Define custom fixture types
type ApiFixtures = {
  apiClient: APIRequestContext;
  testDevice: { id: string; name: string; data: any };
  multipleDevices: Array<{ id: string; name: string; data: any }>;
};

/**
 * Extend Playwright's base test with custom API fixtures
 */
export const test = base.extend<ApiFixtures>({
  
  /**
   * Fixture: apiClient
   * Provides the request context (same as request fixture, but with a custom name)
   */
  apiClient: async ({ request }, use) => {
    console.log('  🔧 Setup: API Client');

    // Provide request context to test
    await use(request);

    console.log('  🧹 Teardown: API Client');
  },
  
  /**
   * Fixture: testDevice
   * Creates a test device before test, deletes after test
   */
  testDevice: async ({ request }, use) => {
    console.log('  🔧 Setup: Creating test device...');
    
    // Create test device
    const response = await request.post(`${BASE_URL}/objects`, {
      data: {
        name: "Test Device",
        data: {
          color: "Blue",
          price: 999,
          category: "test"
        }
      }
    });
    
    expect(response.status()).toBe(200);
    const device = await response.json();
    console.log(`     ✅ Created device: ${device.id}`);
    
    // Provide device to test
    await use(device);
    
    // Cleanup: Delete device
    console.log('  🧹 Teardown: Deleting test device...');
    await request.delete(`${BASE_URL}/objects/${device.id}`);
    console.log(`     ✅ Deleted device: ${device.id}`);
  },
  
  /**
   * Fixture: multipleDevices
   * Creates multiple test devices, deletes all after test
   */
  multipleDevices: async ({ request }, use) => {
    console.log('  🔧 Setup: Creating multiple test devices...');
    
    const devices = [];
    const deviceData = [
      { name: "Test Phone", data: { type: "phone", price: 699 } },
      { name: "Test Tablet", data: { type: "tablet", price: 899 } },
      { name: "Test Laptop", data: { type: "laptop", price: 1299 } }
    ];
    
    // Create all devices
    for (const data of deviceData) {
      const response = await request.post(`${BASE_URL}/objects`, { data });
      expect(response.status()).toBe(200);
      const device = await response.json();
      devices.push(device);
      console.log(`     ✅ Created: ${device.name} (${device.id})`);
    }
    
    // Provide devices to test
    await use(devices);
    
    // Cleanup: Delete all devices
    console.log('  🧹 Teardown: Deleting multiple test devices...');
    for (const device of devices) {
      await request.delete(`${BASE_URL}/objects/${device.id}`);
      console.log(`     ✅ Deleted: ${device.name} (${device.id})`);
    }
  },
});

// Re-export expect
export { expect };


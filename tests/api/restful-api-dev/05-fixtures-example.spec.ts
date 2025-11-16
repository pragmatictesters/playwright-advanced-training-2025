import { test, expect } from '../../fixtures/api-fixtures';
import { ApiHelpers } from '../../../utils/api-helpers';

/**
 * Day 4 - API Testing: Using Fixtures and Helpers
 * 
 * This file demonstrates:
 * - Using custom API fixtures
 * - Using API helper utilities
 * - Reusable patterns for API testing
 * - Clean, maintainable test code
 * 
 * API: restful-api.dev
 * Documentation: https://restful-api.dev
 */

test.describe('API Fixtures Examples', () => {
  
  /**
   * Test 1: Using testDevice Fixture
   * Device is automatically created and cleaned up
   */
  test('should use testDevice fixture', async ({ testDevice }) => {
    console.log('\n🎯 Using testDevice fixture\n');
    
    // Device is already created by fixture!
    expect(testDevice.id).toBeTruthy();
    expect(testDevice.name).toBe("Test Device");
    expect(testDevice.data.color).toBe("Blue");
    
    console.log(`✅ Test device ready: ${testDevice.id}`);
    console.log(`   Name: ${testDevice.name}`);
    console.log(`   Color: ${testDevice.data.color}`);
    console.log(`   Price: ${testDevice.data.price}`);
    
    // Device will be automatically deleted after test!
  });
  
  /**
   * Test 2: Using multipleDevices Fixture
   * Multiple devices are automatically created and cleaned up
   */
  test('should use multipleDevices fixture', async ({ multipleDevices }) => {
    console.log('\n🎯 Using multipleDevices fixture\n');
    
    // Multiple devices are already created!
    expect(multipleDevices.length).toBe(3);
    
    multipleDevices.forEach((device, index) => {
      expect(device.id).toBeTruthy();
      expect(device.name).toBeTruthy();
      console.log(`✅ Device ${index + 1}: ${device.name} (${device.id})`);
    });
    
    // All devices will be automatically deleted after test!
  });
  
  /**
   * Test 3: Using apiClient Fixture
   * Pre-configured API client with base URL
   */
  test('should use apiClient fixture', async ({ apiClient }) => {
    console.log('\n🎯 Using apiClient fixture\n');
    
    // apiClient has base URL pre-configured
    const response = await apiClient.get('/objects');
    
    expect(response.status()).toBe(200);
    const data = await response.json();
    
    console.log(`✅ Retrieved ${data.length} objects using apiClient`);
  });
});

test.describe('API Helpers Examples', () => {
  
  /**
   * Test 4: Using ApiHelpers Class
   * Demonstrates helper methods for common operations
   */
  test('should use ApiHelpers for CRUD operations', async ({ request }) => {
    console.log('\n🎯 Using ApiHelpers\n');
    
    const helpers = new ApiHelpers(request);
    
    // CREATE
    console.log('1️⃣  CREATE');
    const device = await helpers.createDevice("Helper Test Device", {
      color: "Purple",
      price: 1599
    });
    
    // READ
    console.log('\n2️⃣  READ');
    const retrieved = await helpers.getDevice(device.id);
    expect(retrieved.name).toBe("Helper Test Device");
    console.log(`   ✅ Retrieved: ${retrieved.name}`);
    
    // UPDATE
    console.log('\n3️⃣  UPDATE');
    const updated = await helpers.updateDevice(device.id, "Updated Helper Device", {
      color: "Gold",
      price: 1799
    });
    expect(updated.data.color).toBe("Gold");
    
    // VALIDATE SCHEMA
    console.log('\n4️⃣  VALIDATE');
    helpers.validateDeviceSchema(updated);
    
    // DELETE
    console.log('\n5️⃣  DELETE');
    await helpers.deleteDevice(device.id);
    
    // VERIFY DELETION
    const exists = await helpers.deviceExists(device.id);
    expect(exists).toBe(false);
    console.log('   ✅ Verified deletion');
  });
  
  /**
   * Test 5: Bulk Operations with Helpers
   * Demonstrates creating and deleting multiple devices
   */
  test('should use helpers for bulk operations', async ({ request }) => {
    console.log('\n🎯 Bulk Operations with Helpers\n');
    
    const helpers = new ApiHelpers(request);
    
    // Create multiple devices
    const devicesToCreate = [
      { name: "Bulk Device 1", data: { type: "phone", price: 699 } },
      { name: "Bulk Device 2", data: { type: "tablet", price: 899 } },
      { name: "Bulk Device 3", data: { type: "laptop", price: 1299 } }
    ];
    
    console.log('📦 Creating multiple devices...');
    const created = await helpers.createMultipleDevices(devicesToCreate);
    expect(created.length).toBe(3);
    
    // Validate all devices
    console.log('\n✅ Validating all devices...');
    for (const device of created) {
      helpers.validateDeviceSchema(device);
    }
    
    // Delete all devices
    console.log('\n🧹 Deleting all devices...');
    const ids = created.map(d => d.id);
    await helpers.deleteMultipleDevices(ids);
  });
  
  /**
   * Test 6: Combining Fixtures and Helpers
   * Demonstrates using both together
   */
  test('should combine fixtures and helpers', async ({ testDevice, request }) => {
    console.log('\n🎯 Combining Fixtures and Helpers\n');
    
    const helpers = new ApiHelpers(request);
    
    // testDevice is provided by fixture
    console.log(`✅ Fixture provided device: ${testDevice.id}`);
    
    // Use helpers to validate it
    helpers.validateDeviceSchema(testDevice);
    
    // Use helpers to update it
    const updated = await helpers.updateDevice(
      testDevice.id,
      "Updated via Helper",
      { color: "Silver", price: 1099 }
    );
    
    expect(updated.name).toBe("Updated via Helper");
    console.log('✅ Updated device using helper');
    
    // Fixture will handle cleanup automatically!
  });
});

/**
 * Advanced Patterns
 *
 * Note: These tests are skipped to avoid API rate limiting
 * Uncomment to run during training sessions
 */
test.describe.skip('Advanced Patterns', () => {

  /**
   * Test 7: Conditional Device Creation
   * Only create device if needed
   */
  test('should conditionally create device', async ({ request }) => {
    console.log('\n🎯 Conditional Device Creation\n');

    const helpers = new ApiHelpers(request);

    // Check if device exists first
    const testId = "test-123";
    const exists = await helpers.deviceExists(testId);

    if (!exists) {
      console.log('Device does not exist, creating...');
      const device = await helpers.createDevice("Conditional Device", {
        id: testId,
        price: 999
      });

      // Cleanup
      await helpers.deleteDevice(device.id);
    } else {
      console.log('Device already exists, skipping creation');
    }
  });

  /**
   * Test 8: Error Handling with Helpers
   * Demonstrates graceful error handling
   */
  test('should handle errors gracefully', async ({ request }) => {
    console.log('\n🎯 Error Handling\n');

    const helpers = new ApiHelpers(request);

    // Try to get non-existent device
    const exists = await helpers.deviceExists('99999');
    expect(exists).toBe(false);
    console.log('✅ Correctly identified non-existent device');

    // Create and verify
    const device = await helpers.createDevice("Error Test", { price: 799 });
    const verified = await helpers.deviceExists(device.id);
    expect(verified).toBe(true);
    console.log('✅ Correctly verified existing device');

    // Cleanup
    await helpers.deleteDevice(device.id);
  });
});


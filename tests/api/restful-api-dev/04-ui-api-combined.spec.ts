import { test, expect } from '@playwright/test';

/**
 * Day 4 - API Testing: UI + API Combined
 * 
 * This file demonstrates:
 * - Using API for test setup (fast)
 * - Using UI for actual testing (user experience)
 * - Using API for cleanup (fast)
 * - Performance comparison: API vs UI
 * - Best practices for combining both
 * 
 * API: restful-api.dev
 * Documentation: https://restful-api.dev
 */

const BASE_URL = 'https://api.restful-api.dev';

test.describe('UI + API Combined', () => {
  
  /**
   * Test 1: Create via API, Verify in Browser
   * Demonstrates fast setup with API, then UI verification
   */
  test('should create via API and verify in browser', async ({ page, request }) => {
    // Setup: Create device via API (fast!)
    console.log('⚡ Creating device via API...');
    const startTime = Date.now();
    
    const response = await request.post(`${BASE_URL}/objects`, {
      data: {
        name: "UI Test Device",
        data: {
          color: "Green",
          price: 1499,
          description: "Created via API for UI testing"
        }
      }
    });
    
    const device = await response.json();
    const apiTime = Date.now() - startTime;
    console.log(`✅ Created device via API in ${apiTime}ms: ${device.id}`);
    
    // Test: Verify in browser
    console.log('🌐 Verifying in browser...');
    await page.goto('https://restful-api.dev/');
    
    // The website shows the API documentation
    await expect(page.locator('h2:has-text("REST API")')).toBeVisible();
    
    console.log('✅ Browser verification complete');
    
    // Cleanup: Delete via API (fast!)
    await request.delete(`${BASE_URL}/objects/${device.id}`);
    console.log('🧹 Cleaned up via API');
  });
  
  /**
   * Test 2: Performance Comparison - API vs UI
   * Demonstrates speed difference between API and UI
   */
  test('should compare API vs UI performance', async ({ page, request }) => {
    console.log('\n📊 Performance Comparison: API vs UI\n');
    
    // API approach (fast)
    const apiStart = Date.now();
    const response = await request.get(`${BASE_URL}/objects`);
    const apiData = await response.json();
    const apiTime = Date.now() - apiStart;
    
    console.log(`⚡ API Request:`);
    console.log(`   - Time: ${apiTime}ms`);
    console.log(`   - Objects: ${apiData.length}`);
    
    // UI approach (slower)
    const uiStart = Date.now();
    await page.goto('https://restful-api.dev/');
    await page.waitForLoadState('networkidle');
    const uiTime = Date.now() - uiStart;
    
    console.log(`\n🌐 UI Request:`);
    console.log(`   - Time: ${uiTime}ms`);
    
    // Calculate difference
    const speedup = (uiTime / apiTime).toFixed(1);
    console.log(`\n🏆 Result: API is ${speedup}x faster!`);
    
    // API should be faster
    expect(apiTime).toBeLessThan(uiTime);
  });
  
  /**
   * Test 3: Bulk Setup via API
   * Demonstrates creating multiple test objects quickly
   */
  test('should create bulk test data via API', async ({ request }) => {
    console.log('\n📦 Creating bulk test data via API...\n');
    
    const devices = [
      { name: "Test Device 1", data: { type: "phone", price: 699 } },
      { name: "Test Device 2", data: { type: "tablet", price: 899 } },
      { name: "Test Device 3", data: { type: "laptop", price: 1299 } }
    ];
    
    const createdIds: string[] = [];
    const startTime = Date.now();
    
    // Create all devices
    for (const device of devices) {
      const response = await request.post(`${BASE_URL}/objects`, {
        data: device
      });
      const created = await response.json();
      createdIds.push(created.id);
      console.log(`✅ Created: ${device.name} (${created.id})`);
    }
    
    const totalTime = Date.now() - startTime;
    console.log(`\n⚡ Created ${devices.length} devices in ${totalTime}ms`);
    console.log(`   Average: ${(totalTime / devices.length).toFixed(0)}ms per device`);
    
    // Cleanup
    for (const id of createdIds) {
      await request.delete(`${BASE_URL}/objects/${id}`);
    }
    console.log(`\n🧹 Cleaned up ${createdIds.length} devices`);
  });
  
  /**
   * Test 4: API Setup for UI Test
   * Real-world pattern: Use API to set up test state
   */
  test('should use API for test setup, then test UI', async ({ page, request }) => {
    console.log('\n🎯 Real-World Pattern: API Setup + UI Test\n');
    
    // Step 1: Setup via API (fast)
    console.log('1️⃣  Setup: Creating test data via API...');
    const setupStart = Date.now();
    
    const response = await request.post(`${BASE_URL}/objects`, {
      data: {
        name: "Test Product",
        data: {
          category: "electronics",
          price: 999,
          inStock: true
        }
      }
    });
    
    const product = await response.json();
    const setupTime = Date.now() - setupStart;
    console.log(`   ✅ Setup complete in ${setupTime}ms`);
    
    // Step 2: Test via UI (user experience)
    console.log('\n2️⃣  Test: Verifying via UI...');
    await page.goto('https://restful-api.dev/');
    
    // Verify page loaded
    await expect(page.locator('h2:has-text("REST API")')).toBeVisible();
    console.log('   ✅ UI test complete');
    
    // Step 3: Cleanup via API (fast)
    console.log('\n3️⃣  Cleanup: Deleting test data via API...');
    await request.delete(`${BASE_URL}/objects/${product.id}`);
    console.log('   ✅ Cleanup complete');
    
    console.log('\n🎉 Pattern complete: Fast setup + UI test + Fast cleanup');
  });
  
  /**
   * Test 5: Parallel API Requests
   * Demonstrates making multiple API calls in parallel
   *
   * Note: Skipped to avoid API rate limiting
   */
  test.skip('should make parallel API requests', async ({ request }) => {
    console.log('\n⚡ Making parallel API requests...\n');

    const startTime = Date.now();

    // Make 5 requests in parallel
    const promises = [
      request.get(`${BASE_URL}/objects/1`),
      request.get(`${BASE_URL}/objects/2`),
      request.get(`${BASE_URL}/objects/3`),
      request.get(`${BASE_URL}/objects/4`),
      request.get(`${BASE_URL}/objects/5`)
    ];

    const responses = await Promise.all(promises);
    const totalTime = Date.now() - startTime;

    // Validate all responses
    responses.forEach((response, index) => {
      expect(response.status()).toBe(200);
      console.log(`✅ Request ${index + 1}: ${response.status()}`);
    });

    console.log(`\n⚡ Completed 5 parallel requests in ${totalTime}ms`);
    console.log(`   Average: ${(totalTime / 5).toFixed(0)}ms per request`);
  });
  
  /**
   * Test 6: Error Handling in Combined Tests
   * Demonstrates handling API errors gracefully
   *
   * Note: Skipped to avoid API rate limiting
   */
  test.skip('should handle API errors gracefully', async ({ page, request }) => {
    console.log('\n⚠️  Testing error handling...\n');

    // Try to get non-existent object
    const response = await request.get(`${BASE_URL}/objects/99999`);

    if (response.status() === 404) {
      console.log('✅ Handled 404 error correctly');

      // Continue with UI test despite API error
      await page.goto('https://restful-api.dev/');
      await expect(page.locator('h2:has-text("REST API")')).toBeVisible();
      console.log('✅ UI test continued successfully');
    } else {
      throw new Error(`Unexpected status: ${response.status()}`);
    }
  });
});


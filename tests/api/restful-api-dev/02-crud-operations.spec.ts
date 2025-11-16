import { test, expect } from '@playwright/test';

/**
 * Day 4 - API Testing: CRUD Operations
 * 
 * This file demonstrates:
 * - POST requests (Create)
 * - PUT requests (Update)
 * - PATCH requests (Partial Update)
 * - DELETE requests (Delete)
 * - Complete CRUD flow
 * - Data cleanup
 * 
 * API: restful-api.dev
 * Documentation: https://restful-api.dev
 */

const BASE_URL = 'https://api.restful-api.dev';

test.describe('CRUD Operations - restful-api.dev', () => {
  
  /**
   * Test 1: Create New Object (POST)
   * Demonstrates POST request to create resource
   */
  test('should create new object (POST)', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/objects`, {
      data: {
        name: "Apple MacBook Pro 16",
        data: {
          year: 2019,
          price: 1849.99,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB"
        }
      }
    });
    
    // Validate creation
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    
    // Validate response includes ID and timestamp
    expect(data.id).toBeTruthy();
    expect(data.name).toBe("Apple MacBook Pro 16");
    expect(data.data.price).toBe(1849.99);
    expect(data.data.year).toBe(2019);
    expect(data.createdAt).toBeTruthy();
    
    console.log(`✅ Created object with ID: ${data.id}`);
    
    // Cleanup
    await request.delete(`${BASE_URL}/objects/${data.id}`);
  });
  
  /**
   * Test 2: Update Object (PUT)
   * Demonstrates PUT request to replace entire resource
   */
  test('should update object (PUT)', async ({ request }) => {
    // First, create an object
    const createResponse = await request.post(`${BASE_URL}/objects`, {
      data: {
        name: "Test Device",
        data: { color: "Blue", price: 999 }
      }
    });
    const created = await createResponse.json();
    
    // Now update it completely
    const updateResponse = await request.put(`${BASE_URL}/objects/${created.id}`, {
      data: {
        name: "Updated Device",
        data: { color: "Red", price: 1299, capacity: "256GB" }
      }
    });
    
    expect(updateResponse.status()).toBe(200);
    
    const updated = await updateResponse.json();
    expect(updated.name).toBe("Updated Device");
    expect(updated.data.color).toBe("Red");
    expect(updated.data.price).toBe(1299);
    expect(updated.updatedAt).toBeTruthy();
    
    console.log(`✅ Updated object: ${updated.name}`);
    
    // Cleanup
    await request.delete(`${BASE_URL}/objects/${created.id}`);
  });
  
  /**
   * Test 3: Partially Update Object (PATCH)
   * Demonstrates PATCH request to update specific fields
   */
  test('should partially update object (PATCH)', async ({ request }) => {
    // Create object
    const createResponse = await request.post(`${BASE_URL}/objects`, {
      data: {
        name: "Original Name",
        data: { color: "Blue", price: 999 }
      }
    });
    const created = await createResponse.json();
    
    // Partially update (only name)
    const patchResponse = await request.patch(`${BASE_URL}/objects/${created.id}`, {
      data: {
        name: "Patched Name"
      }
    });
    
    expect(patchResponse.status()).toBe(200);
    
    const patched = await patchResponse.json();
    expect(patched.name).toBe("Patched Name");
    expect(patched.updatedAt).toBeTruthy();
    
    console.log(`✅ Patched object: ${patched.name}`);
    
    // Cleanup
    await request.delete(`${BASE_URL}/objects/${created.id}`);
  });
  
  /**
   * Test 4: Delete Object (DELETE)
   * Demonstrates DELETE request and verification
   */
  test('should delete object (DELETE)', async ({ request }) => {
    // Create object first
    const createResponse = await request.post(`${BASE_URL}/objects`, {
      data: {
        name: "To Be Deleted",
        data: { temp: true }
      }
    });
    const created = await createResponse.json();
    
    console.log(`✅ Created object to delete: ${created.id}`);
    
    // Delete it
    const deleteResponse = await request.delete(`${BASE_URL}/objects/${created.id}`);
    expect(deleteResponse.status()).toBe(200);
    
    console.log(`✅ Deleted object: ${created.id}`);
    
    // Verify deletion - should return 404
    const getResponse = await request.get(`${BASE_URL}/objects/${created.id}`);
    expect(getResponse.status()).toBe(404);
    
    console.log('✅ Verified object no longer exists');
  });
  
  /**
   * Test 5: Complete CRUD Flow
   * Demonstrates full lifecycle: Create → Read → Update → Delete
   */
  test('should perform complete CRUD flow', async ({ request }) => {
    // CREATE
    console.log('1️⃣  CREATE');
    const createResponse = await request.post(`${BASE_URL}/objects`, {
      data: {
        name: "CRUD Test Device",
        data: { version: 1, status: "new" }
      }
    });
    expect(createResponse.status()).toBe(200);
    const created = await createResponse.json();
    console.log(`   ✅ Created: ${created.id}`);
    
    // READ
    console.log('2️⃣  READ');
    const readResponse = await request.get(`${BASE_URL}/objects/${created.id}`);
    expect(readResponse.status()).toBe(200);
    const read = await readResponse.json();
    expect(read.name).toBe("CRUD Test Device");
    console.log(`   ✅ Read: ${read.name}`);
    
    // UPDATE
    console.log('3️⃣  UPDATE');
    const updateResponse = await request.put(`${BASE_URL}/objects/${created.id}`, {
      data: {
        name: "CRUD Test Device - Updated",
        data: { version: 2, status: "updated" }
      }
    });
    expect(updateResponse.status()).toBe(200);
    const updated = await updateResponse.json();
    expect(updated.data.version).toBe(2);
    console.log(`   ✅ Updated: version ${updated.data.version}`);
    
    // DELETE
    console.log('4️⃣  DELETE');
    const deleteResponse = await request.delete(`${BASE_URL}/objects/${created.id}`);
    expect(deleteResponse.status()).toBe(200);
    console.log(`   ✅ Deleted: ${created.id}`);
    
    // VERIFY DELETION
    const verifyResponse = await request.get(`${BASE_URL}/objects/${created.id}`);
    expect(verifyResponse.status()).toBe(404);
    console.log('   ✅ Verified deletion');
  });
});


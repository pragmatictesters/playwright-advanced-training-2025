# Day 4 - Exercise 4: API Testing with Playwright

![Difficulty: Beginner](https://img.shields.io/badge/Difficulty-Beginner-green)
![Time: 2-3 hours](https://img.shields.io/badge/Time-2--3%20hours-blue)

## 🎯 Learning Objectives

By completing this exercise, you will:
- ✅ Understand REST API basics
- ✅ Make API requests with Playwright (GET, POST, PUT, DELETE)
- ✅ Validate API responses and status codes
- ✅ Create data-driven API tests
- ✅ Combine UI + API testing
- ✅ Apply best practices

---

## 📋 Prerequisites

- ✅ Completed Day 3 exercises
- ✅ Basic understanding of JSON
- ✅ Playwright installed and configured

---

## 🌐 API Under Test

**API:** restful-api.dev  
**Base URL:** https://api.restful-api.dev  
**Documentation:** https://restful-api.dev

**Why this API?**
- Free, no authentication required
- Real database (data persists)
- All HTTP methods supported
- Perfect for learning

---

## 📁 Project Structure

You will create:

```
your-project/
├── tests/
│   └── api/
│       └── restful-api-dev/
│           ├── 01-get-requests.spec.ts
│           ├── 02-crud-operations.spec.ts
│           ├── 03-data-driven.spec.ts
│           └── 04-ui-api-combined.spec.ts
├── test-data/
│   └── api/
│       └── devices.csv
├── utils/
│   └── api-helpers.ts
└── package.json
```

---

## 🚀 Part 1: GET Requests (30 min)

### **Step 1: Explore the API**

Open your browser and visit:
```
https://api.restful-api.dev/objects
```

**What do you see?**
- Array of objects (devices)
- Each object has: `id`, `name`, `data`
- JSON format

**Try this too:**
```
https://api.restful-api.dev/objects/1
```

---

### **Step 2: Create Your First API Test**

Create file: `tests/api/restful-api-dev/01-get-requests.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev';

test.describe('GET Requests - restful-api.dev', () => {
  
  test('should get all objects', async ({ request }) => {
    // Make GET request
    const response = await request.get(`${BASE_URL}/objects`);
    
    // Validate status code
    expect(response.status()).toBe(200);
    
    // Parse JSON response
    const data = await response.json();
    
    // Validate response
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
    
    console.log(`✅ Found ${data.length} objects`);
  });
  
  test('should get single object by ID', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/objects/1`);
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.id).toBe("1");
    expect(data.name).toBeTruthy();
    
    console.log(`✅ Object: ${data.name}`);
  });
  
  test('should return 404 for non-existent object', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/objects/99999`);
    
    expect(response.status()).toBe(404);
    expect(response.ok()).toBe(false);
    
    console.log('✅ 404 error handled correctly');
  });
});
```

---

### **Step 3: Run Your Tests**

```bash
npx playwright test tests/api/restful-api-dev/01-get-requests.spec.ts
```

**Expected Output:**
```
✓ should get all objects
✓ should get single object by ID
✓ should return 404 for non-existent object

3 passed
```

---

### **Step 4: Add More GET Tests**

Add these tests to the same file:

```typescript
test('should validate object structure', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/objects/1`);
  const data = await response.json();
  
  // Validate structure
  expect(data).toHaveProperty('id');
  expect(data).toHaveProperty('name');
  expect(data).toHaveProperty('data');
  
  console.log('✅ Object structure is valid');
});

test('should get multiple objects by IDs', async ({ request }) => {
  const response = await request.get(`${BASE_URL}/objects`, {
    params: {
      id: [1, 2, 3]
    }
  });
  
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.length).toBe(3);
  
  console.log(`✅ Retrieved ${data.length} objects`);
});
```

---

## ✏️ Part 2: POST/PUT/DELETE (45 min)

### **Step 5: Create CRUD Operations Test**

Create file: `tests/api/restful-api-dev/02-crud-operations.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev';

test.describe('CRUD Operations', () => {
  let createdObjectId: string;
  
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
    
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    createdObjectId = data.id; // Save for later tests
    
    expect(data.id).toBeTruthy();
    expect(data.name).toBe("Apple MacBook Pro 16");
    expect(data.data.price).toBe(1849.99);
    expect(data.createdAt).toBeTruthy();
    
    console.log(`✅ Created object with ID: ${createdObjectId}`);
  });
  
  test('should update object (PUT)', async ({ request }) => {
    // First create an object
    const createResponse = await request.post(`${BASE_URL}/objects`, {
      data: {
        name: "Test Device",
        data: { color: "Blue", price: 999 }
      }
    });
    const created = await createResponse.json();
    
    // Now update it
    const updateResponse = await request.put(`${BASE_URL}/objects/${created.id}`, {
      data: {
        name: "Updated Device",
        data: { color: "Red", price: 1299 }
      }
    });
    
    expect(updateResponse.status()).toBe(200);
    
    const updated = await updateResponse.json();
    expect(updated.name).toBe("Updated Device");
    expect(updated.data.color).toBe("Red");
    expect(updated.updatedAt).toBeTruthy();
    
    console.log(`✅ Updated object: ${updated.name}`);
    
    // Cleanup
    await request.delete(`${BASE_URL}/objects/${created.id}`);
  });
  
  test('should delete object (DELETE)', async ({ request }) => {
    // Create object first
    const createResponse = await request.post(`${BASE_URL}/objects`, {
      data: {
        name: "To Be Deleted",
        data: { temp: true }
      }
    });
    const created = await createResponse.json();
    
    // Delete it
    const deleteResponse = await request.delete(`${BASE_URL}/objects/${created.id}`);
    expect(deleteResponse.status()).toBe(200);
    
    // Verify deletion
    const getResponse = await request.get(`${BASE_URL}/objects/${created.id}`);
    expect(getResponse.status()).toBe(404);
    
    console.log('✅ Object deleted successfully');
  });
});
```

Run the tests:
```bash
npx playwright test tests/api/restful-api-dev/02-crud-operations.spec.ts
```

---

## 📊 Part 3: Data-Driven Tests (30 min)

### **Step 6: Create Test Data File**

Create file: `test-data/api/devices.csv`

```csv
name,color,price,capacity
iPhone 14 Pro,Deep Purple,999,128GB
Samsung Galaxy S23,Phantom Black,899,256GB
Google Pixel 7,Snow,699,128GB
OnePlus 11,Titan Black,799,256GB
```

---

### **Step 7: Create Data-Driven Test**

Create file: `tests/api/restful-api-dev/03-data-driven.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

const BASE_URL = 'https://api.restful-api.dev';

// Read CSV file
const csvPath = path.join(process.cwd(), 'test-data/api/devices.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const devices = parse(csvContent, { columns: true, skip_empty_lines: true });

test.describe('Data-Driven API Tests', () => {
  const createdIds: string[] = [];
  
  // Cleanup after all tests
  test.afterAll(async ({ request }) => {
    for (const id of createdIds) {
      await request.delete(`${BASE_URL}/objects/${id}`);
    }
    console.log(`🧹 Cleaned up ${createdIds.length} objects`);
  });
  
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
      createdIds.push(data.id);
      
      expect(data.name).toBe(device.name);
      expect(data.data.color).toBe(device.color);
      
      console.log(`✅ Created: ${device.name}`);
    });
  }
});
```

Run the tests:
```bash
npx playwright test tests/api/restful-api-dev/03-data-driven.spec.ts
```

---

## 🔄 Part 4: UI + API Combined (45 min)

### **Step 8: Combine UI and API Testing**

This demonstrates using API for setup/cleanup and UI for actual testing.

Create file: `tests/api/restful-api-dev/04-ui-api-combined.spec.ts`

```typescript
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.restful-api.dev';

test.describe('UI + API Combined', () => {
  
  test('should create via API and verify in browser', async ({ page, request }) => {
    // Setup: Create device via API (fast!)
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
    console.log(`✅ Created device via API: ${device.id}`);
    
    // Test: Verify in browser
    await page.goto('https://restful-api.dev/');
    
    // The website should show our device
    // (Note: This is a demo - actual verification depends on the UI)
    
    // Cleanup: Delete via API (fast!)
    await request.delete(`${BASE_URL}/objects/${device.id}`);
    console.log('🧹 Cleaned up via API');
  });
  
  test('should measure API vs UI speed', async ({ page, request }) => {
    // API approach (fast)
    const apiStart = Date.now();
    const response = await request.get(`${BASE_URL}/objects`);
    const apiData = await response.json();
    const apiTime = Date.now() - apiStart;
    
    // UI approach (slower)
    const uiStart = Date.now();
    await page.goto('https://restful-api.dev/');
    const uiTime = Date.now() - uiStart;
    
    console.log(`⚡ API time: ${apiTime}ms`);
    console.log(`🐌 UI time: ${uiTime}ms`);
    console.log(`📊 API is ${(uiTime / apiTime).toFixed(1)}x faster!`);
    
    expect(apiTime).toBeLessThan(uiTime);
  });
});
```

---

## ✅ Verification Checklist

After completing all parts, verify:

- [ ] GET requests work and validate responses
- [ ] POST creates objects successfully
- [ ] PUT updates objects correctly
- [ ] DELETE removes objects
- [ ] Data-driven tests create multiple objects
- [ ] UI + API combination works
- [ ] All tests clean up data
- [ ] All tests pass

---

## 🎓 Key Takeaways

✅ **API testing is fast** - 10-20x faster than UI testing  
✅ **Use `request` fixture** - Built into Playwright  
✅ **Always check status codes** - Before parsing response  
✅ **Clean up test data** - Use afterEach or afterAll  
✅ **Combine UI + API** - API for setup, UI for testing  
✅ **Data-driven tests** - Test multiple scenarios easily  

---

## 🚀 Bonus Challenges

1. **Add error handling** - Test 400, 404, 500 errors
2. **Create API fixtures** - Reusable setup/cleanup
3. **Add response time validation** - Ensure API is fast
4. **Bulk operations** - Create/delete 10 objects at once
5. **Schema validation** - Validate response structure

---

## 🆘 Troubleshooting

**Issue:** Tests fail with network errors  
**Solution:** Check internet connection, API might be down

**Issue:** Objects not deleted  
**Solution:** Check afterAll/afterEach hooks are running

**Issue:** CSV file not found  
**Solution:** Verify path is correct: `test-data/api/devices.csv`

---

**Congratulations!** You've completed Day 4! 🎉

Next: Review [Best Practices](../../api-testing/03-best-practices.md)


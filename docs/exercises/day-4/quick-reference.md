# Day 4 - Quick Reference

Quick templates and examples for API testing with Playwright.

---

## 🚀 Quick Start Commands

```bash
# Run all API tests
npm run test:api

# Run specific test file
npx playwright test tests/api/restful-api-dev/01-get-requests.spec.ts

# Run with UI mode
npx playwright test tests/api --ui

# Run with debug
npx playwright test tests/api --debug
```

---

## 📖 Basic Templates

### **GET Request**

```typescript
test('should get data', async ({ request }) => {
  const response = await request.get('https://api.restful-api.dev/objects');
  
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(Array.isArray(data)).toBe(true);
});
```

---

### **POST Request**

```typescript
test('should create object', async ({ request }) => {
  const response = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: "Test Device",
      data: { color: "Blue", price: 999 }
    }
  });
  
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.id).toBeTruthy();
});
```

---

### **PUT Request**

```typescript
test('should update object', async ({ request }) => {
  const response = await request.put('https://api.restful-api.dev/objects/1', {
    data: {
      name: "Updated Name",
      data: { color: "Red", price: 1299 }
    }
  });
  
  expect(response.status()).toBe(200);
});
```

---

### **DELETE Request**

```typescript
test('should delete object', async ({ request }) => {
  const response = await request.delete('https://api.restful-api.dev/objects/1');
  
  expect(response.status()).toBe(200);
});
```

---

## ✅ Common Assertions

### **Status Code**

```typescript
expect(response.status()).toBe(200);
expect(response.ok()).toBe(true); // true for 2xx
```

---

### **Response Structure**

```typescript
const data = await response.json();

expect(data).toHaveProperty('id');
expect(data).toHaveProperty('name');
expect(data.name).toBe("Expected Name");
```

---

### **Array Response**

```typescript
const data = await response.json();

expect(Array.isArray(data)).toBe(true);
expect(data.length).toBeGreaterThan(0);
expect(data[0]).toHaveProperty('id');
```

---

## 🧹 Cleanup Patterns

### **Pattern 1: Inline Cleanup**

```typescript
test('test with cleanup', async ({ request }) => {
  // Create
  const response = await request.post('/objects', { data: testData });
  const created = await response.json();
  
  // Test
  // ... your test logic ...
  
  // Cleanup
  await request.delete(`/objects/${created.id}`);
});
```

---

### **Pattern 2: afterEach Hook**

```typescript
let createdIds: string[] = [];

test.afterEach(async ({ request }) => {
  for (const id of createdIds) {
    await request.delete(`/objects/${id}`);
  }
  createdIds = [];
});

test('test 1', async ({ request }) => {
  const response = await request.post('/objects', { data: testData });
  const created = await response.json();
  createdIds.push(created.id);
});
```

---

### **Pattern 3: afterAll Hook**

```typescript
const createdIds: string[] = [];

test.afterAll(async ({ request }) => {
  for (const id of createdIds) {
    await request.delete(`/objects/${id}`);
  }
});
```

---

## 📊 Data-Driven Template

```typescript
import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';

const csvPath = path.join(process.cwd(), 'test-data/api/devices.csv');
const csvContent = fs.readFileSync(csvPath, 'utf-8');
const devices = parse(csvContent, { columns: true, skip_empty_lines: true });

test.describe('Data-Driven Tests', () => {
  for (const device of devices) {
    test(`should test ${device.name}`, async ({ request }) => {
      // Your test logic
    });
  }
});
```

---

## 🔄 UI + API Template

```typescript
test('UI + API combined', async ({ page, request }) => {
  // Setup via API (fast)
  const response = await request.post('/objects', { data: testData });
  const created = await response.json();
  
  // Test via UI
  await page.goto('/some-page');
  // ... UI testing ...
  
  // Cleanup via API (fast)
  await request.delete(`/objects/${created.id}`);
});
```

---

## 🎯 Complete CRUD Example

```typescript
test.describe('Complete CRUD Flow', () => {
  let objectId: string;
  
  test('CREATE', async ({ request }) => {
    const response = await request.post('/objects', {
      data: { name: "Test", data: { value: 123 } }
    });
    const data = await response.json();
    objectId = data.id;
    expect(response.status()).toBe(200);
  });
  
  test('READ', async ({ request }) => {
    const response = await request.get(`/objects/${objectId}`);
    expect(response.status()).toBe(200);
  });
  
  test('UPDATE', async ({ request }) => {
    const response = await request.put(`/objects/${objectId}`, {
      data: { name: "Updated", data: { value: 456 } }
    });
    expect(response.status()).toBe(200);
  });
  
  test('DELETE', async ({ request }) => {
    const response = await request.delete(`/objects/${objectId}`);
    expect(response.status()).toBe(200);
  });
});
```

---

## ⚠️ Common Mistakes

### **Mistake 1: Missing await**

❌ Wrong:
```typescript
const response = request.get('/objects'); // Missing await!
```

✅ Correct:
```typescript
const response = await request.get('/objects');
```

---

### **Mistake 2: Not checking status**

❌ Wrong:
```typescript
const data = await response.json(); // Might fail!
```

✅ Correct:
```typescript
expect(response.status()).toBe(200);
const data = await response.json();
```

---

### **Mistake 3: No cleanup**

❌ Wrong:
```typescript
await request.post('/objects', { data: testData });
// Object left in database!
```

✅ Correct:
```typescript
const response = await request.post('/objects', { data: testData });
const created = await response.json();
// ... test ...
await request.delete(`/objects/${created.id}`);
```

---

## 🆘 Troubleshooting

### **Network Errors**
```typescript
// Add timeout
const response = await request.get('/objects', { timeout: 10000 });
```

### **Debug Response**
```typescript
console.log('Status:', response.status());
console.log('Headers:', response.headers());
console.log('Body:', await response.text());
```

### **Validate Before Parsing**
```typescript
if (response.ok()) {
  const data = await response.json();
} else {
  console.error('Request failed:', response.status());
}
```

---

## 📚 Useful Links

- [Playwright API Testing](https://playwright.dev/docs/api-testing)
- [HTTP Status Codes](https://httpstatuses.com/)
- [JSON Format](https://www.json.org/)
- [restful-api.dev](https://restful-api.dev/)

---

**Pro Tip:** API tests are fast! Run them often during development. ⚡


# Playwright API Testing

Learn how to use Playwright for API testing with practical examples.

---

## 🎯 The `request` Fixture

Playwright provides a built-in `request` fixture for API testing:

```typescript
import { test, expect } from '@playwright/test';

test('my first API test', async ({ request }) => {
  // Use 'request' to make API calls
  const response = await request.get('https://api.restful-api.dev/objects');
  
  // Validate response
  expect(response.status()).toBe(200);
});
```

**No setup needed!** Just use `{ request }` in your test.

---

## 📖 GET Requests

### **Basic GET Request**

```typescript
test('should get all objects', async ({ request }) => {
  // Make GET request
  const response = await request.get('https://api.restful-api.dev/objects');
  
  // Check status code
  expect(response.status()).toBe(200);
  
  // Parse JSON response
  const data = await response.json();
  
  // Validate data
  expect(Array.isArray(data)).toBe(true);
  expect(data.length).toBeGreaterThan(0);
});
```

### **GET Single Object**

```typescript
test('should get object by ID', async ({ request }) => {
  const response = await request.get('https://api.restful-api.dev/objects/1');
  
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  expect(data.id).toBe("1");
  expect(data.name).toBeTruthy();
});
```

### **GET with Query Parameters**

```typescript
test('should get objects by IDs', async ({ request }) => {
  const response = await request.get('https://api.restful-api.dev/objects', {
    params: {
      id: [1, 2, 3]
    }
  });
  
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data.length).toBe(3);
});
```

---

## ✏️ POST Requests (Create)

### **Create New Object**

```typescript
test('should create new object', async ({ request }) => {
  // Make POST request
  const response = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: "Apple MacBook Pro 16",
      data: {
        year: 2019,
        price: 1849.99,
        "CPU model": "Intel Core i9"
      }
    }
  });
  
  // Verify creation
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  expect(data.id).toBeTruthy(); // ID is auto-generated
  expect(data.name).toBe("Apple MacBook Pro 16");
  expect(data.data.price).toBe(1849.99);
  expect(data.createdAt).toBeTruthy(); // Timestamp added
});
```

**Key Points:**
- Use `data` property for request body
- Response includes `id` and `createdAt`
- Data persists in real database

---

## 🔄 PUT Requests (Update)

### **Update Entire Object**

```typescript
test('should update object', async ({ request }) => {
  // First, create an object
  const createResponse = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: "Test Device",
      data: { color: "Blue", price: 999 }
    }
  });
  const created = await createResponse.json();
  
  // Now update it
  const updateResponse = await request.put(`https://api.restful-api.dev/objects/${created.id}`, {
    data: {
      name: "Updated Device",
      data: { color: "Red", price: 1299 }
    }
  });
  
  expect(updateResponse.status()).toBe(200);
  
  const updated = await updateResponse.json();
  expect(updated.name).toBe("Updated Device");
  expect(updated.data.color).toBe("Red");
  expect(updated.updatedAt).toBeTruthy(); // Timestamp updated
});
```

---

## 🔧 PATCH Requests (Partial Update)

### **Update Part of Object**

```typescript
test('should partially update object', async ({ request }) => {
  const response = await request.patch('https://api.restful-api.dev/objects/1', {
    data: {
      name: "Updated Name Only"
    }
  });
  
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  expect(data.name).toBe("Updated Name Only");
  // Other fields remain unchanged
});
```

---

## 🗑️ DELETE Requests

### **Delete Object**

```typescript
test('should delete object', async ({ request }) => {
  // Create object first
  const createResponse = await request.post('https://api.restful-api.dev/objects', {
    data: {
      name: "To Be Deleted",
      data: { temp: true }
    }
  });
  const created = await createResponse.json();
  
  // Delete it
  const deleteResponse = await request.delete(`https://api.restful-api.dev/objects/${created.id}`);
  
  expect(deleteResponse.status()).toBe(200);
  
  // Verify deletion
  const getResponse = await request.get(`https://api.restful-api.dev/objects/${created.id}`);
  expect(getResponse.status()).toBe(404); // Not found
});
```

---

## ✅ Response Validation

### **Status Code**

```typescript
expect(response.status()).toBe(200);
expect(response.ok()).toBe(true); // true for 2xx status codes
```

### **Headers**

```typescript
const contentType = response.headers()['content-type'];
expect(contentType).toContain('application/json');
```

### **JSON Response**

```typescript
const data = await response.json();
expect(data).toHaveProperty('id');
expect(data).toHaveProperty('name');
expect(data.name).toBe("Expected Name");
```

### **Response Body (Text)**

```typescript
const text = await response.text();
expect(text).toContain('success');
```

---

## 🎓 Common Patterns

### **Pattern 1: Create → Verify → Delete**

```typescript
test('complete CRUD flow', async ({ request }) => {
  // CREATE
  const createRes = await request.post('https://api.restful-api.dev/objects', {
    data: { name: "Test", data: { value: 123 } }
  });
  const created = await createRes.json();
  
  // READ (verify)
  const getRes = await request.get(`https://api.restful-api.dev/objects/${created.id}`);
  expect(getRes.status()).toBe(200);
  
  // UPDATE
  const updateRes = await request.put(`https://api.restful-api.dev/objects/${created.id}`, {
    data: { name: "Updated", data: { value: 456 } }
  });
  expect(updateRes.status()).toBe(200);
  
  // DELETE
  const deleteRes = await request.delete(`https://api.restful-api.dev/objects/${created.id}`);
  expect(deleteRes.status()).toBe(200);
});
```

### **Pattern 2: Error Handling**

```typescript
test('should handle 404 error', async ({ request }) => {
  const response = await request.get('https://api.restful-api.dev/objects/99999');
  
  expect(response.status()).toBe(404);
  expect(response.ok()).toBe(false);
});
```

---

## 🎓 Key Takeaways

✅ Use `{ request }` fixture for API testing  
✅ `request.get()` for GET requests  
✅ `request.post()` for POST requests  
✅ `request.put()` for PUT requests  
✅ `request.delete()` for DELETE requests  
✅ Always check `response.status()`  
✅ Use `await response.json()` to parse data  

---

## 🚀 Next Steps

- [Best Practices](./03-best-practices.md)
- [Day 4 Exercise](../exercises/day-4/exercise-4-api-testing.md)

---

**Pro Tip:** API tests are fast! You can run hundreds in seconds. ⚡


# API Testing Best Practices

Learn professional patterns and avoid common mistakes.

---

## ✅ Best Practices

### **1. Always Check Status Codes**

❌ **Bad:**
```typescript
const response = await request.get('/objects');
const data = await response.json(); // Might fail if status is 404!
```

✅ **Good:**
```typescript
const response = await request.get('/objects');
expect(response.status()).toBe(200); // Check first!
const data = await response.json();
```

---

### **2. Clean Up Test Data**

❌ **Bad:**
```typescript
test('create object', async ({ request }) => {
  await request.post('/objects', { data: testData });
  // Object left in database! 💥
});
```

✅ **Good:**
```typescript
test('create object', async ({ request }) => {
  const response = await request.post('/objects', { data: testData });
  const created = await response.json();
  
  // ... test logic ...
  
  // Cleanup
  await request.delete(`/objects/${created.id}`);
});
```

✅ **Better (using afterEach):**
```typescript
let createdIds: string[] = [];

test.afterEach(async ({ request }) => {
  // Clean up all created objects
  for (const id of createdIds) {
    await request.delete(`/objects/${id}`);
  }
  createdIds = [];
});

test('create object', async ({ request }) => {
  const response = await request.post('/objects', { data: testData });
  const created = await response.json();
  createdIds.push(created.id); // Track for cleanup
});
```

---

### **3. Validate Response Structure**

❌ **Bad:**
```typescript
const data = await response.json();
// Assume structure is correct
```

✅ **Good:**
```typescript
const data = await response.json();

// Validate structure
expect(data).toHaveProperty('id');
expect(data).toHaveProperty('name');
expect(data).toHaveProperty('data');

// Validate types
expect(typeof data.id).toBe('string');
expect(typeof data.name).toBe('string');
```

---

### **4. Use Descriptive Test Names**

❌ **Bad:**
```typescript
test('test 1', async ({ request }) => { ... });
test('api test', async ({ request }) => { ... });
```

✅ **Good:**
```typescript
test('should get all objects successfully', async ({ request }) => { ... });
test('should return 404 for non-existent object', async ({ request }) => { ... });
test('should create object with valid data', async ({ request }) => { ... });
```

---

### **5. Test Both Success and Error Cases**

✅ **Success Case:**
```typescript
test('should create object with valid data', async ({ request }) => {
  const response = await request.post('/objects', {
    data: { name: "Valid", data: { price: 100 } }
  });
  expect(response.status()).toBe(200);
});
```

✅ **Error Case:**
```typescript
test('should return 404 for non-existent object', async ({ request }) => {
  const response = await request.get('/objects/99999');
  expect(response.status()).toBe(404);
});
```

---

### **6. Use Fixtures for Reusable Setup**

❌ **Bad (Repetitive):**
```typescript
test('test 1', async ({ request }) => {
  const res = await request.post('/objects', { data: testData });
  const obj = await res.json();
  // ... test ...
  await request.delete(`/objects/${obj.id}`);
});

test('test 2', async ({ request }) => {
  const res = await request.post('/objects', { data: testData });
  const obj = await res.json();
  // ... test ...
  await request.delete(`/objects/${obj.id}`);
});
```

✅ **Good (Using Fixture):**
```typescript
const test = base.extend({
  testObject: async ({ request }, use) => {
    // Setup
    const res = await request.post('/objects', { data: testData });
    const obj = await res.json();
    
    await use(obj);
    
    // Cleanup
    await request.delete(`/objects/${obj.id}`);
  }
});

test('test 1', async ({ testObject }) => {
  // Object ready to use, auto-cleanup!
});

test('test 2', async ({ testObject }) => {
  // Object ready to use, auto-cleanup!
});
```

---

### **7. Combine UI + API for Speed**

❌ **Slow (All UI):**
```typescript
test('test dashboard', async ({ page }) => {
  // UI login (slow)
  await page.goto('/login');
  await page.fill('#username', 'user');
  await page.fill('#password', 'pass');
  await page.click('button[type="submit"]');
  
  // Test dashboard
  await page.goto('/dashboard');
});
```

✅ **Fast (API + UI):**
```typescript
test('test dashboard', async ({ page, request }) => {
  // API login (fast)
  const response = await request.post('/api/login', {
    data: { username: 'user', password: 'pass' }
  });
  const { token } = await response.json();
  
  // Set auth cookie
  await page.context().addCookies([{
    name: 'auth_token',
    value: token,
    domain: 'example.com',
    path: '/'
  }]);
  
  // Test dashboard (already logged in)
  await page.goto('/dashboard');
});
```

---

## ⚠️ Common Mistakes

### **Mistake 1: Not Handling Async/Await**

❌ **Wrong:**
```typescript
const response = request.get('/objects'); // Missing await!
expect(response.status()).toBe(200); // Error!
```

✅ **Correct:**
```typescript
const response = await request.get('/objects');
expect(response.status()).toBe(200);
```

---

### **Mistake 2: Hardcoding URLs**

❌ **Bad:**
```typescript
await request.get('https://api.restful-api.dev/objects');
await request.get('https://api.restful-api.dev/objects/1');
```

✅ **Good:**
```typescript
const BASE_URL = 'https://api.restful-api.dev';

await request.get(`${BASE_URL}/objects`);
await request.get(`${BASE_URL}/objects/1`);
```

✅ **Better (Config):**
```typescript
// playwright.config.ts
use: {
  baseURL: 'https://api.restful-api.dev',
}

// Test
await request.get('/objects'); // Uses baseURL
```

---

### **Mistake 3: Not Validating Response Data**

❌ **Bad:**
```typescript
const data = await response.json();
// Assume data is correct
```

✅ **Good:**
```typescript
const data = await response.json();
expect(data.name).toBe("Expected Name");
expect(data.data.price).toBe(999);
```

---

## 💡 Pro Tips

### **Tip 1: Use beforeEach for Common Setup**

```typescript
test.describe('Object Tests', () => {
  let baseURL: string;
  
  test.beforeEach(() => {
    baseURL = 'https://api.restful-api.dev';
  });
  
  test('test 1', async ({ request }) => {
    await request.get(`${baseURL}/objects`);
  });
});
```

---

### **Tip 2: Extract Response Validation**

```typescript
function validateObjectStructure(obj: any) {
  expect(obj).toHaveProperty('id');
  expect(obj).toHaveProperty('name');
  expect(obj).toHaveProperty('data');
}

test('should have valid structure', async ({ request }) => {
  const response = await request.get('/objects/1');
  const data = await response.json();
  validateObjectStructure(data); // Reusable!
});
```

---

### **Tip 3: Log Responses for Debugging**

```typescript
test('debug test', async ({ request }) => {
  const response = await request.get('/objects/1');
  
  console.log('Status:', response.status());
  console.log('Headers:', response.headers());
  console.log('Body:', await response.text());
});
```

---

## 🎓 Summary

✅ **Always check status codes first**  
✅ **Clean up test data**  
✅ **Validate response structure**  
✅ **Use descriptive test names**  
✅ **Test success AND error cases**  
✅ **Use fixtures for reusable code**  
✅ **Combine UI + API for speed**  
✅ **Handle async/await properly**  
✅ **Don't hardcode URLs**  
✅ **Validate response data**  

---

**Remember:** Good API tests are fast, reliable, and maintainable! 🚀


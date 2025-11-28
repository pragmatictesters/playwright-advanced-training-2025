# API Token Authentication Examples

Learn how to handle Bearer token authentication in Playwright API tests.

---

## 🎯 What You'll Learn

1. **Login** to get an access token
2. **Extract** the token from the response
3. **Use** the token in subsequent requests

---

## 🌐 API Used

**DummyJSON** - Free fake API for testing  
Base URL: `https://dummyjson.com`  
Docs: https://dummyjson.com/docs/auth

### Test Credentials
```
Username: emilys
Password: emilyspass
```

---

## 📖 Quick Examples

### 1. Login and Get Token

```typescript
const response = await request.post('https://dummyjson.com/auth/login', {
  data: {
    username: 'emilys',
    password: 'emilyspass'
  }
});

const { accessToken } = await response.json();
// accessToken = "eyJhbGciOiJIUzI1NiIs..."
```

### 2. Use Token in Next Request

```typescript
const meResponse = await request.get('https://dummyjson.com/auth/me', {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
});

const userData = await meResponse.json();
// { username: "emilys", email: "...", firstName: "Emily", ... }
```

---

## 🚀 Run the Tests

```bash
# Run all token auth tests
npx playwright test examples/api-auth/token-auth.spec.ts

# Run with visible output
npx playwright test examples/api-auth/token-auth.spec.ts --reporter=list
```

---

## 📝 Key Points

| Concept | Example |
|---------|---------|
| Set header | `headers: { 'Authorization': 'Bearer TOKEN' }` |
| Extract from JSON | `const { accessToken } = await response.json()` |
| Template literal | `` `Bearer ${token}` `` |

---

## ⚠️ Common Mistakes

❌ **Forgetting "Bearer " prefix:**
```typescript
// WRONG
headers: { 'Authorization': token }

// CORRECT
headers: { 'Authorization': `Bearer ${token}` }
```

❌ **Using token before extracting:**
```typescript
// WRONG - token is undefined!
const response = await request.post('/login', {...});
const token = response.accessToken;  // ❌ Wrong!

// CORRECT - await json() first
const response = await request.post('/login', {...});
const data = await response.json();  // ✅ Parse first
const token = data.accessToken;      // ✅ Then extract
```

---

## 🔗 Related

- [Basic Auth Examples](../basic-auth/README.md)
- [API Testing Docs](../../docs/api-testing/)

---

**Tip:** In real projects, store tokens in environment variables for CI/CD! 🔐


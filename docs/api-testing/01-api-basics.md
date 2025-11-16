# API Testing Basics

Learn the fundamentals of API testing in a beginner-friendly way.

---

## 🤔 What is an API?

**API** = **A**pplication **P**rogramming **I**nterface

### **Simple Analogy: Restaurant**

Imagine you're at a restaurant:

1. **You (Client)** - Want to order food
2. **Waiter (API)** - Takes your order to the kitchen
3. **Kitchen (Server)** - Prepares the food
4. **Waiter (API)** - Brings food back to you

**The API is the waiter** - it takes requests and brings back responses!

---

## 🌐 What is a REST API?

**REST** = **RE**presentational **S**tate **T**ransfer

A REST API uses HTTP methods to interact with data:

| HTTP Method | Action | Restaurant Analogy |
|-------------|--------|-------------------|
| **GET** | Read/Retrieve | "Show me the menu" |
| **POST** | Create | "Add this to my order" |
| **PUT** | Update (replace) | "Change my entire order" |
| **PATCH** | Update (partial) | "Add extra cheese" |
| **DELETE** | Delete | "Cancel this item" |

---

## 📨 Request & Response

### **Request (What you send)**

```
Method: GET
URL: https://api.restful-api.dev/objects/1
Headers: Content-Type: application/json
Body: (optional data)
```

### **Response (What you get back)**

```
Status Code: 200 OK
Headers: Content-Type: application/json
Body: {
  "id": "1",
  "name": "Google Pixel 6 Pro",
  "data": {
    "color": "Cloudy White",
    "capacity": "128 GB"
  }
}
```

---

## 🎯 HTTP Status Codes

### **Success (2xx)**
- **200 OK** - Request succeeded ✅
- **201 Created** - New resource created ✅

### **Client Errors (4xx)**
- **400 Bad Request** - Invalid data sent ❌
- **404 Not Found** - Resource doesn't exist ❌

### **Server Errors (5xx)**
- **500 Internal Server Error** - Server problem ❌

**Remember:** 
- **2xx = Success** 🎉
- **4xx = Your mistake** 🤦
- **5xx = Server's mistake** 🔥

---

## 📊 JSON Format

APIs typically use **JSON** (JavaScript Object Notation) for data:

```json
{
  "id": "1",
  "name": "iPhone 14",
  "data": {
    "color": "Blue",
    "price": 999,
    "inStock": true
  }
}
```

**JSON Rules:**
- Keys in double quotes: `"name"`
- Strings in double quotes: `"iPhone 14"`
- Numbers without quotes: `999`
- Booleans: `true` or `false`
- Arrays: `["item1", "item2"]`
- Objects: `{ "key": "value" }`

---

## 🧪 What is API Testing?

**API Testing** = Testing the communication between systems

### **What We Test:**

✅ **Functionality** - Does it work correctly?  
✅ **Status Codes** - Returns correct codes?  
✅ **Response Data** - Data is correct and complete?  
✅ **Response Time** - Fast enough?  
✅ **Error Handling** - Handles errors gracefully?  

---

## 💡 Why Test APIs?

### **1. Faster Than UI Testing**

```
UI Test:     [Browser] → [UI] → [API] → [Database]
             ⏱️ 10 seconds

API Test:    [API] → [Database]
             ⏱️ 0.5 seconds
```

**API tests are 20x faster!** ⚡

### **2. More Reliable**

- ❌ UI tests: Flaky (elements change, timing issues)
- ✅ API tests: Stable (direct backend testing)

### **3. Better Coverage**

Easy to test:
- Edge cases
- Error scenarios
- Large datasets
- Negative testing

### **4. Earlier Bug Detection**

```
Development → API Testing → UI Testing → Production
              ↑
         Catch bugs here!
```

---

## 🎯 When to Use API Testing?

### **Use API Testing For:**

✅ Backend logic validation  
✅ Data validation  
✅ Integration testing  
✅ Performance testing  
✅ Test data setup  

### **Use UI Testing For:**

✅ User experience  
✅ Visual validation  
✅ User workflows  
✅ Cross-browser testing  

### **Best Practice: Combine Both!**

```typescript
// Setup via API (fast)
await request.post('/api/users', { data: testUser });

// Test via UI (user experience)
await page.goto('/login');
await page.fill('#username', testUser.username);
await page.click('button[type="submit"]');

// Cleanup via API (fast)
await request.delete(`/api/users/${testUser.id}`);
```

---

## 🌐 Example: restful-api.dev

Let's explore a real API!

### **Base URL**
```
https://api.restful-api.dev
```

### **Get All Objects**
```
GET https://api.restful-api.dev/objects
```

**Try it in your browser!** Just paste the URL above.

### **Get Single Object**
```
GET https://api.restful-api.dev/objects/1
```

### **Create New Object**
```
POST https://api.restful-api.dev/objects
Body: {
  "name": "Apple MacBook Pro 16",
  "data": {
    "year": 2019,
    "price": 1849.99
  }
}
```

---

## 🎓 Key Takeaways

✅ **API** = Interface for systems to communicate  
✅ **REST API** = Uses HTTP methods (GET, POST, PUT, DELETE)  
✅ **Request** = What you send (method, URL, data)  
✅ **Response** = What you get back (status, data)  
✅ **JSON** = Data format for APIs  
✅ **API Testing** = Faster, more reliable than UI testing  

---

## 🚀 Next Steps

Ready to write your first API test? Continue to:
- [Playwright API Testing](./02-playwright-api.md)

---

**Remember:** API testing is like testing the engine of a car - you don't need to see the dashboard to know if it works! 🚗⚡


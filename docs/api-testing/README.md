# API Testing with Playwright

Welcome to Day 4 of the Playwright Advanced Training! This section covers API testing fundamentals and how to use Playwright for API automation.

---

## 📚 Documentation Structure

### **1. Fundamentals**
- [API Testing Basics](./01-api-basics.md) - What is API testing and why it matters
- [Playwright API Testing](./02-playwright-api.md) - Using Playwright's request fixture
- [Best Practices](./03-best-practices.md) - Tips, patterns, and common pitfalls

### **2. Exercises**
- [Day 4 Exercise](../exercises/day-4/exercise-4-api-testing.md) - Hands-on API testing exercise
- [Quick Reference](../exercises/day-4/quick-reference.md) - Templates and examples

---

## 🎯 What You'll Learn

By the end of Day 4, you will:

✅ Understand REST API fundamentals  
✅ Make API requests with Playwright (GET, POST, PUT, DELETE)  
✅ Validate API responses and status codes  
✅ Create data-driven API tests  
✅ Combine UI + API testing for faster tests  
✅ Apply API testing best practices  

---

## 🌐 API Under Test

**API:** restful-api.dev  
**Base URL:** https://api.restful-api.dev  
**Documentation:** https://restful-api.dev

**Why this API?**
- ✅ Free, no authentication required
- ✅ Real database (data persists)
- ✅ All HTTP methods supported
- ✅ Perfect for learning
- ✅ Always available (24/7)

---

## 🚀 Quick Start

### **1. View Available Endpoints**
Visit: https://restful-api.dev

### **2. Run Example Tests**
```bash
# Run all API tests
npm run test:api

# Run specific test file
npm run test:api:get
npm run test:api:crud
```

### **3. Explore Test Files**
```
tests/api/restful-api-dev/
├── 01-get-requests.spec.ts       # GET operations
├── 02-crud-operations.spec.ts    # POST, PUT, DELETE
├── 03-data-driven.spec.ts        # Data-driven tests
└── 04-ui-api-combined.spec.ts    # UI + API combined
```

---

## 📖 Learning Path

```
Step 1: API Basics
   ↓
Step 2: GET Requests
   ↓
Step 3: POST/PUT/DELETE
   ↓
Step 4: Data-Driven Tests
   ↓
Step 5: UI + API Combined
```

**Estimated Time:** 2-3 hours

---

## 🎓 Key Concepts

### **REST API**
- **RE**presentational **S**tate **T**ransfer
- Uses HTTP methods (GET, POST, PUT, DELETE)
- Returns data in JSON format
- Stateless communication

### **HTTP Methods**
- **GET** - Retrieve data (like reading a book)
- **POST** - Create new data (like adding to cart)
- **PUT** - Update entire resource (like replacing a file)
- **PATCH** - Update part of resource (like editing one field)
- **DELETE** - Remove data (like deleting a file)

### **Status Codes**
- **200** - OK (success)
- **201** - Created (new resource created)
- **400** - Bad Request (invalid data)
- **404** - Not Found (resource doesn't exist)
- **500** - Server Error (something went wrong)

---

## 💡 Why API Testing?

### **Faster**
- ⚡ No browser needed
- ⚡ No UI rendering
- ⚡ Tests run in milliseconds

### **More Reliable**
- ✅ No flaky UI elements
- ✅ Direct backend testing
- ✅ Consistent results

### **Better Coverage**
- 🎯 Test edge cases easily
- 🎯 Test error scenarios
- 🎯 Test data validation

### **Cost-Effective**
- 💰 Faster feedback
- 💰 Catch bugs earlier
- 💰 Less maintenance

---

## 🔗 Related Resources

- [Playwright API Testing Docs](https://playwright.dev/docs/api-testing)
- [REST API Tutorial](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)

---

## 🆘 Need Help?

- Check the [Quick Reference](../exercises/day-4/quick-reference.md)
- Review [Best Practices](./03-best-practices.md)
- Look at working examples in `tests/api/`

---

**Ready to start?** Begin with [API Testing Basics](./01-api-basics.md)! 🚀


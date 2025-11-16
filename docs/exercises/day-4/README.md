# Day 4: API Testing with Playwright

Welcome to Day 4! Today you'll learn API testing fundamentals and how to use Playwright for API automation.

---

## 🎯 Learning Goals

By the end of Day 4, you will:

✅ Understand REST API fundamentals  
✅ Make API requests with Playwright (GET, POST, PUT, DELETE)  
✅ Validate API responses and status codes  
✅ Create data-driven API tests  
✅ Combine UI + API testing for faster tests  
✅ Apply API testing best practices  

---

## ⏱️ Time Allocation

**Total Time:** ~2.5 hours

| Part | Topic | Time |
|------|-------|------|
| **Part 1** | GET Requests | 30 min |
| **Part 2** | POST/PUT/DELETE | 45 min |
| **Part 3** | Data-Driven Tests | 30 min |
| **Part 4** | UI + API Combined | 45 min |

---

## 📚 Materials

### **Documentation**
- [API Testing Basics](../../api-testing/01-api-basics.md)
- [Playwright API Testing](../../api-testing/02-playwright-api.md)
- [Best Practices](../../api-testing/03-best-practices.md)

### **Exercise**
- [Main Exercise](./exercise-4-api-testing.md) - Step-by-step guide
- [Quick Reference](./quick-reference.md) - Templates and examples

### **Code Examples**
```
tests/api/restful-api-dev/
├── 01-get-requests.spec.ts       # GET operations
├── 02-crud-operations.spec.ts    # POST, PUT, DELETE
├── 03-data-driven.spec.ts        # Data-driven tests
└── 04-ui-api-combined.spec.ts    # UI + API combined
```

---

## 🌐 API Under Test

**API:** restful-api.dev  
**Base URL:** https://api.restful-api.dev  
**Documentation:** https://restful-api.dev

**Features:**
- ✅ Free, no authentication
- ✅ Real database (data persists)
- ✅ All HTTP methods supported
- ✅ Perfect for learning

---

## 🚀 Quick Start

### **1. Explore the API**
Visit: https://restful-api.dev

### **2. Run Example Tests**
```bash
# All API tests
npm run test:api

# Specific tests
npm run test:api:get
npm run test:api:crud
```

### **3. Start the Exercise**
Open: [exercise-4-api-testing.md](./exercise-4-api-testing.md)

---

## 🎓 Key Concepts

### **REST API**
- Uses HTTP methods (GET, POST, PUT, DELETE)
- Returns JSON data
- Stateless communication

### **HTTP Methods**
- **GET** - Retrieve data
- **POST** - Create data
- **PUT** - Update data
- **DELETE** - Remove data

### **Status Codes**
- **200** - Success
- **201** - Created
- **404** - Not Found
- **500** - Server Error

---

## ✅ Success Criteria

By the end of Day 4, you should be able to:

- [ ] Make GET requests and validate responses
- [ ] Create objects with POST requests
- [ ] Update objects with PUT requests
- [ ] Delete objects with DELETE requests
- [ ] Create data-driven API tests
- [ ] Combine UI + API testing
- [ ] Clean up test data properly
- [ ] Handle API errors gracefully

---

## 📖 Learning Path

```
Step 1: Read API Basics
   ↓
Step 2: Learn Playwright API Testing
   ↓
Step 3: Complete Exercise Part 1 (GET)
   ↓
Step 4: Complete Exercise Part 2 (CRUD)
   ↓
Step 5: Complete Exercise Part 3 (Data-Driven)
   ↓
Step 6: Complete Exercise Part 4 (UI + API)
   ↓
Step 7: Review Best Practices
```

---

## 🆘 Need Help?

- Check [Quick Reference](./quick-reference.md)
- Review [Best Practices](../../api-testing/03-best-practices.md)
- Look at working examples in `tests/api/`
- Ask your instructor

---

## 🎉 Bonus Challenges

After completing the main exercise:

1. **Error Handling** - Test 404, 400 error scenarios
2. **Bulk Operations** - Create/delete multiple objects
3. **Performance** - Measure API response times
4. **Fixtures** - Create reusable API fixtures
5. **Validation** - Add schema validation

---

## 🔗 Resources

- [Playwright API Testing Docs](https://playwright.dev/docs/api-testing)
- [REST API Tutorial](https://restfulapi.net/)
- [HTTP Status Codes](https://httpstatuses.com/)
- [JSON Format Guide](https://www.json.org/)

---

**Ready to start?** Open [exercise-4-api-testing.md](./exercise-4-api-testing.md)! 🚀


# API Tests

This directory contains API testing examples using Playwright's `request` fixture.

---

## 📁 Structure

```
tests/api/
└── restful-api-dev/
    ├── 01-get-requests.spec.ts       # GET operations (8 tests)
    ├── 02-crud-operations.spec.ts    # CRUD operations (5 tests)
    ├── 03-data-driven.spec.ts        # Data-driven tests (8 tests)
    ├── 04-ui-api-combined.spec.ts    # UI + API combined (6 tests)
    └── 05-fixtures-example.spec.ts   # Fixtures & helpers (8 tests)
```

**Total:** 35 API tests

---

## 🌐 API Under Test

**API:** restful-api.dev  
**Base URL:** https://api.restful-api.dev  
**Documentation:** https://restful-api.dev

**Features:**
- ✅ Free, no authentication required
- ✅ Real database (data persists)
- ✅ All HTTP methods supported (GET, POST, PUT, PATCH, DELETE)
- ✅ Perfect for learning and testing

---

## 🚀 Running Tests

### **Run All API Tests**
```bash
npm run test:api
```

### **Run Specific Test Files**
```bash
# GET requests
npm run test:api:get

# CRUD operations
npm run test:api:crud

# Data-driven tests
npm run test:api:data-driven

# UI + API combined
npm run test:api:combined

# Fixtures examples
npm run test:api:fixtures
```

### **Run Day 4 Tests**
```bash
# All Day 4 tests
npm run test:day4

# Day 4 tests in Chromium only
npm run test:day4:chromium
```

---

## 📖 Test Files Overview

### **01-get-requests.spec.ts**
Demonstrates GET requests:
- Get all objects
- Get single object by ID
- Validate object structure
- Get multiple objects by IDs
- Handle 404 errors
- Validate response headers
- Validate data types
- Validate array elements

### **02-crud-operations.spec.ts**
Demonstrates CRUD operations:
- Create new object (POST)
- Update object (PUT)
- Partially update object (PATCH)
- Delete object (DELETE)
- Complete CRUD flow

### **03-data-driven.spec.ts**
Demonstrates data-driven testing:
- Read test data from CSV
- Create multiple objects from data
- Verify all created objects
- Validate structure
- Bulk cleanup
- Alternative: JSON data

### **04-ui-api-combined.spec.ts**
Demonstrates combining UI + API:
- Create via API, verify in browser
- Performance comparison (API vs UI)
- Bulk setup via API
- API setup for UI tests
- Parallel API requests
- Error handling

### **05-fixtures-example.spec.ts**
Demonstrates fixtures and helpers:
- Using testDevice fixture
- Using multipleDevices fixture
- Using apiClient fixture
- Using ApiHelpers class
- Bulk operations with helpers
- Combining fixtures and helpers
- Advanced patterns

---

## 🛠️ Fixtures & Utilities

### **Fixtures** (`tests/fixtures/api-fixtures.ts`)
- `apiClient` - Pre-configured API client
- `testDevice` - Auto-created device with cleanup
- `multipleDevices` - Multiple test devices with cleanup

### **Helpers** (`utils/api-helpers.ts`)
- `ApiHelpers` class with CRUD methods
- Response validation
- Schema validation
- Bulk operations
- Device existence checks

---

## 📊 Test Data

### **CSV File** (`test-data/api/devices.csv`)
Contains test device data:
- iPhone 14 Pro
- Samsung Galaxy S23
- Google Pixel 7
- OnePlus 11
- Xiaomi 13 Pro

---

## ✅ Best Practices Demonstrated

✅ **Always check status codes** before parsing response  
✅ **Clean up test data** using afterEach/afterAll  
✅ **Validate response structure** and data types  
✅ **Use descriptive test names** for clarity  
✅ **Test both success and error cases**  
✅ **Use fixtures** for reusable setup/cleanup  
✅ **Combine UI + API** for faster tests  
✅ **Use helpers** for common operations  

---

## 🎓 Learning Path

1. **Start with:** `01-get-requests.spec.ts` - Learn basic GET requests
2. **Then:** `02-crud-operations.spec.ts` - Learn CRUD operations
3. **Next:** `03-data-driven.spec.ts` - Learn data-driven testing
4. **After:** `04-ui-api-combined.spec.ts` - Learn UI + API combination
5. **Finally:** `05-fixtures-example.spec.ts` - Learn fixtures and helpers

---

## 📚 Documentation

- [API Testing Basics](../../docs/api-testing/01-api-basics.md)
- [Playwright API Testing](../../docs/api-testing/02-playwright-api.md)
- [Best Practices](../../docs/api-testing/03-best-practices.md)
- [Day 4 Exercise](../../docs/exercises/day-4/exercise-4-api-testing.md)
- [Quick Reference](../../docs/exercises/day-4/quick-reference.md)

---

## 🆘 Troubleshooting

**Issue:** Tests fail with 405 errors or "reached your limit" message
**Solution:** The API has a limit of 100 requests per day. Wait until tomorrow or run tests selectively using specific npm scripts (e.g., `npm run test:api:get` instead of `npm run test:api`)

**Issue:** Tests fail with network errors
**Solution:** Check internet connection, API might be temporarily down

**Issue:** CSV file not found
**Solution:** Ensure `test-data/api/devices.csv` exists

**Issue:** Objects not deleted
**Solution:** Check afterAll/afterEach hooks are running

**Issue:** Tests are slow
**Solution:** API tests should be fast (<1s each). Check network connection.

**Issue:** Some tests are skipped
**Solution:** Some tests are intentionally skipped (marked with `.skip`) to avoid hitting API rate limits. Remove `.skip` to run them.

---

## 💡 Tips

- API tests are **fast** - run them often during development
- Use **fixtures** to avoid repetitive setup/cleanup code
- **Combine UI + API** - API for setup, UI for testing
- Always **clean up** test data to avoid pollution
- **Validate responses** - don't assume structure is correct

---

**Happy API Testing!** ⚡🚀


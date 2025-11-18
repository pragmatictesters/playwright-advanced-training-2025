# 🎭 Faker.js - Generate Realistic Test Data

![Difficulty: Beginner](https://img.shields.io/badge/Difficulty-Beginner-green)
![Time: 30 minutes](https://img.shields.io/badge/Time-30%20minutes-blue)

## 📚 What is Faker.js?

**Faker.js** is a powerful JavaScript library that generates **realistic fake data** for testing purposes. Instead of using hardcoded test data like "John Doe" or "test@test.com", Faker creates random, realistic data every time your tests run.

### Why Use Faker.js?

✅ **Realistic Data** - Generates data that looks like real user input  
✅ **Unique Every Time** - Reduces test data conflicts  
✅ **Time-Saving** - No need to manually create test data  
✅ **Comprehensive** - Names, emails, addresses, phone numbers, dates, and more  
✅ **Localization** - Supports multiple languages and locales  
✅ **Easy to Use** - Simple, intuitive API

---

## 📦 Installation

```bash
npm install --save-dev @faker-js/faker
```

**Verify Installation:**
```bash
npm list @faker-js/faker
```

---

## 🚀 Basic Usage

### Import Faker

```typescript
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
```

### Generate Simple Data

```typescript
test('generate basic data', async () => {
  // Generate a random first name
  const firstName = faker.person.firstName();
  console.log(firstName); // Example: "Emma"
  
  // Generate a random email
  const email = faker.internet.email();
  console.log(email); // Example: "john.doe@example.com"
  
  // Generate a random phone number
  const phone = faker.phone.number();
  console.log(phone); // Example: "(555) 123-4567"
});
```

---

## 📋 Common Faker Methods

### 1. **Person Data** 👤

```typescript
faker.person.firstName()           // "Emma"
faker.person.lastName()            // "Johnson"
faker.person.fullName()            // "Emma Johnson"
faker.person.middleName()          // "Marie"
faker.person.sex()                 // "female"
faker.person.jobTitle()            // "Software Engineer"
```

### 2. **Internet Data** 🌐

```typescript
faker.internet.email()             // "emma.johnson@example.com"
faker.internet.userName()          // "emma_johnson92"
faker.internet.password()          // "aB3$xY9!mK"
faker.internet.url()               // "https://example.com"
faker.internet.domainName()        // "example.com"
```

### 3. **Phone Numbers** 📱

```typescript
faker.phone.number()               // "(555) 123-4567"
faker.phone.number('###-###-####') // "555-123-4567" (custom format)
```

### 4. **Location Data** 📍

```typescript
faker.location.streetAddress()     // "123 Main Street"
faker.location.city()              // "New York"
faker.location.state()             // "California"
faker.location.zipCode()           // "90210"
faker.location.country()           // "United States"
```

### 5. **Date & Time** 📅

```typescript
faker.date.past()                  // Past date
faker.date.future()                // Future date
faker.date.birthdate()             // Realistic birthdate
faker.date.between({ from: '2020-01-01', to: '2024-12-31' })
```

### 6. **Numbers** 🔢

```typescript
faker.number.int({ min: 1, max: 100 })        // Random integer
faker.number.float({ min: 0, max: 100, precision: 0.01 })  // Random decimal
```

### 7. **Text & Lorem** 📝

```typescript
faker.lorem.sentence()             // "Lorem ipsum dolor sit amet."
faker.lorem.paragraph()            // Full paragraph
faker.lorem.words(5)               // "lorem ipsum dolor sit amet"
```

---

## 💡 Practical Examples

### Example 1: User Registration Form

```typescript
test('register new user with faker data', async ({ page }) => {
  // Generate user data
  const user = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    password: faker.internet.password({ length: 12 })
  };
  
  // Navigate to registration page
  await page.goto('https://example.com/register');
  
  // Fill form with generated data
  await page.locator('#firstName').fill(user.firstName);
  await page.locator('#lastName').fill(user.lastName);
  await page.locator('#email').fill(user.email);
  await page.locator('#phone').fill(user.phone);
  await page.locator('#password').fill(user.password);
  
  // Submit form
  await page.locator('#submit').click();
  
  // Verify success
  await expect(page.locator('.success')).toContainText(user.email);
});
```

### Example 2: Create Multiple Users

```typescript
test('create 5 users with unique data', async ({ page }) => {
  for (let i = 0; i < 5; i++) {
    const user = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email()
    };

    console.log(`Creating user ${i + 1}: ${user.firstName} ${user.lastName}`);

    // Create user logic here
    await page.goto('/admin/users/add');
    await page.locator('#firstName').fill(user.firstName);
    await page.locator('#lastName').fill(user.lastName);
    await page.locator('#email').fill(user.email);
    await page.locator('#save').click();
  }
});
```

### Example 3: Address Form

```typescript
test('fill address form with faker', async ({ page }) => {
  const address = {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    country: faker.location.country()
  };

  await page.goto('/checkout/address');
  await page.locator('#street').fill(address.street);
  await page.locator('#city').fill(address.city);
  await page.locator('#state').fill(address.state);
  await page.locator('#zipCode').fill(address.zipCode);
  await page.locator('#country').fill(address.country);

  await page.locator('#continue').click();
  await expect(page).toHaveURL(/payment/);
});
```

---

## 🎯 OrangeHRM Example: Add Employee with Faker

**Real-world example using OrangeHRM demo application:**

```typescript
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('OrangeHRM - Add Employee with Faker', () => {

  test.beforeEach(async ({ page }) => {
    // Login to OrangeHRM
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should add new employee with faker data', async ({ page }) => {
    // Generate employee data
    const employee = {
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      employeeId: faker.number.int({ min: 1000, max: 9999 }).toString()
    };

    console.log(`Creating employee: ${employee.firstName} ${employee.lastName}`);

    // Navigate to Add Employee page
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('link', { name: 'Add Employee' }).click();

    // Fill employee details
    await page.getByPlaceholder('First Name').fill(employee.firstName);
    await page.getByPlaceholder('Middle Name').fill(employee.middleName);
    await page.getByPlaceholder('Last Name').fill(employee.lastName);

    // Clear and fill employee ID
    const employeeIdInput = page.locator('input').nth(4); // Employee ID field
    await employeeIdInput.clear();
    await employeeIdInput.fill(employee.employeeId);

    // Save employee
    await page.getByRole('button', { name: 'Save' }).click();

    // Verify employee was created
    await expect(page.locator('.oxd-toast-content')).toBeVisible();
    await expect(page.locator('.oxd-toast-content')).toContainText('Success');

    // Verify employee name is displayed
    const fullName = `${employee.firstName} ${employee.middleName} ${employee.lastName}`;
    await expect(page.locator('.orangehrm-edit-employee-name')).toContainText(employee.firstName);
  });
});
```

**See the complete working example in:** `tests/orangehrm/employees/add-employee-faker.spec.ts`

---

## 🔧 Advanced Features

### 1. **Seeded Data (Reproducible)**

Generate the same data every time for debugging:

```typescript
import { faker } from '@faker-js/faker';

// Set seed for reproducible data
faker.seed(123);

const name1 = faker.person.firstName(); // Always "Emma"
const name2 = faker.person.firstName(); // Always "Liam"

// Reset seed
faker.seed(123);
const name3 = faker.person.firstName(); // "Emma" again
```

### 2. **Localization**

Generate data in different languages:

```typescript
import { fakerDE, fakerFR, fakerES } from '@faker-js/faker';

// German data
const germanName = fakerDE.person.firstName(); // "Hans"

// French data
const frenchName = fakerFR.person.firstName(); // "Pierre"

// Spanish data
const spanishName = fakerES.person.firstName(); // "Carlos"
```

### 3. **Custom Formats**

```typescript
// Custom phone format
const phone = faker.phone.number('(###) ###-####');

// Custom date format
const date = faker.date.birthdate({ min: 18, max: 65, mode: 'age' });

// Custom number range
const age = faker.number.int({ min: 18, max: 65 });
```

---

## ✅ Best Practices

### ✅ Do:

1. **Use Faker for Dynamic Data**
   ```typescript
   // ✅ Good - unique every time
   const email = faker.internet.email();
   ```

2. **Store Generated Data for Assertions**
   ```typescript
   // ✅ Good - can verify later
   const firstName = faker.person.firstName();
   await page.locator('#firstName').fill(firstName);
   await expect(page.locator('.name')).toContainText(firstName);
   ```

3. **Use Realistic Data Types**
   ```typescript
   // ✅ Good - realistic email
   const email = faker.internet.email();

   // ❌ Bad - hardcoded
   const email = 'test@test.com';
   ```

4. **Log Generated Data for Debugging**
   ```typescript
   const user = {
     name: faker.person.fullName(),
     email: faker.internet.email()
   };
   console.log('Test data:', user);
   ```

### ❌ Don't:

1. **Don't Use Faker for Static Data**
   ```typescript
   // ❌ Bad - use constants instead
   const username = faker.string.alpha(5); // For login credentials

   // ✅ Good - use known credentials
   const username = 'Admin';
   ```

2. **Don't Forget to Handle Unique Constraints**
   ```typescript
   // ❌ Bad - might create duplicate emails
   const email = faker.internet.email();

   // ✅ Good - add timestamp for uniqueness
   const email = `${faker.person.firstName()}.${Date.now()}@example.com`;
   ```

---

## 🐛 Common Issues & Solutions

### Issue 1: Import Error

**Error:** `Cannot find module '@faker-js/faker'`

**Solution:**
```bash
npm install --save-dev @faker-js/faker
```

### Issue 2: TypeScript Errors

**Error:** `Could not find a declaration file for module '@faker-js/faker'`

**Solution:** The package includes TypeScript definitions. Make sure your `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### Issue 3: Data Not Unique

**Problem:** Getting duplicate data in tests

**Solution:** Add timestamp or use unique identifiers:
```typescript
const email = `user.${Date.now()}@example.com`;
const employeeId = `EMP${Date.now()}`;
```

---

## 📚 Quick Reference

| Category | Method | Example Output |
|----------|--------|----------------|
| **Person** | `faker.person.firstName()` | "Emma" |
| | `faker.person.lastName()` | "Johnson" |
| | `faker.person.fullName()` | "Emma Johnson" |
| **Internet** | `faker.internet.email()` | "emma@example.com" |
| | `faker.internet.userName()` | "emma_j92" |
| | `faker.internet.password()` | "aB3$xY9!mK" |
| **Phone** | `faker.phone.number()` | "(555) 123-4567" |
| **Location** | `faker.location.city()` | "New York" |
| | `faker.location.streetAddress()` | "123 Main St" |
| | `faker.location.zipCode()` | "90210" |
| **Date** | `faker.date.past()` | Past date |
| | `faker.date.birthdate()` | Realistic birthdate |
| **Number** | `faker.number.int({ min: 1, max: 100 })` | 42 |

---

## 🎓 Summary

**You've learned:**
- ✅ What Faker.js is and why it's useful
- ✅ How to install and import Faker
- ✅ Common Faker methods for different data types
- ✅ Practical examples with forms and user data
- ✅ Real-world OrangeHRM example
- ✅ Best practices and common pitfalls

**Next Steps:**
1. Install Faker.js in your project
2. Try the OrangeHRM example
3. Replace hardcoded test data with Faker
4. Explore more Faker methods in the [official documentation](https://fakerjs.dev/)

---

## 📖 Resources

- **Official Documentation:** https://fakerjs.dev/
- **GitHub Repository:** https://github.com/faker-js/faker
- **API Reference:** https://fakerjs.dev/api/
- **Working Example:** `tests/orangehrm/employees/add-employee-faker.spec.ts`

---

**🎉 Happy Testing with Realistic Data!** 🎭✨



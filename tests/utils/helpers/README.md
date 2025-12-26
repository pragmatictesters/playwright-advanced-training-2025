# Helper Classes in Playwright

## 📚 What are Helper Classes?

Helper classes are **reusable utility modules** that contain common functionality shared across multiple tests. They help keep your test code clean, maintainable, and DRY (Don't Repeat Yourself).

---

## 🎯 Why Use Helper Classes?

| Benefit | Description |
|---------|-------------|
| **Reusability** | Write once, use everywhere |
| **Maintainability** | Update in one place, affects all tests |
| **Readability** | Tests focus on test logic, not data generation |
| **Consistency** | Same data format across all tests |
| **Type Safety** | TypeScript interfaces catch errors early |

---

## 📁 Recommended Folder Structure

```
tests/
├── utils/                    # Utility folder
│   ├── helpers/              # Helper classes
│   │   ├── user-data-generator.ts
│   │   ├── date-helper.ts
│   │   └── string-helper.ts
│   ├── constants/            # Constant values
│   │   └── test-data.ts
│   └── types/                # TypeScript interfaces
│       └── user.types.ts
├── pages/                    # Page Object Models
├── fixtures/                 # Custom fixtures
└── specs/                    # Test files
```

---

## 🔧 Best Practices

### 1. **Use Descriptive Names**
```typescript
// ✅ Good
generateUniqueEmail()
createTestUser()

// ❌ Bad
gen()
makeData()
```

### 2. **Add JSDoc Comments**
```typescript
/**
 * Generates a unique email address
 * @param domain - Optional email domain (default: test.com)
 * @returns Unique email string
 */
generateEmail(domain: string = 'test.com'): string {
  // ...
}
```

### 3. **Use TypeScript Interfaces**
```typescript
// Define the shape of your data
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

// Now TypeScript ensures type safety
const user: User = generateUser();
```

### 4. **Make Methods Pure When Possible**
```typescript
// Pure function - same input always gives same output structure
generatePassword(): string {
  return `Test@${Date.now()}!`;
}
```

### 5. **Use Private Methods for Internal Logic**
```typescript
class DataGenerator {
  // Public - available to tests
  public generateUser(): User { ... }
  
  // Private - internal use only
  private generateRandomString(length: number): string { ... }
}
```

---

## 📦 Common Helper Libraries

### 1. **Faker.js** (Most Popular)
Generates realistic fake data for testing.

```bash
npm install @faker-js/faker --save-dev
```

```typescript
import { faker } from '@faker-js/faker';

const user = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
};
```

### 2. **Chance.js**
Lightweight random data generator.

```bash
npm install chance --save-dev
```

```typescript
import Chance from 'chance';
const chance = new Chance();

const data = {
  name: chance.name(),
  email: chance.email(),
  age: chance.age(),
};
```

### 3. **UUID**
Generate unique identifiers.

```bash
npm install uuid --save-dev
```

```typescript
import { v4 as uuidv4 } from 'uuid';
const uniqueId = uuidv4(); // '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
```

---

## 🚀 Quick Start Example

### Step 1: Create Helper Class
```typescript
// tests/utils/helpers/user-generator.ts
export class UserGenerator {
  generateEmail(): string {
    return `user_${Date.now()}@test.com`;
  }
}
```

### Step 2: Use in Tests
```typescript
// tests/my-test.spec.ts
import { UserGenerator } from '../utils/helpers/user-generator';

const generator = new UserGenerator();

test('register new user', async ({ page }) => {
  const email = generator.generateEmail();
  await page.fill('#email', email);
});
```

---

## 📋 Files in This Folder

| File | Description |
|------|-------------|
| `user-data-generator.ts` | Helper class for generating user data |
| `user-data-generator.spec.ts` | Demo test showing how to use the helper |
| `README.md` | This documentation file |

---

## 🧪 Running the Demo Test

```bash
# Run with visible output
npx playwright test tests/utils/helpers/user-data-generator.spec.ts --project=chromium

# Run in UI mode (recommended for learning)
npx playwright test tests/utils/helpers/user-data-generator.spec.ts --ui
```

---

## 💡 Tips for Beginners

1. **Start Simple** - Create basic helpers first, add complexity later
2. **One Responsibility** - Each helper should do one thing well
3. **Test Your Helpers** - Write tests for your helper classes too
4. **Document Everything** - Future you will thank present you
5. **Use Constants** - Extract magic numbers and strings to constants

---

## 📖 Further Reading

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Faker.js Documentation](https://fakerjs.dev/)


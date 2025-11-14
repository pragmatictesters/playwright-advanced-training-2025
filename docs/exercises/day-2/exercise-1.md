# Day 2 - Exercise 1: Real-World Application Testing with OrangeHRM

![Difficulty: Intermediate](https://img.shields.io/badge/Difficulty-Intermediate-yellow)
![Time: 2-3 hours](https://img.shields.io/badge/Time-2--3%20hours-blue)

## 🎯 Learning Objectives

By completing this exercise, you will:
- ✅ Test a real-world web application (OrangeHRM)
- ✅ Organize tests in a professional folder structure
- ✅ Implement login and logout functionality tests
- ✅ Create data-driven tests using CSV files
- ✅ Use built-in Playwright locators (`getByRole`, `getByPlaceholder`, `getByText`)
- ✅ Write self-contained tests
- ✅ Follow naming conventions for files, tests, and variables
- ✅ Create custom npm scripts for test execution
- ✅ Generate and view test reports

---

## 📋 Prerequisites

- ✅ Completed Day 1 Exercise 1
- ✅ Understanding of basic Playwright concepts
- ✅ Familiarity with test structure and assertions
- ✅ Node.js and Playwright installed

---

## 🌐 Application Under Test

**Application**: OrangeHRM Demo  
**URL**: https://opensource-demo.orangehrmlive.com/  
**Valid Credentials**:
- **Username**: `Admin`
- **Password**: `admin123`

**Note**: This is a public demo site. Data resets periodically.

---

## 📁 Project Structure

You will create the following structure:

```
your-project/
├── tests/
│   └── orangehrm/
│       └── auth/
│           ├── login.spec.ts
│           ├── logout.spec.ts
│           └── login-data-driven.spec.ts
├── test-data/
│   └── orangehrm/
│       └── invalid-logins.csv
├── utils/
│   └── csv-reader.ts
├── screenshots/
│   └── orangehrm/
├── playwright.config.ts
└── package.json
```

---

## 🚀 Exercise Steps

### Step 1: Create Folder Structure

Create the necessary folders for organizing your tests:

```bash
# Navigate to your project directory
cd your-project-folder

# Create folder structure
mkdir -p tests/orangehrm/auth
mkdir -p test-data/orangehrm
mkdir -p utils
mkdir -p screenshots/orangehrm
```

**Verify**:
```bash
ls -R tests/
ls -R test-data/
ls utils/
```

---

### Step 2: Explore the Application with Codegen

Use Playwright's codegen to explore the OrangeHRM application:

```bash
npx playwright codegen https://opensource-demo.orangehrmlive.com/
```

**Tasks**:
1. Observe the login page elements
2. Try logging in with valid credentials
3. Explore the dashboard
4. Try logging out
5. Note the locators Playwright suggests

**Close codegen** when done exploring.

---

### Step 3: Create CSV Helper Utility

Create `utils/csv-reader.ts` to read test data from CSV files:

```typescript
import fs from 'fs';
import path from 'path';

export interface CSVRow {
  [key: string]: string;
}

export function readCSV(filename: string): CSVRow[] {
  const csvPath = path.join(__dirname, '../test-data/orangehrm', filename);
  
  if (!fs.existsSync(csvPath)) {
    throw new Error(`CSV file not found: ${csvPath}`);
  }
  
  const content = fs.readFileSync(csvPath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) {
    throw new Error(`CSV file is empty: ${filename}`);
  }
  
  const headers = lines[0].split(',').map(h => h.trim());
  const data: CSVRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row: CSVRow = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index]?.trim() || '';
    });
    
    data.push(row);
  }
  
  return data;
}
```

**Save** this file as `utils/csv-reader.ts`.

---

### Step 4: Create Test Data CSV File

Create `test-data/orangehrm/invalid-logins.csv`:

```csv
username,password,expectedError
Admin,wrongpassword,Invalid credentials
invaliduser,admin123,Invalid credentials
,admin123,Required
Admin,,Required
,,Required
WrongUser,WrongPass,Invalid credentials
```

**Save** this file as `test-data/orangehrm/invalid-logins.csv`.

---

### Step 5: Create Login Tests

Create `tests/orangehrm/auth/login.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('OrangeHRM - Login Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Fill in username
    await page.getByPlaceholder('Username').fill('Admin');
    
    // Fill in password
    await page.getByPlaceholder('Password').fill('admin123');
    
    // Click login button
    await page.getByRole('button', { name: 'Login' }).click();
    
    // Verify successful login
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('should show error message with invalid username', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('InvalidUser');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
    await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
  });

  test('should show error message with invalid password', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();
    
    await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
    await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
  });

  test('should show required error when username is empty', async ({ page }) => {
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    
    const usernameError = page.locator('.oxd-input-group')
      .filter({ hasText: 'Username' })
      .locator('.oxd-input-field-error-message');
    
    await expect(usernameError).toBeVisible();
    await expect(usernameError).toContainText('Required');
  });

  test('should show required error when password is empty', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByRole('button', { name: 'Login' }).click();
    
    const passwordError = page.locator('.oxd-input-group')
      .filter({ hasText: 'Password' })
      .locator('.oxd-input-field-error-message');
    
    await expect(passwordError).toBeVisible();
    await expect(passwordError).toContainText('Required');
  });
});
```

**Run the tests**:
```bash
npx playwright test tests/orangehrm/auth/login.spec.ts --project=chromium
```

---

### Step 6: Create Logout Tests

Create `tests/orangehrm/auth/logout.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('OrangeHRM - Logout Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.getByPlaceholder('Username').fill('Admin');
    await page.getByPlaceholder('Password').fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/dashboard/);
  });

  test('should logout successfully', async ({ page }) => {
    // Click user dropdown
    await page.locator('.oxd-userdropdown-tab').click();
    
    // Click logout
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    
    // Verify redirected to login page
    await expect(page).toHaveURL(/login/);
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('should not allow access after logout when clicking back button', async ({ page }) => {
    // Logout
    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/login/);
    
    // Click browser back button
    await page.goBack();
    await page.waitForTimeout(1000);
    
    // Should still be on login page
    await expect(page).toHaveURL(/login/);
  });
});
```

**Run the tests**:
```bash
npx playwright test tests/orangehrm/auth/logout.spec.ts --project=chromium
```

---

### Step 7: Create Data-Driven Tests

Create `tests/orangehrm/auth/login-data-driven.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { readCSV } from '../../../utils/csv-reader';

const invalidLoginData = readCSV('invalid-logins.csv');

test.describe('OrangeHRM - Data-Driven Login Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  for (const data of invalidLoginData) {
    test(`should show "${data.expectedError}" for username: "${data.username}" and password: "${data.password}"`, async ({ page }) => {
      
      if (data.username) {
        await page.getByPlaceholder('Username').fill(data.username);
      }
      
      if (data.password) {
        await page.getByPlaceholder('Password').fill(data.password);
      }
      
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForTimeout(1000);
      
      if (data.expectedError === 'Invalid credentials') {
        await expect(page.locator('.oxd-alert-content-text')).toBeVisible();
        await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials');
      } else if (data.expectedError === 'Required') {
        if (!data.username) {
          const usernameError = page.locator('.oxd-input-group')
            .filter({ hasText: 'Username' })
            .locator('.oxd-input-field-error-message');
          await expect(usernameError).toContainText('Required');
        }
        if (!data.password) {
          const passwordError = page.locator('.oxd-input-group')
            .filter({ hasText: 'Password' })
            .locator('.oxd-input-field-error-message');
          await expect(passwordError).toContainText('Required');
        }
      }
    });
  }
});
```

**Run the tests**:
```bash
npx playwright test tests/orangehrm/auth/login-data-driven.spec.ts --project=chromium
```

---

### Step 8: Add npm Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test:orangehrm": "playwright test tests/orangehrm",
    "test:orangehrm:auth": "playwright test tests/orangehrm/auth",
    "test:orangehrm:login": "playwright test tests/orangehrm/auth/login.spec.ts",
    "test:orangehrm:logout": "playwright test tests/orangehrm/auth/logout.spec.ts",
    "test:orangehrm:data-driven": "playwright test tests/orangehrm/auth/login-data-driven.spec.ts",
    "test:orangehrm:headed": "playwright test tests/orangehrm --headed",
    "test:orangehrm:ui": "playwright test tests/orangehrm --ui",
    "codegen:orangehrm": "playwright codegen https://opensource-demo.orangehrmlive.com/"
  }
}
```

**Test the scripts**:
```bash
npm run test:orangehrm
npm run test:orangehrm:headed
npm run test:orangehrm:ui
```

---

### Step 9: Run All Tests and View Report

Run all OrangeHRM tests:

```bash
# Run all tests
npm run test:orangehrm

# View HTML report
npx playwright show-report
```

**Explore the report**:
- View test results
- Check execution time
- See screenshots (if any failures)
- Review test traces

---

### Step 10: Commit Your Work

```bash
git add .
git commit -m "Day 2: OrangeHRM authentication tests with data-driven approach"
git log --oneline
```

---

## ✅ Verification Checklist

- [ ] Created folder structure (tests/orangehrm/auth, test-data, utils)
- [ ] Created CSV helper utility (utils/csv-reader.ts)
- [ ] Created test data CSV file (invalid-logins.csv)
- [ ] Created login tests (login.spec.ts) - at least 5 tests
- [ ] Created logout tests (logout.spec.ts) - at least 2 tests
- [ ] Created data-driven tests (login-data-driven.spec.ts)
- [ ] Added npm scripts to package.json
- [ ] All tests pass when run
- [ ] Viewed HTML report
- [ ] Committed changes to Git

---

## 📊 Expected Results

### Test Count
- **Login tests**: 11 tests
- **Logout tests**: 8 tests
- **Data-driven tests**: 8 tests (6 data rows + 2 validation tests)
- **Total**: 27 tests

### All Tests Should Pass ✅

---

## 🎓 What You Learned

### Concepts
1. **Real-world application testing**
2. **Professional folder organization**
3. **Data-driven testing with CSV**
4. **Self-contained tests** (each test is independent)
5. **Built-in locators** (`getByRole`, `getByPlaceholder`, `getByText`)
6. **Test hooks** (`beforeEach` for setup)
7. **Custom npm scripts**

### Best Practices
1. **Naming conventions** - kebab-case for files, descriptive test names
2. **Folder structure** - domain/feature organization
3. **Test data separation** - CSV files separate from test code
4. **Reusable utilities** - CSV reader can be used for other tests
5. **Self-contained tests** - Each test logs in independently

---

## 🤔 Common Issues & Solutions

### Issue 1: CSV file not found
**Solution**: Check the path in `csv-reader.ts` matches your folder structure

### Issue 2: Tests timeout
**Solution**: Increase timeout in `playwright.config.ts` or check internet connection

### Issue 3: Locators not found
**Solution**: Use codegen to verify correct locators for current site version

### Issue 4: Tests fail intermittently
**Solution**: Add `await page.waitForTimeout(1000)` after actions if needed

---

## 🚀 Bonus Challenges

### Challenge 1: Add More Test Scenarios
Add tests for:
- Username with leading/trailing spaces
- Password visibility toggle (if available)
- "Remember me" functionality (if available)

### Challenge 2: Add More CSV Data
Add 3 more rows to `invalid-logins.csv` with different invalid combinations

### Challenge 3: Run Tests in All Browsers
```bash
npx playwright test tests/orangehrm --project=chromium --project=firefox --project=webkit
```

### Challenge 4: Take Screenshots
Add screenshot capture for failed tests in `playwright.config.ts`

---

## 📚 Reference Links

- **OrangeHRM Demo**: https://opensource-demo.orangehrmlive.com/
- **Playwright Locators**: https://playwright.dev/docs/locators
- **Playwright Assertions**: https://playwright.dev/docs/test-assertions
- **Data-Driven Testing**: https://playwright.dev/docs/test-parameterize

---

## 🎯 Next Steps

**Day 3 Preview**: Page Object Model (POM)

You'll learn to:
- Create reusable page classes
- Centralize locators
- Reduce code duplication
- Make tests more maintainable

---

## 🎉 Congratulations!

You've completed Day 2 Exercise 1! 🎭

You now know how to:
- ✅ Test real-world applications
- ✅ Organize tests professionally
- ✅ Implement data-driven testing
- ✅ Use built-in locators
- ✅ Create self-contained tests
- ✅ Follow naming conventions

**Ready for Day 3!** 🚀✨

---

**Questions?** Ask your trainer or check the [Troubleshooting Guide](../../installation/04-troubleshooting.md)


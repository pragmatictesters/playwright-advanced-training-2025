# 🎓 Playwright Capstone Project

## 🍊 OrangeHRM Test Automation

![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

---

## 📋 Table of Contents

1. [Project Overview](#-project-overview)
2. [Application Under Test](#-application-under-test)
3. [Project Structure](#-project-structure)
4. [Setup Instructions](#-setup-instructions)
5. [Test Cases](#-test-cases)
6. [Page Objects](#-page-objects)
7. [Helper Classes](#-helper-classes)
8. [Configuration](#-configuration)
9. [GitHub Actions CI/CD](#-github-actions-cicd)
10. [Allure Reports](#-allure-reports)
11. [Coding Standards](#-coding-standards)
12. [Submission Guidelines](#-submission-guidelines)

---

## 🎯 Project Overview

| Aspect | Details |
|--------|---------|
| **Duration** | 2 Weeks |
| **Technology** | Playwright + TypeScript |
| **Pattern** | Page Object Model (POM) |
| **Reporting** | Allure Reports |
| **CI/CD** | GitHub Actions |
| **Data Generation** | Faker.js |
| **Logging** | Winston Logger |

### 🏆 Learning Objectives

```
✅ Master Page Object Model in real-world scenarios
✅ Implement reusable helper classes
✅ Write comprehensive positive & negative tests
✅ Use Faker.js for dynamic test data
✅ Integrate logging for debugging
✅ Set up CI/CD pipelines
✅ Generate professional test reports
✅ Follow industry coding standards
```

---

## 🌐 Application Under Test

| Property | Value |
|----------|-------|
| **URL** | https://opensource-demo.orangehrmlive.com/ |
| **Username** | `Admin` |
| **Password** | `admin123` |

### 📱 Modules to Test

| Module | Priority | Status |
|--------|----------|--------|
| 🔐 Login/Logout | High | Required |
| 👥 PIM (Employee Management) | High | Required |
| 📊 Dashboard | Medium | Optional |
| ⏰ Time Module | Low | Future |

---

## 📁 Project Structure

```
orangehrm-playwright-capstone/
├── 📁 .github/
│   └── 📁 workflows/
│       └── playwright.yml          # CI/CD pipeline
│
├── 📁 config/
│   ├── default.config.ts           # Shared configuration
│   ├── trainee-chamiya.config.ts   # Individual configs
│   ├── trainee-deepika.config.ts
│   ├── trainee-rajitha.config.ts
│   └── trainee-[name].config.ts
│
├── 📁 src/
│   ├── 📁 pages/                   # Page Object classes
│   │   ├── base-page.ts
│   │   ├── login-page.ts
│   │   ├── dashboard-page.ts
│   │   ├── pim/
│   │   │   ├── employee-list-page.ts
│   │   │   └── add-employee-page.ts
│   │   └── index.ts                # Barrel export
│   │
│   ├── 📁 helpers/                 # Utility classes
│   │   ├── faker-helper.ts
│   │   ├── logger.ts
│   │   ├── date-helper.ts
│   │   └── api-helper.ts           # Future: API testing
│   │
│   ├── 📁 fixtures/
│   │   └── orangehrm-fixtures.ts
│   │
│   └── 📁 types/
│       └── employee.types.ts
│
├── 📁 tests/
│   ├── 📁 trainees/
│   │   ├── 📁 chamiya/             # Each trainee's folder
│   │   │   ├── login.spec.ts
│   │   │   ├── logout.spec.ts
│   │   │   └── add-employee.spec.ts
│   │   ├── 📁 deepika/
│   │   ├── 📁 rajitha/
│   │   └── 📁 [your-name]/
│   │
│   └── 📁 shared/                  # Reference implementations
│       └── example-tests.spec.ts
│
├── 📁 test-data/
│   └── employees.json
│
├── 📁 reports/
│   └── 📁 allure-results/
│
├── playwright.config.ts
├── package.json
└── README.md
```

---

## 🚀 Setup Instructions

### Step 1: Clone Repository
```bash
git clone https://github.com/[org]/orangehrm-playwright-capstone.git
cd orangehrm-playwright-capstone
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Install Playwright Browsers
```bash
npx playwright install
```

### Step 4: Create Your Folder
```bash
mkdir tests/trainees/[your-name]
```

### Step 5: Run Tests
```bash
# Run your tests only
npx playwright test tests/trainees/[your-name]/ --project=chromium

# Run with your config
npx playwright test --config=config/trainee-[your-name].config.ts
```

---

## 📝 Test Cases

### 🔐 TC-LOGIN: Login Test Cases

| TC ID | Summary | Type | Priority |
|-------|---------|------|----------|
| TC-LOGIN-001 | Verify successful login with valid credentials | ✅ Positive | 🔴 High |
| TC-LOGIN-002 | Verify login page title and branding | ✅ Positive | 🟡 Medium |
| TC-LOGIN-003 | Verify password field is masked | ✅ Positive | 🟢 Low |
| TC-LOGIN-004 | Verify error for empty username | ❌ Negative | 🔴 High |
| TC-LOGIN-005 | Verify error for empty password | ❌ Negative | 🔴 High |
| TC-LOGIN-006 | Verify error for invalid username | ❌ Negative | 🔴 High |
| TC-LOGIN-007 | Verify error for invalid password | ❌ Negative | 🔴 High |
| TC-LOGIN-008 | Verify error for both fields empty | ❌ Negative | 🟡 Medium |
| TC-LOGIN-009 | Verify login with whitespace credentials | ❌ Negative | 🟡 Medium |
| TC-LOGIN-010 | Verify SQL injection prevention | ❌ Negative | 🔴 High |

### 🚪 TC-LOGOUT: Logout Test Cases

| TC ID | Summary | Type | Priority |
|-------|---------|------|----------|
| TC-LOGOUT-001 | Verify successful logout from dashboard | ✅ Positive | 🔴 High |
| TC-LOGOUT-002 | Verify redirect to login page after logout | ✅ Positive | 🔴 High |
| TC-LOGOUT-003 | Verify user dropdown displays username | ✅ Positive | 🟡 Medium |
| TC-LOGOUT-004 | Verify cannot access dashboard after logout | ❌ Negative | 🔴 High |
| TC-LOGOUT-005 | Verify back button doesn't restore session | ❌ Negative | 🟡 Medium |

### 👥 TC-EMP: Add Employee Test Cases

| TC ID | Summary | Type | Priority |
|-------|---------|------|----------|
| TC-EMP-001 | Add employee with mandatory fields only | ✅ Positive | 🔴 High |
| TC-EMP-002 | Add employee with all fields | ✅ Positive | 🔴 High |
| TC-EMP-003 | Add employee with profile picture | ✅ Positive | 🟡 Medium |
| TC-EMP-004 | Add employee with login credentials | ✅ Positive | 🔴 High |
| TC-EMP-005 | Verify auto-generated Employee ID | ✅ Positive | 🟡 Medium |
| TC-EMP-006 | Add employee with custom Employee ID | ✅ Positive | 🟡 Medium |
| TC-EMP-007 | Verify error for empty first name | ❌ Negative | 🔴 High |
| TC-EMP-008 | Verify error for empty last name | ❌ Negative | 🔴 High |
| TC-EMP-009 | Verify error for duplicate Employee ID | ❌ Negative | 🔴 High |
| TC-EMP-010 | Verify first name max length validation | ❌ Negative | 🟡 Medium |
| TC-EMP-011 | Verify special characters in name fields | ❌ Negative | 🟡 Medium |
| TC-EMP-012 | Cancel adding employee and verify no save | ❌ Negative | 🟡 Medium |



---

## 🏗️ Page Objects

### Base Page (Template)

```typescript
// src/pages/base-page.ts
import { Page, Locator } from '@playwright/test';
import { Logger } from '../helpers/logger';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger(this.constructor.name);
  }

  /** Wait for page to fully load */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    this.logger.info('Page loaded successfully');
  }

  /** Take screenshot for debugging */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `reports/screenshots/${name}.png` });
    this.logger.info(`Screenshot saved: ${name}.png`);
  }
}
```

### Login Page

```typescript
// src/pages/login-page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  // Locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly brandingLogo: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.oxd-alert-content-text');
    this.brandingLogo = page.locator('.orangehrm-login-branding img');
  }

  /** Navigate to login page */
  async goto(): Promise<void> {
    this.logger.info('Navigating to login page');
    await this.page.goto('/');
    await this.waitForPageLoad();
  }

  /** Login with credentials */
  async login(username: string, password: string): Promise<void> {
    this.logger.info(`Logging in as: ${username}`);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Verify error message */
  async verifyErrorMessage(expectedText: string): Promise<void> {
    await expect(this.errorMessage).toContainText(expectedText);
    this.logger.info(`Error message verified: ${expectedText}`);
  }

  /** Check if password is masked */
  async isPasswordMasked(): Promise<boolean> {
    const type = await this.passwordInput.getAttribute('type');
    return type === 'password';
  }
}
```

### Dashboard Page

```typescript
// src/pages/dashboard-page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base-page';

export class DashboardPage extends BasePage {
  readonly userDropdown: Locator;
  readonly logoutLink: Locator;
  readonly dashboardTitle: Locator;
  readonly sideMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.userDropdown = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.locator('a:has-text("Logout")');
    this.dashboardTitle = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.sideMenu = page.locator('.oxd-sidepanel');
  }

  /** Verify dashboard loaded */
  async verifyPageLoaded(): Promise<void> {
    await expect(this.dashboardTitle).toBeVisible();
    this.logger.info('Dashboard page loaded');
  }

  /** Logout from application */
  async logout(): Promise<void> {
    this.logger.info('Logging out');
    await this.userDropdown.click();
    await this.logoutLink.click();
  }

  /** Navigate to PIM module */
  async navigateToPIM(): Promise<void> {
    await this.page.locator('a:has-text("PIM")').click();
    await this.waitForPageLoad();
  }
}
```

### Add Employee Page

```typescript
// src/pages/pim/add-employee-page.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../base-page';
import { EmployeeData } from '../../types/employee.types';

export class AddEmployeePage extends BasePage {
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly createLoginToggle: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly saveButton: Locator;
  readonly cancelButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('.oxd-input').nth(4);
    this.createLoginToggle = page.locator('.oxd-switch-input');
    this.usernameInput = page.locator('input').filter({ hasText: '' }).nth(5);
    this.passwordInput = page.locator('input[type="password"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"]').last();
    this.saveButton = page.locator('button[type="submit"]');
    this.cancelButton = page.locator('button:has-text("Cancel")');
    this.successMessage = page.locator('.oxd-toast--success');
  }

  /** Add new employee with data */
  async addEmployee(employee: EmployeeData): Promise<void> {
    this.logger.info(`Adding employee: ${employee.firstName} ${employee.lastName}`);

    await this.firstNameInput.fill(employee.firstName);
    if (employee.middleName) {
      await this.middleNameInput.fill(employee.middleName);
    }
    await this.lastNameInput.fill(employee.lastName);

    if (employee.employeeId) {
      await this.employeeIdInput.clear();
      await this.employeeIdInput.fill(employee.employeeId);
    }

    await this.saveButton.click();
    await this.waitForPageLoad();
  }

  /** Verify success message */
  async verifySuccess(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
    this.logger.info('Employee added successfully');
  }
}
```



---

## 🛠️ Helper Classes

### Faker Helper

```typescript
// src/helpers/faker-helper.ts
import { faker } from '@faker-js/faker';
import { EmployeeData } from '../types/employee.types';

export class FakerHelper {

  /** Generate random employee data */
  generateEmployee(): EmployeeData {
    return {
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      employeeId: faker.string.numeric(4),
    };
  }

  /** Generate random date in format YYYY-MM-DD */
  generateDate(yearsBack: number = 30): string {
    const date = faker.date.past({ years: yearsBack });
    return date.toISOString().split('T')[0];
  }

  /** Generate random username */
  generateUsername(): string {
    return faker.internet.username().toLowerCase();
  }

  /** Generate strong password */
  generatePassword(): string {
    return faker.internet.password({ length: 12, memorable: false });
  }

  /** Generate random email */
  generateEmail(): string {
    return faker.internet.email().toLowerCase();
  }

  /** Generate random phone number */
  generatePhone(): string {
    return faker.phone.number();
  }
}

// Export singleton instance
export const fakerHelper = new FakerHelper();
```

### Logger

```typescript
// src/helpers/logger.ts
import * as fs from 'fs';
import * as path from 'path';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

export class Logger {
  private context: string;
  private static logFile = 'reports/test-execution.log';

  constructor(context: string) {
    this.context = context;
    this.ensureLogDirectory();
  }

  private ensureLogDirectory(): void {
    const dir = path.dirname(Logger.logFile);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] [${this.context}] ${message}`;
  }

  private log(level: LogLevel, message: string): void {
    const formattedMessage = this.formatMessage(level, message);

    // Console output with colors
    const colors = {
      DEBUG: '\x1b[36m',  // Cyan
      INFO: '\x1b[32m',   // Green
      WARN: '\x1b[33m',   // Yellow
      ERROR: '\x1b[31m',  // Red
    };
    console.log(`${colors[level]}${formattedMessage}\x1b[0m`);

    // Write to file
    fs.appendFileSync(Logger.logFile, formattedMessage + '\n');
  }

  debug(message: string): void { this.log(LogLevel.DEBUG, message); }
  info(message: string): void { this.log(LogLevel.INFO, message); }
  warn(message: string): void { this.log(LogLevel.WARN, message); }
  error(message: string): void { this.log(LogLevel.ERROR, message); }
}
```

### Date Helper

```typescript
// src/helpers/date-helper.ts
export class DateHelper {

  /** Get current date in YYYY-MM-DD format */
  getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  /** Get date X days from now */
  getFutureDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }

  /** Get date X days ago */
  getPastDate(days: number): string {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
  }

  /** Format date to DD/MM/YYYY */
  formatToDDMMYYYY(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
}

export const dateHelper = new DateHelper();
```

---

## 📋 Types

```typescript
// src/types/employee.types.ts
export interface EmployeeData {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId?: string;
  photo?: string;
  createLogin?: boolean;
  username?: string;
  password?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface TestConfig {
  traineeName: string;
  baseUrl: string;
  credentials: LoginCredentials;
  timeout: number;
  retries: number;
}
```

---

## 🎭 Fixtures

```typescript
// src/fixtures/orangehrm-fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { AddEmployeePage } from '../pages/pim/add-employee-page';
import { FakerHelper } from '../helpers/faker-helper';
import { Logger } from '../helpers/logger';

// Declare fixture types
type OrangeHRMFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  addEmployeePage: AddEmployeePage;
  faker: FakerHelper;
  logger: Logger;
};

// Extend base test with our fixtures
export const test = base.extend<OrangeHRMFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  addEmployeePage: async ({ page }, use) => {
    await use(new AddEmployeePage(page));
  },

  faker: async ({}, use) => {
    await use(new FakerHelper());
  },

  logger: async ({}, use) => {
    await use(new Logger('Test'));
  },
});

export { expect } from '@playwright/test';
```



---

## ⚙️ Configuration

### Default Config (Shared)

```typescript
// config/default.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const defaultConfig: PlaywrightTestConfig = {
  testDir: '../tests',
  timeout: 60000,
  retries: 1,
  workers: 1,
  reporter: [
    ['html', { outputFolder: '../reports/html' }],
    ['allure-playwright', { outputFolder: '../reports/allure-results' }],
    ['list'],
  ],
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
  ],
};

export default defaultConfig;
```

### Individual Trainee Config

```typescript
// config/trainee-chamiya.config.ts
import { defineConfig } from '@playwright/test';
import defaultConfig from './default.config';

export default defineConfig({
  ...defaultConfig,
  testDir: '../tests/trainees/chamiya',
  outputDir: '../reports/trainees/chamiya',
  reporter: [
    ['html', { outputFolder: '../reports/trainees/chamiya/html' }],
    ['allure-playwright', { outputFolder: '../reports/trainees/chamiya/allure' }],
    ['list'],
  ],
  metadata: {
    traineeName: 'Chamiya',
    submissionDate: new Date().toISOString(),
  },
});
```

### Environment Variables (.env)

```bash
# .env.example (copy to .env and fill in values)
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
HEADLESS=true
TIMEOUT=60000
RETRIES=1
```

---

## 🚀 GitHub Actions CI/CD

```yaml
# .github/workflows/playwright.yml
name: 🎭 Playwright Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  workflow_dispatch:
    inputs:
      trainee:
        description: 'Run tests for specific trainee (leave empty for all)'
        required: false
        default: ''

jobs:
  test:
    name: 🧪 Run Playwright Tests
    runs-on: ubuntu-latest
    timeout-minutes: 30

    steps:
      - name: 📥 Checkout repository
        uses: actions/checkout@v4

      - name: 🟢 Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: 📦 Install dependencies
        run: npm ci

      - name: 🎭 Install Playwright browsers
        run: npx playwright install --with-deps chromium

      - name: 🧪 Run tests
        run: |
          if [ -n "${{ github.event.inputs.trainee }}" ]; then
            npx playwright test tests/trainees/${{ github.event.inputs.trainee }}/ --project=chromium
          else
            npx playwright test --project=chromium
          fi

      - name: 📊 Generate Allure Report
        if: always()
        run: |
          npm install -g allure-commandline
          allure generate reports/allure-results -o reports/allure-report --clean

      - name: 📤 Upload HTML Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: reports/html/
          retention-days: 30

      - name: 📤 Upload Allure Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: allure-report
          path: reports/allure-report/
          retention-days: 30

      - name: 🚀 Deploy Allure to GitHub Pages
        if: github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: reports/allure-report
```



---

## 📊 Allure Reports

### Installation

```bash
# Install Allure reporter
npm install -D allure-playwright

# Install Allure CLI (macOS)
brew install allure

# Install Allure CLI (Windows)
scoop install allure
```

### Generate Report

```bash
# Run tests with Allure
npx playwright test --reporter=allure-playwright

# Generate HTML report
allure generate reports/allure-results -o reports/allure-report --clean

# Open report in browser
allure open reports/allure-report
```

### Allure Annotations

```typescript
import { test } from '@playwright/test';
import * as allure from 'allure-js-commons';

test('TC-LOGIN-001: Valid login', async ({ page }) => {
  // Add test metadata
  await allure.epic('Authentication');
  await allure.feature('Login');
  await allure.story('Valid Login');
  await allure.severity('critical');
  await allure.owner('Chamiya');

  // Add test steps
  await allure.step('Navigate to login page', async () => {
    await page.goto('/');
  });

  await allure.step('Enter credentials', async () => {
    await page.fill('[name="username"]', 'Admin');
    await page.fill('[name="password"]', 'admin123');
  });

  await allure.step('Click login button', async () => {
    await page.click('button[type="submit"]');
  });
});
```

---

## 📏 Coding Standards

### ✅ Naming Conventions

| Item | Convention | Example |
|------|------------|---------|
| Files | kebab-case | `login-page.ts`, `add-employee.spec.ts` |
| Classes | PascalCase | `LoginPage`, `FakerHelper` |
| Methods | camelCase | `verifyErrorMessage()`, `addEmployee()` |
| Variables | camelCase | `firstName`, `employeeId` |
| Constants | UPPER_SNAKE | `BASE_URL`, `ADMIN_USERNAME` |
| Test IDs | TC-PREFIX-### | `TC-LOGIN-001`, `TC-EMP-003` |

### ✅ Best Practices

```typescript
// ✅ DO: Use descriptive test names
test('TC-LOGIN-001: should login successfully with valid credentials', async () => {});

// ❌ DON'T: Use vague names
test('test login', async () => {});

// ✅ DO: Use page objects
await loginPage.login('Admin', 'admin123');

// ❌ DON'T: Use raw locators in tests
await page.fill('input[name="username"]', 'Admin');

// ✅ DO: Use fixtures for data
const employee = faker.generateEmployee();

// ❌ DON'T: Hardcode test data
const firstName = 'John';

// ✅ DO: Add meaningful logging
logger.info(`Adding employee: ${employee.firstName}`);

// ❌ DON'T: Use console.log
console.log('test');

// ✅ DO: Use explicit waits
await expect(page.locator('.success')).toBeVisible();

// ❌ DON'T: Use arbitrary timeouts
await page.waitForTimeout(5000);
```

### ✅ File Organization

```
✅ One page object per file
✅ One test file per feature/module
✅ Shared helpers in dedicated folder
✅ Types in separate types folder
✅ Fixtures exported from single file
```

---

## 📤 Submission Guidelines

### Step 1: Create Your Branch

```bash
git checkout -b trainee/your-name
```

### Step 2: Create Your Folder

```bash
mkdir tests/trainees/your-name
```

### Step 3: Implement Tests

Required files:
- [ ] `login.spec.ts` - All login test cases
- [ ] `logout.spec.ts` - All logout test cases
- [ ] `add-employee.spec.ts` - All employee test cases

### Step 4: Commit & Push

```bash
git add .
git commit -m "feat: add login, logout and employee tests - [YourName]"
git push origin trainee/your-name
```

### Step 5: Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Add description of changes
5. Request review from instructor

### Checklist Before Submission

| # | Item | Status |
|---|------|--------|
| 1 | All tests pass locally | ⬜ |
| 2 | Used Page Object Model | ⬜ |
| 3 | Used fixtures | ⬜ |
| 4 | Used Faker for test data | ⬜ |
| 5 | Added logging | ⬜ |
| 6 | Followed naming conventions | ⬜ |
| 7 | No hardcoded values | ⬜ |
| 8 | JSDoc comments added | ⬜ |
| 9 | Created personal config file | ⬜ |
| 10 | PR created with description | ⬜ |

---

## 🔮 Future Enhancements

### Phase 2: API Testing

```
📁 src/
└── 📁 api/
    ├── api-client.ts
    ├── endpoints/
    │   ├── auth-api.ts
    │   └── employee-api.ts
    └── models/
        └── api-response.types.ts
```

### Phase 3: Visual Testing

```bash
npm install @playwright/test @percy/playwright
```

### Phase 4: Performance Testing

```bash
npm install lighthouse
```

---

## 🆘 Getting Help

| Resource | Link |
|----------|------|
| 📚 Playwright Docs | https://playwright.dev/docs |
| 💬 GitHub Discussions | [Project Discussions] |
| 🐛 Report Issues | [GitHub Issues] |
| 📧 Instructor Email | janesh@example.com |

---

## 🏆 Good Luck!

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🎯 Focus on QUALITY over quantity                          ║
║   📝 Write CLEAN, readable code                               ║
║   🧪 Test THOROUGHLY - positive AND negative                  ║
║   🤝 ASK questions - no question is silly!                    ║
║   🎉 ENJOY the learning journey!                              ║
║                                                               ║
║   "Quality is not an act, it is a habit." - Aristotle        ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

**Created with 💜 for Playwright Training 2025**

*Last Updated: December 2024*

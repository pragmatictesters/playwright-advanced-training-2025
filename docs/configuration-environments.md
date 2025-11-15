# Managing Playwright Configurations Across Multiple Environments

## 📋 Table of Contents

1. [Overview](#overview)
2. [Approach 1: Multiple Configuration Files](#approach-1-multiple-configuration-files)
3. [Approach 2: Single Configuration with Projects](#approach-2-single-configuration-with-projects)
4. [Comparison: Pros and Cons](#comparison-pros-and-cons)
5. [Setup Instructions](#setup-instructions)
6. [CLI Usage Examples](#cli-usage-examples)
7. [Environment Variables](#environment-variables)
8. [Best Practices](#best-practices)
9. [Recommendation for Beginners](#recommendation-for-beginners)

---

## 🎯 Overview

When testing applications across multiple environments (development, staging, production), you need different configurations for each environment. This guide demonstrates **two approaches** to manage environment-specific configurations in Playwright.

### Why Multiple Environments?

- **Development**: Local testing with debugging tools, slower execution, visible browser
- **Staging**: Pre-production testing with production-like settings
- **Production**: Final validation with strict settings, multiple browsers

### Key Differences Between Environments

| Setting | Development | Staging | Production |
|---------|-------------|---------|------------|
| **Base URL** | localhost:3000 | staging.example.com | www.example.com |
| **Headless** | false (visible) | true | true |
| **Retries** | 0 (fail fast) | 1 | 2 |
| **Workers** | 1 (sequential) | 2 | 4 |
| **Timeout** | 60s (debugging) | 45s | 30s |
| **Screenshots** | Always | On failure | On failure |
| **Videos** | Always | On failure | On failure |
| **Browsers** | Chrome only | Chrome, Firefox, Safari | All browsers + mobile |

---

## 🗂️ Approach 1: Multiple Configuration Files

### Overview

Create **separate configuration files** for each environment:
- `configs/playwright.config.dev.ts`
- `configs/playwright.config.staging.ts`
- `configs/playwright.config.prod.ts`

### File Structure

```
your-project/
├── configs/
│   ├── playwright.config.dev.ts
│   ├── playwright.config.staging.ts
│   └── playwright.config.prod.ts
├── tests/
│   └── *.spec.ts
├── .env
├── .env.example
└── package.json
```

### Example: Development Config

```typescript
// configs/playwright.config.dev.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: '../tests',
  timeout: 60000,
  
  use: {
    baseURL: process.env.DEV_BASE_URL || 'http://localhost:3000',
    headless: false,
    screenshot: 'on',
    video: 'on',
    trace: 'on',
    
    extraHTTPHeaders: {
      'Authorization': process.env.DEV_AUTH_TOKEN 
        ? `Bearer ${process.env.DEV_AUTH_TOKEN}` 
        : '',
    },
  },
  
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
```

### Running Tests

```bash
# Development
npx playwright test --config=configs/playwright.config.dev.ts

# Staging
npx playwright test --config=configs/playwright.config.staging.ts

# Production
npx playwright test --config=configs/playwright.config.prod.ts
```

### Pros ✅

- **Clear separation** - Each environment has its own file
- **Easy to understand** - Beginners can see all settings in one place
- **Independent changes** - Modify one environment without affecting others
- **Simple to maintain** - No complex logic or conditionals
- **Easy to debug** - Clear which config is being used

### Cons ❌

- **Code duplication** - Similar settings repeated across files
- **Maintenance overhead** - Changes to common settings need updates in all files
- **More files** - More files to manage and keep in sync
- **Longer CLI commands** - Need to specify full config path

---

## 🎭 Approach 2: Single Configuration with Projects

### Overview

Create **one configuration file** with multiple projects, where each project represents an environment.

### File Structure

```
your-project/
├── configs/
│   └── playwright.config.unified.ts
├── tests/
│   └── *.spec.ts
├── .env
├── .env.example
└── package.json
```

### Example: Unified Config

```typescript
// configs/playwright.config.unified.ts
import { defineConfig, devices } from '@playwright/test';

function getEnvironmentConfig(env: 'dev' | 'staging' | 'prod') {
  const configs = {
    dev: {
      baseURL: process.env.DEV_BASE_URL || 'http://localhost:3000',
      headless: false,
      retries: 0,
    },
    staging: {
      baseURL: process.env.STAGING_BASE_URL || 'https://staging.example.com',
      headless: true,
      retries: 1,
    },
    prod: {
      baseURL: process.env.PROD_BASE_URL || 'https://www.example.com',
      headless: true,
      retries: 2,
    },
  };
  return configs[env];
}

export default defineConfig({
  testDir: '../tests',
  
  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: getEnvironmentConfig('dev').baseURL,
        headless: getEnvironmentConfig('dev').headless,
      },
    },
    {
      name: 'staging',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: getEnvironmentConfig('staging').baseURL,
        headless: getEnvironmentConfig('staging').headless,
      },
    },
    {
      name: 'prod',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: getEnvironmentConfig('prod').baseURL,
        headless: getEnvironmentConfig('prod').headless,
      },
    },
  ],
});
```

### Running Tests

```bash
# Development
npx playwright test --project=dev

# Staging
npx playwright test --project=staging

# Production
npx playwright test --project=prod
```

### Pros ✅

- **Single file** - All configurations in one place
- **DRY principle** - Shared logic can be reused
- **Shorter commands** - Just specify project name
- **Easier to compare** - See all environments side-by-side
- **Centralized management** - One file to maintain

### Cons ❌

- **More complex** - Requires understanding of projects and helper functions
- **Harder for beginners** - More abstract, less explicit
- **Potential confusion** - All environments mixed in one file
- **Debugging complexity** - Harder to trace which settings apply
- **File size** - Can become large with many environments

---

## ⚖️ Comparison: Pros and Cons

| Aspect | Multiple Files | Single File with Projects |
|--------|----------------|---------------------------|
| **Simplicity** | ✅ Very simple | ❌ More complex |
| **Beginner-Friendly** | ✅ Easy to understand | ❌ Requires more knowledge |
| **Code Duplication** | ❌ High duplication | ✅ Minimal duplication |
| **Maintenance** | ❌ Update multiple files | ✅ Update one file |
| **CLI Commands** | ❌ Longer commands | ✅ Shorter commands |
| **Clarity** | ✅ Very clear | ⚠️ Can be confusing |
| **Flexibility** | ✅ Independent configs | ⚠️ Shared logic |
| **File Count** | ❌ More files | ✅ Fewer files |
| **Debugging** | ✅ Easy to debug | ❌ Harder to debug |
| **Scalability** | ⚠️ Gets messy with many envs | ✅ Scales well |

---

## 🛠️ Setup Instructions

### Approach 1: Multiple Configuration Files

#### Step 1: Create Config Files

```bash
mkdir -p configs
```

Create three files:
- `configs/playwright.config.dev.ts`
- `configs/playwright.config.staging.ts`
- `configs/playwright.config.prod.ts`

See complete examples in the `configs/` folder.

#### Step 2: Create .env File

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials.

#### Step 3: Add npm Scripts

```json
{
  "scripts": {
    "test:dev": "playwright test --config=configs/playwright.config.dev.ts",
    "test:staging": "playwright test --config=configs/playwright.config.staging.ts",
    "test:prod": "playwright test --config=configs/playwright.config.prod.ts"
  }
}
```

#### Step 4: Run Tests

```bash
npm run test:dev
npm run test:staging
npm run test:prod
```

### Approach 2: Single Configuration with Projects

#### Step 1: Create Unified Config

```bash
mkdir -p configs
```

Create `configs/playwright.config.unified.ts` (see example in `configs/` folder).

#### Step 2: Create .env File

```bash
cp .env.example .env
```

Edit `.env` with your actual credentials.

#### Step 3: Add npm Scripts

```json
{
  "scripts": {
    "test:dev": "playwright test --config=configs/playwright.config.unified.ts --project=dev",
    "test:staging": "playwright test --config=configs/playwright.config.unified.ts --project=staging",
    "test:prod": "playwright test --config=configs/playwright.config.unified.ts --project=prod"
  }
}
```

#### Step 4: Run Tests

```bash
npm run test:dev
npm run test:staging
npm run test:prod
```

---

## 💻 CLI Usage Examples

### Approach 1: Multiple Configuration Files

```bash
# Run all tests in development
npx playwright test --config=configs/playwright.config.dev.ts

# Run specific test file in staging
npx playwright test tests/login.spec.ts --config=configs/playwright.config.staging.ts

# Run tests in headed mode (production)
npx playwright test --config=configs/playwright.config.prod.ts --headed

# Run tests with specific browser
npx playwright test --config=configs/playwright.config.dev.ts --project=chromium

# Debug mode
npx playwright test --config=configs/playwright.config.dev.ts --debug

# UI mode
npx playwright test --config=configs/playwright.config.staging.ts --ui

# Generate code
npx playwright codegen --config=configs/playwright.config.dev.ts
```

### Approach 2: Single Configuration with Projects

```bash
# Run all tests in development
npx playwright test --project=dev

# Run specific test file in staging
npx playwright test tests/login.spec.ts --project=staging

# Run tests in production
npx playwright test --project=prod

# Run multiple projects
npx playwright test --project=staging --project=prod

# Debug mode with specific project
npx playwright test --project=dev --debug

# UI mode with specific project
npx playwright test --project=staging --ui

# Run all projects (all environments)
npx playwright test
```

### Passing Environment Variables via CLI

```bash
# Override base URL
DEV_BASE_URL=http://localhost:4000 npx playwright test --config=configs/playwright.config.dev.ts

# Set multiple variables
DEV_BASE_URL=http://localhost:4000 DEV_AUTH_TOKEN=abc123 npx playwright test --project=dev

# Use in CI/CD
CI=true STAGING_BASE_URL=https://staging.example.com npx playwright test --project=staging
```

---

## 🔐 Environment Variables

### What Are Environment Variables?

Environment variables are **dynamic values** that can affect the behavior of running processes. In Playwright testing, they allow you to:
- Store sensitive credentials securely
- Configure different settings per environment
- Avoid hardcoding values in test code
- Share configurations across team members
- Integrate with CI/CD pipelines

### Why Use Environment Variables Instead of Hardcoding?

#### ❌ **Bad Practice: Hardcoding**

```typescript
// DON'T DO THIS!
export default defineConfig({
  use: {
    baseURL: 'https://staging.example.com',
    extraHTTPHeaders: {
      'Authorization': 'Bearer abc123token456',  // ⚠️ Security risk!
      'X-API-Key': 'my-secret-api-key',          // ⚠️ Exposed in Git!
    },
  },
});
```

**Problems**:
- 🚨 **Security Risk** - Credentials exposed in version control
- 🚨 **No Flexibility** - Can't change without code modification
- 🚨 **Team Issues** - Everyone uses same credentials
- 🚨 **CI/CD Problems** - Can't use different credentials per environment
- 🚨 **Audit Trail** - Credentials visible in Git history forever

#### ✅ **Good Practice: Environment Variables**

```typescript
// DO THIS!
export default defineConfig({
  use: {
    baseURL: process.env.STAGING_BASE_URL || 'https://staging.example.com',
    extraHTTPHeaders: {
      'Authorization': process.env.STAGING_AUTH_TOKEN
        ? `Bearer ${process.env.STAGING_AUTH_TOKEN}`
        : '',
      'X-API-Key': process.env.STAGING_API_KEY || '',
    },
  },
});
```

**Benefits**:
- ✅ **Secure** - Credentials not in version control
- ✅ **Flexible** - Easy to change per environment
- ✅ **Team-Friendly** - Each developer uses their own credentials
- ✅ **CI/CD Ready** - Use secrets management (GitHub Secrets, etc.)
- ✅ **Auditable** - No credentials in Git history

### How to Define Environment Variables

#### Method 1: .env File (Recommended for Local Development)

Create a `.env` file in your project root:

```bash
# .env
DEV_BASE_URL=http://localhost:3000
DEV_AUTH_TOKEN=my_dev_token_12345
DEV_API_KEY=my_dev_api_key_67890
```

**Important**: Add `.env` to `.gitignore`!

```bash
# .gitignore
.env
.env.local
.env.*.local
```

#### Method 2: System Environment Variables

**macOS/Linux:**
```bash
# Temporary (current session only)
export DEV_BASE_URL=http://localhost:3000
export DEV_AUTH_TOKEN=my_dev_token_12345

# Permanent (add to ~/.bashrc or ~/.zshrc)
echo 'export DEV_BASE_URL=http://localhost:3000' >> ~/.bashrc
source ~/.bashrc
```

**Windows (PowerShell):**
```powershell
# Temporary (current session only)
$env:DEV_BASE_URL="http://localhost:3000"
$env:DEV_AUTH_TOKEN="my_dev_token_12345"

# Permanent (System Properties > Environment Variables)
[System.Environment]::SetEnvironmentVariable('DEV_BASE_URL', 'http://localhost:3000', 'User')
```

#### Method 3: CLI (One-Time Use)

```bash
# Pass variables directly in command
DEV_BASE_URL=http://localhost:3000 DEV_AUTH_TOKEN=abc123 npx playwright test

# Multiple variables
DEV_BASE_URL=http://localhost:3000 \
DEV_AUTH_TOKEN=abc123 \
DEV_API_KEY=xyz789 \
npx playwright test --project=dev
```

#### Method 4: CI/CD Secrets (GitHub Actions Example)

```yaml
# .github/workflows/tests.yml
name: Playwright Tests

on: [push]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - name: Run tests
        env:
          STAGING_BASE_URL: ${{ secrets.STAGING_BASE_URL }}
          STAGING_AUTH_TOKEN: ${{ secrets.STAGING_AUTH_TOKEN }}
          STAGING_API_KEY: ${{ secrets.STAGING_API_KEY }}
        run: npm run test:staging
```

### How to Access Environment Variables

#### In Configuration Files

```typescript
// Access with process.env
const baseURL = process.env.DEV_BASE_URL;
const authToken = process.env.DEV_AUTH_TOKEN;

// With fallback/default value
const baseURL = process.env.DEV_BASE_URL || 'http://localhost:3000';

// In config
export default defineConfig({
  use: {
    baseURL: process.env.DEV_BASE_URL || 'http://localhost:3000',
    extraHTTPHeaders: {
      'Authorization': process.env.DEV_AUTH_TOKEN
        ? `Bearer ${process.env.DEV_AUTH_TOKEN}`
        : '',
    },
  },
});
```

#### In Test Files

```typescript
import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  // Access environment variables
  const apiKey = process.env.DEV_API_KEY;
  const username = process.env.DEV_TEST_USERNAME;

  // Use in test
  await page.goto('/');
  await page.fill('[name="username"]', username);
});
```

### Security Best Practices

#### 1. **Never Commit Credentials**

```bash
# .gitignore (ALWAYS include these!)
.env
.env.local
.env.*.local
*.env
.env.backup
```

#### 2. **Use Different Credentials Per Environment**

```bash
# Development - low-privilege test account
DEV_AUTH_TOKEN=dev_token_12345

# Staging - staging-specific credentials
STAGING_AUTH_TOKEN=staging_token_67890

# Production - read-only credentials only!
PROD_AUTH_TOKEN=prod_readonly_token_abcdef
```

#### 3. **Rotate Credentials Regularly**

- Change credentials every 90 days
- Immediately rotate if exposed
- Use temporary tokens when possible

#### 4. **Use Secrets Management in CI/CD**

- **GitHub**: GitHub Secrets
- **GitLab**: GitLab CI/CD Variables
- **Azure**: Azure Key Vault
- **AWS**: AWS Secrets Manager
- **Jenkins**: Jenkins Credentials

#### 5. **Implement Least Privilege**

- Use read-only credentials for production tests
- Limit API key permissions
- Use separate accounts for testing

#### 6. **Monitor and Audit**

- Log credential usage
- Monitor for unauthorized access
- Set up alerts for suspicious activity

### Example: Complete .env Setup

```bash
# .env.example (commit this to Git)
DEV_BASE_URL=http://localhost:3000
DEV_AUTH_TOKEN=your_dev_token_here
DEV_API_KEY=your_dev_api_key_here

# .env (DO NOT commit to Git!)
DEV_BASE_URL=http://localhost:3000
DEV_AUTH_TOKEN=actual_dev_token_abc123
DEV_API_KEY=actual_dev_api_key_xyz789
```

**Workflow**:
1. Commit `.env.example` with placeholder values
2. Each developer copies to `.env` and adds real credentials
3. `.env` is in `.gitignore` and never committed
4. CI/CD uses secrets management instead of `.env`

---

## 📚 Best Practices

### 1. **Choose the Right Approach**

**Use Multiple Files When**:
- ✅ Team is new to Playwright
- ✅ Environments are very different
- ✅ You want maximum clarity
- ✅ You have few environments (2-3)

**Use Single File with Projects When**:
- ✅ Team is experienced with Playwright
- ✅ Environments share many settings
- ✅ You want to reduce duplication
- ✅ You have many environments (4+)

### 2. **Naming Conventions**

```bash
# Environment variables: UPPERCASE with underscores
DEV_BASE_URL=http://localhost:3000
STAGING_API_KEY=abc123

# Config files: lowercase with dots
playwright.config.dev.ts
playwright.config.staging.ts

# Project names: lowercase
--project=dev
--project=staging
```

### 3. **Documentation**

- Document all environment variables in `.env.example`
- Add comments explaining each variable
- Include setup instructions in README
- Document which credentials are needed

### 4. **Testing**

```bash
# Test each environment configuration
npm run test:dev
npm run test:staging
npm run test:prod

# Verify environment variables are loaded
node -e "console.log(process.env.DEV_BASE_URL)"
```

### 5. **Version Control**

```bash
# .gitignore
.env
.env.local
.env.*.local
test-results/
playwright-report/
```

### 6. **CI/CD Integration**

```yaml
# Example: GitHub Actions
- name: Run Staging Tests
  env:
    STAGING_BASE_URL: ${{ secrets.STAGING_BASE_URL }}
    STAGING_AUTH_TOKEN: ${{ secrets.STAGING_AUTH_TOKEN }}
  run: npm run test:staging
```

---

## 🎓 Recommendation for Beginners

### **Recommended Approach: Multiple Configuration Files** ✅

For **Day 2 beginner-friendly training**, I recommend **Approach 1: Multiple Configuration Files**.

### Why?

#### ✅ **Simplicity**
- Each file is self-contained and easy to understand
- No need to understand Playwright's projects feature
- Clear separation between environments
- Easy to see all settings at a glance

#### ✅ **Learning Curve**
- Beginners can focus on configuration concepts
- No complex helper functions or abstractions
- Direct mapping: one file = one environment
- Easy to modify and experiment

#### ✅ **Debugging**
- Clear which config file is being used
- Easy to trace issues to specific file
- No confusion about which settings apply
- Simple to add console.log for debugging

#### ✅ **Progressive Learning**
- Start with one environment (dev)
- Add more environments as needed
- Can transition to unified approach later
- Builds foundation for advanced concepts

### Learning Path

**Week 1-2: Start Simple**
```bash
# Just use default config
npx playwright test
```

**Week 3-4: Add Development Config**
```bash
# Create configs/playwright.config.dev.ts
npx playwright test --config=configs/playwright.config.dev.ts
```

**Week 5-6: Add More Environments**
```bash
# Add staging and production configs
npm run test:staging
npm run test:prod
```

**Week 7+: Consider Unified Approach**
```bash
# Once comfortable, explore projects approach
npx playwright test --project=dev
```

### Sample Exercise for Students

**Exercise: Create Development Configuration**

1. Create `configs/playwright.config.dev.ts`
2. Set `baseURL` to `http://localhost:3000`
3. Set `headless: false` to see browser
4. Set `screenshot: 'on'` for debugging
5. Add `DEV_AUTH_TOKEN` environment variable
6. Run tests: `npx playwright test --config=configs/playwright.config.dev.ts`

**Success Criteria**:
- ✅ Tests run with visible browser
- ✅ Screenshots are captured
- ✅ Environment variable is loaded
- ✅ Tests pass successfully

---

## 🎯 Summary

### Key Takeaways

1. **Two Approaches**:
   - Multiple files: Simple, clear, beginner-friendly
   - Single file with projects: Advanced, DRY, scalable

2. **Environment Variables**:
   - Never hardcode credentials
   - Use `.env` for local development
   - Use secrets management in CI/CD
   - Always add `.env` to `.gitignore`

3. **Best Practices**:
   - Choose approach based on team experience
   - Document all variables in `.env.example`
   - Use different credentials per environment
   - Rotate credentials regularly

4. **For Beginners**:
   - Start with multiple configuration files
   - Focus on understanding one environment first
   - Progress to more environments gradually
   - Consider unified approach once comfortable

### Next Steps

1. ✅ Copy `.env.example` to `.env`
2. ✅ Add your credentials to `.env`
3. ✅ Choose your approach (multiple files recommended for beginners)
4. ✅ Create configuration files
5. ✅ Add npm scripts
6. ✅ Test each environment
7. ✅ Document your setup

---

## 📖 Additional Resources

- [Playwright Configuration Documentation](https://playwright.dev/docs/test-configuration)
- [Playwright Projects Documentation](https://playwright.dev/docs/test-projects)
- [Environment Variables Best Practices](https://12factor.net/config)
- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

---

**Happy Testing!** 🎭✨



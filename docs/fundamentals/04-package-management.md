# Package Management in Node.js & Playwright

Understanding package management is essential for working with Playwright and any Node.js project. This guide explains the key concepts, files, and commands you need to know.

---

## 📖 Table of Contents

1. [What is Package Management?](#what-is-package-management)
2. [The Three Key Components](#the-three-key-components)
3. [Understanding package.json](#understanding-packagejson)
4. [Understanding package-lock.json](#understanding-package-lockjson)
5. [Essential Commands](#essential-commands)
6. [npm Scripts](#npm-scripts)
7. [Playwright-Specific Package Management](#playwright-specific-package-management)
8. [Best Practices](#best-practices)
9. [Common Mistakes & Solutions](#common-mistakes--solutions)
10. [Quick Reference](#quick-reference)

---

## 🎯 What is Package Management?

**Package management** is how Node.js projects handle external code libraries (called "packages" or "dependencies").

### The Cooking Analogy 🍳

Think of building a Playwright project like cooking a meal:

| Cooking | Package Management |
|---------|-------------------|
| 📖 **Recipe** | `package.json` - Lists what you need |
| 📋 **Exact ingredients list** | `package-lock.json` - Exact versions |
| 🗄️ **Pantry** | `node_modules/` - Actual code libraries |
| 👨‍🍳 **Shopping** | `npm install` - Gets the ingredients |

**Why this matters:**
- ✅ Everyone on your team uses the same "ingredients" (versions)
- ✅ Your tests work the same way on all computers
- ✅ CI/CD pipelines produce consistent results
- ✅ You can easily share and reproduce your project

---

## 📦 The Three Key Components

### 1. **package.json** - The Recipe Book

**What it is:** A JSON file that declares your project's dependencies and metadata.

**What it contains:**
- Project name, version, description
- List of dependencies (with version ranges)
- npm scripts (shortcuts for commands)
- Project configuration

**Who edits it:**
- ✅ You (manually or via npm commands)
- ✅ npm (when you run `npm install <package>`)

**Commit to Git?** ✅ **YES - Always!**

---

### 2. **package-lock.json** - The Exact Recipe

**What it is:** An automatically generated file that locks exact versions of every dependency.

**What it contains:**
- Exact version numbers (no ranges)
- Complete dependency tree (including sub-dependencies)
- Integrity hashes for security
- Source URLs for packages

**Who edits it:**
- ❌ **NEVER edit manually!**
- ✅ npm automatically updates it

**Commit to Git?** ✅ **YES - Always!**

**Why it exists:** Solves the "dependency hell" problem (see below)

---

### 3. **node_modules/** - The Pantry

**What it is:** A folder containing all the actual code for your dependencies.

**What it contains:**
- Playwright code
- TypeScript definitions
- All sub-dependencies
- Browser binaries (for Playwright)

**Size:** Can be 100-500 MB or more!

**Commit to Git?** ❌ **NO - Never!** (Add to `.gitignore`)

**Why not commit?**
- Too large (hundreds of MB)
- Can be regenerated from package-lock.json
- Platform-specific (Windows vs Mac vs Linux)

---

## 📄 Understanding package.json

### Real Example from This Project

```json
{
  "name": "playwright-advanced-training-2025",
  "version": "1.0.0",
  "description": "Hands-on Playwright training",
  
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui"
  },
  
  "devDependencies": {
    "@playwright/test": "^1.56.1",
    "@types/node": "^24.10.0"
  }
}
```

### Key Sections Explained

#### **dependencies vs devDependencies**

```json
{
  "dependencies": {
    // Packages needed in production
    "express": "^4.18.0"
  },
  
  "devDependencies": {
    // Packages needed only for development/testing
    "@playwright/test": "^1.56.1",
    "@types/node": "^24.10.0"
  }
}
```

**For Playwright projects:** Use `devDependencies` (testing is development activity)

#### **Version Ranges Explained**

```json
{
  "devDependencies": {
    "@playwright/test": "^1.56.1"
    //                   ↑ What does this mean?
  }
}
```

| Symbol | Name | Meaning | Example |
|--------|------|---------|---------|
| `^` | **Caret** | Compatible with version | `^1.56.1` → allows `1.56.2`, `1.99.0` but NOT `2.0.0` |
| `~` | **Tilde** | Approximately equivalent | `~1.56.1` → allows `1.56.2` but NOT `1.57.0` |
| (none) | **Exact** | Exact version only | `1.56.1` → ONLY `1.56.1` |
| `*` | **Wildcard** | Any version | `*` → latest version (⚠️ dangerous!) |

**Recommendation:**
- ✅ Use `^` for most packages (allows bug fixes)
- ✅ Use exact versions for critical packages in production
- ❌ Avoid `*` (unpredictable)

---

## 🔒 Understanding package-lock.json

### The "Dependency Hell" Problem

**Scenario without package-lock.json:**

```
Day 1: You install Playwright
- package.json says: "@playwright/test": "^1.56.1"
- npm installs: 1.56.1
- Your tests work! ✅

Day 30: New team member joins
- package.json still says: "^1.56.1"
- npm installs: 1.58.0 (newer version released)
- Tests fail! ❌ (breaking change in 1.58.0)
```

**Solution with package-lock.json:**

```
Day 1: You install Playwright
- package.json says: "^1.56.1"
- package-lock.json records: EXACTLY 1.56.1
- Your tests work! ✅

Day 30: New team member joins
- Runs: npm ci (uses package-lock.json)
- npm installs: EXACTLY 1.56.1
- Tests work! ✅ (same version as you)
```

### Why You MUST Commit package-lock.json

✅ **DO commit package-lock.json because:**
- Ensures everyone uses exact same versions
- Makes builds reproducible
- Prevents "works on my machine" problems
- Required for `npm ci` (CI/CD)
- Includes security integrity hashes

❌ **DON'T delete package-lock.json because:**
- You'll lose version consistency
- CI/CD builds may fail
- Team members get different versions
- Harder to debug version-related issues

---

## 🚀 Essential Commands

### npm install vs npm ci

This is the **most important** distinction to understand:

| Command | When to Use | Speed | Behavior |
|---------|-------------|-------|----------|
| `npm install` | Adding new packages | Slower | Updates package-lock.json |
| `npm install <package>` | Installing specific package | Medium | Adds to package.json |
| `npm ci` | CI/CD, fresh clones | **Faster** | Requires existing package-lock.json |

### Decision Tree: Which Command?

```
Are you adding a NEW package?
├─ YES → npm install <package-name>
└─ NO → Continue...

Are you in CI/CD pipeline?
├─ YES → npm ci
└─ NO → Continue...

Did you just clone the repo?
├─ YES → npm ci
└─ NO → Continue...

Is something broken?
├─ YES → Delete node_modules, run npm ci
└─ NO → npm ci (safest choice)
```

### Common Commands

```bash
# Install all dependencies (first time setup)
npm install

# Install all dependencies (CI/CD, fresh clone)
npm ci

# Add a new package
npm install <package-name>
npm install -D <package-name>  # Add to devDependencies

# Remove a package
npm uninstall <package-name>

# Update packages (within version ranges)
npm update

# Check for outdated packages
npm outdated

# Security audit
npm audit
npm audit fix

# Clean install (when things break)
rm -rf node_modules package-lock.json
npm install
```

---

## ⚡ npm Scripts

### What Are npm Scripts?

**npm scripts** are shortcuts defined in `package.json` that let you run commands easily.

**Example:**
```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui"
  }
}
```

**Usage:**
```bash
npm test              # Shorthand for "test" script
npm run test:ui       # Run custom script
```

### Why Use Scripts?

✅ **Consistency** - Everyone runs the same commands
✅ **Simplicity** - `npm test` vs `npx playwright test --reporter=html,json --retries=2`
✅ **Documentation** - Scripts show what commands are available
✅ **CI/CD** - Easy to reference in pipelines

### Essential Playwright Scripts

Here are the **core scripts** every Playwright project should have:

```json
{
  "scripts": {
    // Core testing
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:debug": "playwright test --debug",
    
    // Reports
    "report": "playwright show-report",
    
    // Setup
    "playwright:install": "playwright install"
  }
}
```

### Creating Your Own Scripts

**Pattern:**
```json
{
  "scripts": {
    "script-name": "command to run"
  }
}
```

**Examples:**
```json
{
  "scripts": {
    // Run specific test file
    "test:login": "playwright test tests/login.spec.ts",
    
    // Run with specific browser
    "test:chrome": "playwright test --project=chromium",
    
    // Chain commands (run test, then show report)
    "test:full": "playwright test && playwright show-report",
    
    // CI/CD optimized
    "test:ci": "playwright test --reporter=html,json"
  }
}
```

### Script Naming Conventions

**Recommended patterns:**

| Pattern | Example | Purpose |
|---------|---------|---------|
| `test:*` | `test:smoke` | Test execution variants |
| `playwright:*` | `playwright:install` | Playwright-specific |
| `ci:*` | `ci:test` | CI/CD specific |

### Special Script Names

Some scripts have shortcuts:

| Script | Shortcut | Full Command |
|--------|----------|--------------|
| `test` | `npm test` | `npm run test` |
| `start` | `npm start` | `npm run start` |

---

## 🎭 Playwright-Specific Package Management

### Browser Binaries

When you install Playwright, it downloads browser binaries:

| Browser | Size | Location (macOS) |
|---------|------|------------------|
| Chromium | ~170 MB | `~/Library/Caches/ms-playwright` |
| Firefox | ~80 MB | `~/Library/Caches/ms-playwright` |
| WebKit | ~60 MB | `~/Library/Caches/ms-playwright` |

**Important:** Browser binaries are stored **outside** `node_modules/`

### Essential Playwright Commands

```bash
# Install all browsers
npx playwright install

# Install specific browser
npx playwright install chromium

# Install system dependencies (Linux only)
npx playwright install-deps

# Install browser + dependencies (Linux)
npx playwright install --with-deps chromium

# Check Playwright version
npx playwright --version
```

### Updating Playwright

```bash
# Update to latest version
npm install -D @playwright/test@latest

# IMPORTANT: Always install browsers after updating
npx playwright install

# Or create a script:
# "playwright:update": "npm install -D @playwright/test@latest && playwright install"
```

### Playwright Dependencies

Typical Playwright project dependencies:

```json
{
  "devDependencies": {
    "@playwright/test": "^1.56.1",    // Playwright test runner
    "@types/node": "^24.10.0"         // TypeScript types for Node.js
  }
}
```

**Optional additions:**
```json
{
  "devDependencies": {
    "dotenv": "^16.0.0",              // Environment variables
    "allure-playwright": "^2.0.0"     // Allure reporting
  }
}
```

---

## ✅ Best Practices

### For Development

✅ **Always commit** `package.json` and `package-lock.json`
✅ **Never commit** `node_modules/` (add to `.gitignore`)
✅ **Use `npm ci`** for fresh clones
✅ **Run `npm audit`** regularly for security
✅ **Keep dependencies updated** (but test after updating!)

### For CI/CD

✅ **Use `npm ci`** instead of `npm install` (faster, more reliable)
✅ **Cache `node_modules/`** between builds (speeds up CI)
✅ **Pin Playwright version** in production (exact version, no `^`)
✅ **Run `npm audit`** in CI pipeline
✅ **Install only needed browsers** (`npx playwright install chromium`)

### For Production

✅ **Pin critical dependencies** (use exact versions)
✅ **Test before updating** dependencies
✅ **Use `npm ci`** for deployments
✅ **Run security audits** regularly
✅ **Document required Node.js version** in README

### Version Management

```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

This documents required Node.js/npm versions.

---

## ❌ Common Mistakes & Solutions

### Mistake 1: Deleting package-lock.json

**❌ Problem:**
```bash
# DON'T DO THIS!
rm package-lock.json
```

**Why it's bad:**
- Loses version consistency
- Team members get different versions
- "Works on my machine" problems
- CI/CD may fail

**✅ Solution:**
Keep package-lock.json and commit it to Git!

---

### Mistake 2: Manually Editing package.json

**❌ Problem:**
```json
{
  "devDependencies": {
    "@playwright/test": "^1.56.1"  // Manually typed
  }
}
```
Then running `npm install` and wondering why it doesn't work.

**✅ Solution:**
```bash
# Let npm manage package.json
npm install -D @playwright/test
```

---

### Mistake 3: Using npm install in CI/CD

**❌ Problem:**
```yaml
# In CI/CD pipeline
- run: npm install  # Slow and unreliable
```

**✅ Solution:**
```yaml
# In CI/CD pipeline
- run: npm ci  # Fast and reliable
```

**Why `npm ci` is better:**
- Faster (skips some checks)
- Fails if package-lock.json is out of sync
- Deletes node_modules first (clean install)
- More reliable for CI/CD

---

### Mistake 4: Mixing Package Managers

**❌ Problem:**
```bash
npm install          # Creates package-lock.json
yarn install         # Creates yarn.lock
pnpm install         # Creates pnpm-lock.yaml
```

Now you have multiple lock files and confusion!

**✅ Solution:**
Pick ONE package manager and stick with it:
- **npm** (default, most common)
- **yarn** (faster, some prefer it)
- **pnpm** (most efficient disk usage)

For this training, we use **npm**.

---

### Mistake 5: Not Installing Browsers After Playwright Update

**❌ Problem:**
```bash
npm install -D @playwright/test@latest
npx playwright test
# Error: Executable doesn't exist!
```

**✅ Solution:**
```bash
npm install -D @playwright/test@latest
npx playwright install  # ← Don't forget this!
```

---

### Mistake 6: Committing node_modules/

**❌ Problem:**
```bash
git add .
git commit -m "Added tests"
# Commits 500 MB of node_modules!
```

**✅ Solution:**
Add to `.gitignore`:
```
node_modules/
```

---

## 🔧 Troubleshooting

### "Cannot find module '@playwright/test'"

**Problem:** Playwright not installed

**Solution:**
```bash
npm install
# or
npm ci
```

---

### "Executable doesn't exist" Error

**Problem:** Browser binaries not installed

**Solution:**
```bash
npx playwright install
```

---

### Tests Work Locally, Fail in CI

**Problem:** Different versions installed

**Solution:**
1. Ensure `package-lock.json` is committed
2. Use `npm ci` in CI/CD (not `npm install`)
3. Check Node.js version matches

---

### "ENOENT: no such file or directory"

**Problem:** Corrupted node_modules

**Solution:**
```bash
# Nuclear option - clean reinstall
rm -rf node_modules package-lock.json
npm install
npx playwright install
```

---

### Version Conflicts

**Problem:** Package version conflicts

**Solution:**
```bash
# Check for issues
npm outdated

# Update within version ranges
npm update

# Or update specific package
npm install -D @playwright/test@latest
```

---

## 📚 Quick Reference

### Command Cheat Sheet

| Task | Command |
|------|---------|
| **First time setup** | `npm install && npx playwright install` |
| **Fresh clone** | `npm ci && npx playwright install` |
| **Add package** | `npm install -D <package>` |
| **Remove package** | `npm uninstall <package>` |
| **Update packages** | `npm update` |
| **Check outdated** | `npm outdated` |
| **Security audit** | `npm audit` |
| **Run tests** | `npm test` |
| **Clean reinstall** | `rm -rf node_modules && npm ci` |

### Files to Commit

| File | Commit? | Why |
|------|---------|-----|
| `package.json` | ✅ YES | Declares dependencies |
| `package-lock.json` | ✅ YES | Locks exact versions |
| `node_modules/` | ❌ NO | Too large, regenerable |
| `.gitignore` | ✅ YES | Tells Git what to ignore |

### Decision: npm install vs npm ci

```
Adding new package? → npm install <package>
CI/CD pipeline? → npm ci
Fresh clone? → npm ci
Something broken? → rm -rf node_modules && npm ci
Default choice? → npm ci
```

---

## 🔗 External Resources

### Official Documentation

- **[npm Scripts](https://docs.npmjs.com/cli/v10/using-npm/scripts)** - Official npm scripts guide
- **[package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)** - Complete package.json reference
- **[npm CLI Commands](https://docs.npmjs.com/cli/v10/commands)** - All npm commands
- **[Playwright Installation](https://playwright.dev/docs/intro)** - Official Playwright setup
- **[Playwright CI/CD](https://playwright.dev/docs/ci)** - CI/CD integration guides

### Further Reading

- **[Semantic Versioning](https://semver.org/)** - Understanding version numbers
- **[npm vs Yarn vs pnpm](https://2023.stateofjs.com/en-US/libraries/package-managers/)** - Package manager comparison
- **[Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)** - Comprehensive Node.js guide

---

## 🎯 Key Takeaways

1. ✅ **package.json** = Recipe (what you need)
2. ✅ **package-lock.json** = Exact recipe (specific versions)
3. ✅ **node_modules/** = Pantry (actual code)
4. ✅ **Always commit** package.json and package-lock.json
5. ✅ **Never commit** node_modules/
6. ✅ **Use `npm ci`** for CI/CD and fresh clones
7. ✅ **Use `npm install <package>`** to add packages
8. ✅ **Run `npx playwright install`** after updating Playwright
9. ✅ **Create npm scripts** for common commands
10. ✅ **Keep dependencies updated** but test after updates

---

## 🚀 Next Steps

Now that you understand package management:

1. ✅ Review your project's `package.json`
2. ✅ Verify `package-lock.json` is committed
3. ✅ Add useful npm scripts
4. ✅ Run `npm audit` to check security
5. ✅ Continue to [Writing Your First Test](../../tests/01-first-test.spec.ts)

---

**Happy Testing! 🎭**


# Quick Start Guide

![Difficulty: Intermediate](https://img.shields.io/badge/Difficulty-Intermediate-yellow)
![Time: 5-10 min](https://img.shields.io/badge/Time-5--10%20min-blue)

Get Playwright up and running in minutes.

## Prerequisites

- **Node.js 18+** installed ([download](https://nodejs.org))
- Terminal/Command line access

Verify Node.js installation:
```bash
node --version
npm --version
```

---

## Installation

Choose your preferred package manager:

### Using npm (recommended)
```bash
npm init playwright@latest
```

### Using yarn
```bash
yarn create playwright
```

### Using pnpm
```bash
pnpm create playwright
```

### Installation Prompts

The installer will ask:
- **Where to put tests?** → Press Enter (default: `tests`)
- **Add GitHub Actions workflow?** → Choose based on your needs
- **Install Playwright browsers?** → Yes (recommended)

---

## Verify Installation

### Run example tests
```bash
npx playwright test
```

### View HTML report
```bash
npx playwright show-report
```

### Open UI Mode (interactive)
```bash
npx playwright test --ui
```

### Run tests in headed mode (see browser)
```bash
npx playwright test --headed
```

---

## Project Structure

After installation, you'll have:

```
your-project/
├── tests/
│   └── example.spec.ts          # Example test file
├── playwright.config.ts         # Configuration file
├── package.json                 # Dependencies
└── node_modules/                # Installed packages
```

---

## Essential Commands

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test tests/example.spec.ts

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests in debug mode
npx playwright test --debug

# Generate tests with Codegen
npx playwright codegen

# Open last HTML report
npx playwright show-report
```

---

## What's Installed?

- **@playwright/test** - Test runner and assertions
- **Browsers** - Chromium, Firefox, WebKit (bundled)
- **Configuration** - Pre-configured for cross-browser testing
- **Example tests** - Ready to run and modify

---

## Next Steps

✅ **Installation complete!** Now you can:

1. **Explore example tests** in the `tests/` folder
2. **Modify `playwright.config.ts`** for your needs
3. **Write your first test** - see [Playwright docs](https://playwright.dev/docs/writing-tests)
4. **Learn more** - check out the [Complete Installation Guide](02-complete-guide.md)

---

## Troubleshooting

Having issues? Check the **[Troubleshooting Guide](04-troubleshooting.md)** for detailed solutions to common problems:

- [Node.js Issues](04-troubleshooting.md#nodejs-issues)
- [Installation Errors](04-troubleshooting.md#installation-errors)
- [Browser Issues](04-troubleshooting.md#browser-issues)
- [Permission Issues](04-troubleshooting.md#permission-issues) (including macOS permissions)
- [Network & Proxy Issues](04-troubleshooting.md#network--proxy-issues)
- [Platform-Specific Issues](04-troubleshooting.md#platform-specific-issues)

---

## 📍 Navigation

- [← Back to Installation Docs](README.md)
- [Complete Guide](02-complete-guide.md) | [Advanced Topics](03-advanced-topics.md) | [Troubleshooting](04-troubleshooting.md)


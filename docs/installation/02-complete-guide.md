# Complete Installation Guide

![Difficulty: Beginner](https://img.shields.io/badge/Difficulty-Beginner-green)
![Time: 30-45 min](https://img.shields.io/badge/Time-30--45%20min-blue)

A comprehensive step-by-step guide to installing Playwright from scratch.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites & System Requirements](#prerequisites--system-requirements)
- [Step 1: Installing Node.js](#step-1-installing-nodejs)
- [Step 2: Understanding Package Managers](#step-2-understanding-package-managers)
- [Step 3: Setting Up VS Code](#step-3-setting-up-vs-code)
- [Step 4: Creating Your Project](#step-4-creating-your-project)
- [Step 5: Installing Playwright](#step-5-installing-playwright)
- [Step 6: Running Your First Test](#step-6-running-your-first-test)
- [Next Steps](#next-steps)
- [Quick Reference](#quick-reference)

---

## Introduction

### What is Playwright?

Playwright is a modern end-to-end testing framework that allows you to:
- Test web applications across **Chromium, Firefox, and WebKit**
- Write tests in **JavaScript, TypeScript, Python, Java, or .NET**
- Run tests in **headless or headed mode**
- Generate tests automatically with **Codegen**
- Debug with **UI Mode and Inspector**

### Why Playwright?

- ✅ **Cross-browser** - Test on all major browsers
- ✅ **Auto-wait** - No manual waits needed
- ✅ **Fast execution** - Parallel test execution
- ✅ **Powerful tooling** - Inspector, trace viewer, codegen
- ✅ **Modern architecture** - Built for modern web apps

---

## Prerequisites & System Requirements

### Operating Systems
- **Windows**: 10 or higher
- **macOS**: 10.15 (Catalina) or higher
- **Linux**: Ubuntu 20.04+, Debian 11+, Fedora, etc.

### Hardware
- **RAM**: Minimum 4GB (8GB+ recommended)
- **Disk Space**: ~2GB for browsers and dependencies
- **Internet**: Required for downloading Node.js and browsers

### Required Software
- ✅ Node.js 18 or higher
- ✅ Code editor (VS Code recommended)
- ✅ Terminal/Command line access

---

## Step 1: Installing Node.js

### What is Node.js?

Node.js is a JavaScript runtime that allows you to run JavaScript outside the browser. Playwright requires Node.js to run tests.

### Download and Install

1. **Visit** [nodejs.org](https://nodejs.org)
2. **Download** the LTS (Long Term Support) version
3. **Run** the installer and follow the prompts
4. **Accept** default settings (includes npm)

### Platform-Specific Instructions

#### Windows
- Download the `.msi` installer
- Run as administrator if needed
- Restart terminal after installation

#### macOS
- Download the `.pkg` installer
- Or use Homebrew: `brew install node`

#### Linux
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Fedora
sudo dnf install nodejs
```

### Verify Installation

Open a terminal and run:

```bash
node --version
# Should show: v18.x.x or higher

npm --version
# Should show: 9.x.x or higher
```

✅ If you see version numbers, Node.js is installed correctly!

💡 **Tip**: If commands aren't recognized, restart your terminal or computer.

---

## Step 2: Understanding Package Managers

### What is a Package Manager?

A package manager helps you install, update, and manage software libraries (packages) in your project. Think of it like an app store for code.

### Available Package Managers

#### npm (Node Package Manager)
- **Comes with Node.js** - Already installed!
- **Most widely used** - Default choice
- **Command**: `npm install <package>`

#### yarn
- **Faster** than npm in some cases
- **Better for monorepos**
- **Install**: `npm install -g yarn`
- **Command**: `yarn add <package>`

#### pnpm
- **Most disk-efficient** - Saves space
- **Fast** - Uses hard links
- **Install**: `npm install -g pnpm`
- **Command**: `pnpm add <package>`

### Quick Comparison

| Feature | npm | yarn | pnpm |
|---------|-----|------|------|
| Speed | Good | Fast | Fastest |
| Disk Usage | High | High | Low |
| Comes with Node | ✅ | ❌ | ❌ |
| Monorepo Support | Good | Excellent | Excellent |

### Installing yarn or pnpm (Optional)

```bash
# Install yarn
npm install -g yarn

# Install pnpm
npm install -g pnpm

# Verify
yarn --version
pnpm --version
```

💡 **For beginners**: Stick with **npm** - it's already installed and works great!

---

## Step 3: Setting Up VS Code

### Why VS Code?

Visual Studio Code (VS Code) is a free, powerful code editor with:
- **Integrated terminal** - Run commands without leaving the editor
- **Playwright extension** - Run and debug tests visually
- **IntelliSense** - Auto-completion for code
- **Git integration** - Version control built-in

### Download and Install

1. **Visit** [code.visualstudio.com](https://code.visualstudio.com)
2. **Download** for your operating system
3. **Install** and launch VS Code

### Opening the Terminal

- **Windows/Linux**: `` Ctrl + ` `` (backtick)
- **macOS**: `` Cmd + ` ``
- **Or**: Menu → Terminal → New Terminal

### Installing Playwright Extension

1. Click **Extensions** icon (left sidebar) or press `Ctrl+Shift+X` / `Cmd+Shift+X`
2. Search for **"Playwright Test for VSCode"**
3. Click **Install** on the official Microsoft extension
4. Reload VS Code if prompted

### Extension Features

- ✅ Run tests from the editor
- ✅ Debug with breakpoints
- ✅ View test results inline
- ✅ Record tests with Codegen
- ✅ Pick locators visually

💡 **Tip**: Other useful extensions: ESLint, Prettier, GitLens

---

## Step 4: Creating Your Project

### Option A: Create a New Folder

#### Using File Explorer/Finder
1. Navigate to where you want your project
2. Create a new folder (e.g., `my-playwright-tests`)
3. Right-click → Open with VS Code

#### Using Terminal
```bash
# Create folder
mkdir my-playwright-tests

# Navigate into it
cd my-playwright-tests

# Open in VS Code
code .
```

### Option B: Clone from GitHub

#### What is Git/GitHub?
- **Git**: Version control system (tracks code changes)
- **GitHub**: Online platform for hosting Git repositories

#### Installing Git
- **Windows**: [git-scm.com](https://git-scm.com)
- **macOS**: `brew install git` or comes with Xcode
- **Linux**: `sudo apt install git` or `sudo dnf install git`

#### Clone a Repository
```bash
# Clone this training repository
git clone https://github.com/your-username/playwright-advanced-training-2025.git

# Navigate into it
cd playwright-advanced-training-2025

# Open in VS Code
code .
```

---

## Step 5: Installing Playwright

### Method 1: Interactive Installation (Recommended)

This method guides you through setup with prompts.

#### Using npm
```bash
npm init playwright@latest
```

#### Using yarn
```bash
yarn create playwright
```

#### Using pnpm
```bash
pnpm create playwright
```

### Understanding the Prompts

The installer will ask several questions:

#### 1. "Where to put your end-to-end tests?"
```
Default: tests
```
- Press **Enter** to accept default
- Or type a custom folder name (e.g., `e2e`, `specs`)

#### 2. "Add a GitHub Actions workflow?"
```
Options: Yes / No
```
- **Yes**: Adds CI/CD configuration for GitHub
- **No**: Skip if not using GitHub Actions

#### 3. "Install Playwright browsers?"
```
Options: Yes / No
```
- **Yes** (recommended): Downloads Chromium, Firefox, WebKit
- **No**: You'll need to run `npx playwright install` later

### Method 2: Manual Installation

For more control over the process:

```bash
# 1. Initialize package.json (if not exists)
npm init -y

# 2. Install Playwright
npm install --save-dev @playwright/test

# 3. Install browsers
npx playwright install

# 4. Install system dependencies (Linux only)
npx playwright install-deps
```

### What Gets Installed?

After installation, your project will have:

```
your-project/
├── node_modules/              # Dependencies (auto-generated)
├── tests/                     # Test files
│   └── example.spec.ts        # Example test
├── tests-examples/            # More examples
│   └── demo-todo-app.spec.ts
├── playwright.config.ts       # Configuration
├── package.json               # Project metadata
└── package-lock.json          # Dependency lock file
```

### Understanding Key Files

#### `playwright.config.ts`
Main configuration file where you set:
- Which browsers to test
- Base URL for your app
- Timeout settings
- Reporter options
- Screenshot/video settings

#### `package.json`
Lists your project dependencies and scripts:
```json
{
  "devDependencies": {
    "@playwright/test": "^1.40.0"
  }
}
```

#### `tests/example.spec.ts`
Example test file you can run and modify.

---

## Step 6: Running Your First Test

### Run All Tests

```bash
npx playwright test
```

Output shows:
- ✅ Passed tests
- ❌ Failed tests  
- ⏱️ Execution time
- 📊 Test summary

### View HTML Report

```bash
npx playwright show-report
```

Opens an interactive report in your browser showing:
- Test results
- Screenshots
- Error messages
- Execution timeline

### Run Tests in UI Mode

```bash
npx playwright test --ui
```

UI Mode provides:
- 🎬 Watch tests run in real-time
- 🔍 Inspect each step
- ⏯️ Pause and resume
- 🐛 Debug failures

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

See the actual browser window during test execution.

### Run Specific Test File

```bash
npx playwright test tests/example.spec.ts
```

### Run Tests in Specific Browser

```bash
# Chromium only
npx playwright test --project=chromium

# Firefox only
npx playwright test --project=firefox

# WebKit only
npx playwright test --project=webkit
```

### Using VS Code Extension

1. Open Test Explorer (beaker icon in sidebar)
2. See all your tests listed
3. Click ▶️ to run individual tests
4. Click 🐛 to debug with breakpoints

---

## Troubleshooting

Having issues during installation? We have a comprehensive troubleshooting guide!

👉 **[View Troubleshooting Guide](04-troubleshooting.md)**

Common issues covered:
- ❌ [Command not found errors](04-troubleshooting.md#nodejs-issues)
- ❌ [Installation failures](04-troubleshooting.md#installation-errors)
- ❌ [Browser download problems](04-troubleshooting.md#browser-issues)
- ❌ [Permission errors](04-troubleshooting.md#permission-issues) (including macOS browser permissions)
- ❌ [Network and proxy issues](04-troubleshooting.md#network--proxy-issues)
- ❌ [Platform-specific problems](04-troubleshooting.md#platform-specific-issues)

---

## Next Steps

🎉 **Congratulations!** You've successfully installed Playwright.

### Continue Learning

1. **Write your first test** - [Playwright Writing Tests](https://playwright.dev/docs/writing-tests)
2. **Learn selectors** - [Playwright Selectors](https://playwright.dev/docs/selectors)
3. **Explore assertions** - [Playwright Assertions](https://playwright.dev/docs/test-assertions)
4. **Use Codegen** - Generate tests automatically: `npx playwright codegen`

### Explore Advanced Topics

Ready for more? Check out the [Advanced Topics Guide](03-advanced-topics.md) for:
- Docker and CI/CD integration
- Performance optimization
- Enterprise setups
- Production best practices

---

## Quick Reference

### Essential Commands
```bash
npx playwright test                    # Run all tests
npx playwright test --ui               # UI mode
npx playwright test --headed           # See browser
npx playwright test --debug            # Debug mode
npx playwright codegen                 # Generate tests
npx playwright show-report             # View report
npx playwright --version               # Check version
```

### Useful Links
- 📖 [Official Documentation](https://playwright.dev)
- 💬 [Discord Community](https://aka.ms/playwright/discord)
- 🐛 [GitHub Issues](https://github.com/microsoft/playwright/issues)
- 📺 [YouTube Channel](https://www.youtube.com/@Playwrightdev)

---

## 📍 Navigation

- [← Back to Installation Docs](README.md)
- [Quick Start](01-quick-start.md) | [Advanced Topics](03-advanced-topics.md) | [Troubleshooting](04-troubleshooting.md)


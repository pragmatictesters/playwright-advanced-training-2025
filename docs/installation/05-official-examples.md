# Official Playwright Examples

## Overview

Starting with Playwright v1.56+, the `tests-examples/` folder is no longer created during installation. Instead, the Playwright team maintains official example repositories that demonstrate various testing patterns and best practices.

## Official Examples Repository

### Microsoft Playwright Examples
**Repository**: [https://github.com/microsoft/playwright/tree/main/examples](https://github.com/microsoft/playwright/tree/main/examples)

This repository contains official examples maintained by the Playwright team:

#### 1. **TodoMVC Example**
- **Location**: [examples/todomvc](https://github.com/microsoft/playwright/tree/main/examples/todomvc)
- **Description**: Comprehensive todo application testing examples
- **Test URL**: https://demo.playwright.dev/todomvc
- **Covers**:
  - Basic interactions (add, complete, delete todos)
  - Filtering and navigation
  - Persistence testing
  - Page Object Model patterns

#### 2. **GitHub API Example**
- **Location**: [examples/github-api](https://github.com/microsoft/playwright/tree/main/examples/github-api)
- **Description**: API testing examples using GitHub's API
- **Covers**:
  - REST API testing
  - Authentication with APIs
  - Request/response validation
  - API fixtures

#### 3. **Mock Battery Example**
- **Location**: [examples/mock-battery](https://github.com/microsoft/playwright/tree/main/examples/mock-battery)
- **Description**: Browser API mocking examples
- **Covers**:
  - Mocking browser APIs
  - Testing battery status features
  - Device emulation

#### 4. **Mock Filesystem Example**
- **Location**: [examples/mock-filesystem](https://github.com/microsoft/playwright/tree/main/examples/mock-filesystem)
- **Description**: Filesystem API mocking
- **Covers**:
  - File upload testing
  - Filesystem API mocking
  - File handling scenarios

#### 5. **SVGOMG Example**
- **Location**: [examples/svgomg](https://github.com/microsoft/playwright/tree/main/examples/svgomg)
- **Description**: SVG optimization tool testing
- **Covers**:
  - Complex UI interactions
  - File processing
  - Real-world application testing

## Community Examples

### Playwright Movies App (Recommended)
**Repository**: [https://github.com/debs-obrien/playwright-movies-app](https://github.com/debs-obrien/playwright-movies-app)

Created by Debbie O'Brien (Playwright Developer Advocate), this is an excellent comprehensive example for learning Playwright.

**Features**:
- Authentication testing
- Search functionality
- Sorting and filtering
- API testing and mocking
- ARIA snapshots
- Visual regression testing
- Built with Next.js and React

**Live Demo**: [https://debs-obrien.github.io/playwright-movies-app/](https://debs-obrien.github.io/playwright-movies-app/)

## How to Use These Examples

### Option 1: Clone and Explore
```bash
# Clone the entire Playwright repository
git clone https://github.com/microsoft/playwright.git
cd playwright/examples/todomvc

# Install dependencies
npm install

# Run the tests
npx playwright test
```

### Option 2: Clone Specific Example
```bash
# Clone just the Movies App example
git clone https://github.com/debs-obrien/playwright-movies-app.git
cd playwright-movies-app

# Install dependencies
npm install

# Run tests in UI mode
npx playwright test --ui
```

### Option 3: Browse Online
Simply visit the GitHub links above to browse the code online without cloning.

## Why the Change?

The Playwright team intentionally removed the `tests-examples/` folder from the default installation to:
- Simplify the initial setup for beginners
- Reduce clutter in new projects
- Provide more comprehensive, maintained examples in dedicated repositories
- Allow examples to evolve independently from the core installation

**Reference**: [GitHub Issue #37808](https://github.com/microsoft/playwright/issues/37808)

## Additional Resources

### Official Documentation
- **Playwright Docs**: [https://playwright.dev](https://playwright.dev)
- **Getting Started**: [https://playwright.dev/docs/intro](https://playwright.dev/docs/intro)
- **Best Practices**: [https://playwright.dev/docs/best-practices](https://playwright.dev/docs/best-practices)

### Learning Resources
- **Playwright YouTube Channel**: [https://www.youtube.com/@Playwrightdev](https://www.youtube.com/@Playwrightdev)
- **Playwright Discord**: [https://aka.ms/playwright/discord](https://aka.ms/playwright/discord)
- **Playwright Blog**: [https://playwright.dev/community/blog](https://playwright.dev/community/blog)

## Quick Reference

| Example | Focus Area | Difficulty | Link |
|---------|-----------|------------|------|
| TodoMVC | Basic UI Testing | Beginner | [View](https://github.com/microsoft/playwright/tree/main/examples/todomvc) |
| GitHub API | API Testing | Intermediate | [View](https://github.com/microsoft/playwright/tree/main/examples/github-api) |
| Mock Battery | Browser APIs | Intermediate | [View](https://github.com/microsoft/playwright/tree/main/examples/mock-battery) |
| Mock Filesystem | File Handling | Intermediate | [View](https://github.com/microsoft/playwright/tree/main/examples/mock-filesystem) |
| SVGOMG | Complex UI | Advanced | [View](https://github.com/microsoft/playwright/tree/main/examples/svgomg) |
| Movies App | Full Application | All Levels | [View](https://github.com/debs-obrien/playwright-movies-app) |

---

**Next Steps**: Choose an example that matches your learning goals and explore the code. All examples include comprehensive tests that demonstrate Playwright best practices.


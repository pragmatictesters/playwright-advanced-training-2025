# Advanced Topics

![Difficulty: Advanced](https://img.shields.io/badge/Difficulty-Advanced-red)
![Type: Reference](https://img.shields.io/badge/Type-Reference-purple)

Advanced installation topics for production environments, CI/CD, and enterprise setups.

## Table of Contents

- [Advanced Node.js Management](#advanced-nodejs-management)
- [Package Manager Deep Dive](#package-manager-deep-dive)
- [Browser Management](#browser-management)
- [Advanced Configuration](#advanced-configuration)
- [Docker & Containerization](#docker--containerization)
- [CI/CD Integration](#cicd-integration)
- [Enterprise & Restricted Environments](#enterprise--restricted-environments)
- [Performance Optimization](#performance-optimization)
- [VS Code Advanced Features](#vs-code-advanced-features)
- [TypeScript Configuration](#typescript-configuration)

---

## Advanced Node.js Management

### Node Version Managers

Manage multiple Node.js versions on the same machine.

#### nvm (macOS/Linux)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install specific Node version
nvm install 18
nvm install 20

# Switch versions
nvm use 18
nvm use 20

# Set default
nvm alias default 18
```

#### nvm-windows

```powershell
# Download from: https://github.com/coreybutler/nvm-windows/releases
# Install and use:
nvm install 18.0.0
nvm use 18.0.0
```

#### .nvmrc File

Lock Node version per project:

```bash
# Create .nvmrc
echo "18.17.0" > .nvmrc

# Use version from .nvmrc
nvm use
```

### Corepack (Node 16.9+)

Manage package managers without global installs:

```bash
# Enable Corepack
corepack enable

# Use specific yarn version
corepack prepare yarn@3.6.0 --activate

# Use specific pnpm version
corepack prepare pnpm@8.6.0 --activate
```

Add to `package.json`:
```json
{
  "packageManager": "pnpm@8.6.0"
}
```

---

## Package Manager Deep Dive

### Technical Comparison

| Feature | npm | yarn | pnpm |
|---------|-----|------|------|
| Install Speed | ~45s | ~35s | ~25s |
| Disk Usage | 500MB | 500MB | 200MB |
| Node Modules | Flat | Flat | Symlinked |
| Monorepo | Workspaces | Workspaces | Workspaces |
| Lock File | package-lock.json | yarn.lock | pnpm-lock.yaml |

### Lock Files

Lock files ensure consistent installs across environments.

```bash
# Commit lock files to version control
git add package-lock.json  # npm
git add yarn.lock          # yarn
git add pnpm-lock.yaml     # pnpm
```

### Workspaces (Monorepos)

#### npm workspaces
```json
{
  "workspaces": [
    "packages/*"
  ]
}
```

#### pnpm workspaces
Create `pnpm-workspace.yaml`:
```yaml
packages:
  - 'packages/*'
  - 'apps/*'
```

---

## Browser Management

### Selective Browser Installation

Install only browsers you need:

```bash
# Install specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit

# Install with dependencies (Linux)
npx playwright install --with-deps chromium
```

### Browser Channels

Test on different browser versions:

```bash
# Install Chrome (stable)
npx playwright install chrome

# Install Chrome Beta
npx playwright install chrome-beta

# Install Microsoft Edge
npx playwright install msedge
```

Configure in `playwright.config.ts`:
```typescript
{
  projects: [
    { name: 'chrome', use: { channel: 'chrome' } },
    { name: 'edge', use: { channel: 'msedge' } },
  ]
}
```

### Custom Browser Location

```bash
# Set custom browser path
export PLAYWRIGHT_BROWSERS_PATH=$HOME/pw-browsers

# Install to custom location
npx playwright install
```

### System Dependencies (Linux)

```bash
# Ubuntu/Debian
npx playwright install-deps

# Or manually
sudo apt-get install \
  libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 \
  libcups2 libdrm2 libxkbcommon0 libxcomposite1 \
  libxdamage1 libxfixes3 libxrandr2 libgbm1 \
  libasound2
```

---

## Advanced Configuration

### Multiple Projects

Test different configurations simultaneously:

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'api',
      testMatch: /.*\.api\.spec\.ts/,
    },
  ],
});
```

### Environment-Specific Configs

```bash
# Development
npx playwright test --config=playwright.dev.config.ts

# Staging
npx playwright test --config=playwright.staging.config.ts

# Production
npx playwright test --config=playwright.prod.config.ts
```

### Test Sharding

Distribute tests across multiple machines:

```bash
# Machine 1 (runs 1/3 of tests)
npx playwright test --shard=1/3

# Machine 2 (runs 2/3 of tests)
npx playwright test --shard=2/3

# Machine 3 (runs 3/3 of tests)
npx playwright test --shard=3/3
```

### Custom Reporters

```typescript
// playwright.config.ts
export default defineConfig({
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results.json' }],
    ['junit', { outputFile: 'junit.xml' }],
    ['./custom-reporter.ts'],
  ],
});
```

---

## Docker & Containerization

### Official Playwright Images

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-jammy

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npx", "playwright", "test"]
```

### docker-compose Setup

```yaml
# docker-compose.yml
version: '3.8'
services:
  playwright:
    image: mcr.microsoft.com/playwright:v1.40.0-jammy
    volumes:
      - .:/app
    working_dir: /app
    command: npx playwright test
```

Run tests:
```bash
docker-compose up
```

### Multi-Stage Build

```dockerfile
FROM mcr.microsoft.com/playwright:v1.40.0-jammy AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM mcr.microsoft.com/playwright:v1.40.0-jammy
WORKDIR /app
COPY --from=builder /app .
CMD ["npx", "playwright", "test"]
```

---

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/playwright.yml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    
    - uses: actions/setup-node@v4
      with:
        node-version: 18
    
    - name: Install dependencies
      run: npm ci
    
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    
    - name: Run Playwright tests
      run: npx playwright test
    
    - uses: actions/upload-artifact@v4
      if: always()
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

### Matrix Strategy (Multiple Browsers)

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - run: npm ci
    - run: npx playwright install --with-deps ${{ matrix.browser }}
    - run: npx playwright test --project=${{ matrix.browser }}
```

### Sharding in CI

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
    - run: npm ci
    - run: npx playwright install --with-deps
    - run: npx playwright test --shard=${{ matrix.shard }}/4
```

### GitLab CI

```yaml
# .gitlab-ci.yml
playwright:
  image: mcr.microsoft.com/playwright:v1.40.0-jammy
  script:
    - npm ci
    - npx playwright test
  artifacts:
    when: always
    paths:
      - playwright-report/
    expire_in: 1 week
```

### Jenkins Pipeline

```groovy
pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.40.0-jammy'
    }
  }
  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Test') {
      steps {
        sh 'npx playwright test'
      }
    }
  }
  post {
    always {
      publishHTML([
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report'
      ])
    }
  }
}
```

---

## Enterprise & Restricted Environments

### Corporate Proxy

```bash
# Set proxy environment variables
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080

# With authentication
export HTTP_PROXY=http://user:pass@proxy.company.com:8080

# Install Playwright
npm install --save-dev @playwright/test
npx playwright install
```

### SSL Certificate Issues

```bash
# Disable SSL verification (not recommended for production)
export NODE_TLS_REJECT_UNAUTHORIZED=0

# Or use custom CA certificate
export NODE_EXTRA_CA_CERTS=/path/to/ca-cert.pem
```

### Offline Installation

```bash
# On machine with internet:
# 1. Download browsers
npx playwright install

# 2. Package browsers
tar -czf playwright-browsers.tar.gz ~/.cache/ms-playwright

# 3. Package node_modules
tar -czf node_modules.tar.gz node_modules

# On offline machine:
# 1. Extract browsers
tar -xzf playwright-browsers.tar.gz -C ~/

# 2. Extract node_modules
tar -xzf node_modules.tar.gz

# 3. Run tests
npx playwright test
```

### Private npm Registry

```bash
# Configure registry
npm config set registry https://registry.company.com

# Or use .npmrc
echo "registry=https://registry.company.com" > .npmrc

# With authentication
npm login --registry=https://registry.company.com
```

---

## Performance Optimization

### Parallel Execution

```typescript
// playwright.config.ts
export default defineConfig({
  workers: process.env.CI ? 2 : undefined,
  fullyParallel: true,
});
```

### Reuse Browser Context

```typescript
// global-setup.ts
import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.storageState({ path: 'auth.json' });
  await browser.close();
}

export default globalSetup;
```

```typescript
// playwright.config.ts
export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  use: {
    storageState: 'auth.json',
  },
});
```

### Trace and Video Settings

```typescript
export default defineConfig({
  use: {
    trace: 'on-first-retry',  // Only on retry
    video: 'retain-on-failure',  // Only on failure
    screenshot: 'only-on-failure',
  },
});
```

---

## VS Code Advanced Features

### Test Explorer

1. Install "Playwright Test for VSCode" extension
2. Tests appear in Test Explorer sidebar
3. Run/debug individual tests with one click

### Debug Configuration

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Playwright Tests",
      "program": "${workspaceFolder}/node_modules/@playwright/test/cli.js",
      "args": ["test", "--debug"],
      "console": "integratedTerminal"
    }
  ]
}
```

### Workspace Settings

Create `.vscode/settings.json`:
```json
{
  "playwright.reuseBrowser": true,
  "playwright.showTrace": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## TypeScript Configuration

### Optimized tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@pages/*": ["tests/pages/*"],
      "@fixtures/*": ["tests/fixtures/*"]
    }
  },
  "include": ["tests/**/*"]
}
```

### Path Aliases

```typescript
// Use path aliases in tests
import { LoginPage } from '@pages/login';
import { testData } from '@fixtures/data';
```

---

## Troubleshooting

For installation and execution issues, see the **[Troubleshooting Guide](04-troubleshooting.md)**.

Specific sections for advanced users:
- [Browser Launch Failures](04-troubleshooting.md#browser-issues)
- [Permission Issues](04-troubleshooting.md#permission-issues) (including macOS permissions)
- [Network & Proxy Configuration](04-troubleshooting.md#network--proxy-issues)
- [Platform-Specific Issues](04-troubleshooting.md#platform-specific-issues)
- [Test Execution Issues](04-troubleshooting.md#test-execution-issues)

---

## 📍 Navigation

- [← Back to Installation Docs](README.md)
- [Quick Start](01-quick-start.md) | [Complete Guide](02-complete-guide.md) | [Troubleshooting](04-troubleshooting.md)


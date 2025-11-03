# Installation Troubleshooting Guide

![Type: Reference](https://img.shields.io/badge/Type-Reference-purple)
![Updated: 2025-11](https://img.shields.io/badge/Updated-2025--11-orange)

Common installation issues and their solutions.

## Table of Contents

- [Node.js Issues](#nodejs-issues)
- [Installation Errors](#installation-errors)
- [Browser Issues](#browser-issues)
- [Permission Issues](#permission-issues)
- [Network & Proxy Issues](#network--proxy-issues)
- [Platform-Specific Issues](#platform-specific-issues)
- [VS Code Issues](#vs-code-issues)
- [Test Execution Issues](#test-execution-issues)

---

## Node.js Issues

### "command not found: node" or "command not found: npm"

**Problem**: Node.js not installed or not in PATH

**Solution**:
```bash
# Check if Node.js is installed
node --version
npm --version

# If not installed, download from nodejs.org
# After installation, restart terminal
```

**macOS**: If using Homebrew:
```bash
brew install node
```

**Linux**:
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Wrong Node.js Version

**Problem**: Playwright requires Node.js 18+

**Solution**:
```bash
# Check current version
node --version

# If < 18, upgrade Node.js
# Or use nvm to manage versions
nvm install 18
nvm use 18
```

---

## Installation Errors

### "command not found: npx"

**Problem**: npm not properly installed or not in PATH

**Solution**:
```bash
# npx comes with npm 5.2+
npm --version

# If npm exists but npx doesn't, reinstall Node.js
# Or use: npm exec playwright
npm exec playwright test
```

### "Cannot find module '@playwright/test'"

**Problem**: Playwright not installed in current directory

**Solution**:
```bash
# Verify you're in the correct directory
pwd
ls package.json

# Install Playwright
npm install --save-dev @playwright/test

# Or if package.json exists
npm install
```

### "EACCES: permission denied" (npm install)

**Problem**: Trying to install globally without permissions

**Solution**:
```bash
# DON'T use sudo with npm

# Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

# Or change npm's default directory
# See: https://docs.npmjs.com/resolving-eacces-permissions-errors
```

### "ENOSPC: System limit for number of file watchers reached"

**Problem**: Linux file watcher limit too low

**Solution**:
```bash
# Increase file watcher limit
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### Package Installation Hangs

**Problem**: Network issues or corrupted cache

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install

# Or use different registry
npm install --registry=https://registry.npmjs.org/
```

---

## Browser Issues

### Browser Download Failed

**Problem**: Network issues, firewall, or disk space

**Solution**:
```bash
# Check disk space
df -h

# Retry browser installation
npx playwright install

# Install specific browser
npx playwright install chromium

# With verbose logging
DEBUG=pw:browser* npx playwright install
```

### "Executable doesn't exist" Error

**Problem**: Browsers not installed or corrupted

**Solution**:
```bash
# Reinstall browsers
npx playwright install --force

# Check browser location
npx playwright install --dry-run
```

### Browser Fails to Launch

**Problem**: Missing system dependencies (Linux)

**Solution**:
```bash
# Install system dependencies
npx playwright install-deps

# Or manually (Ubuntu/Debian)
sudo apt-get install \
  libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 \
  libcups2 libdrm2 libxkbcommon0 libxcomposite1 \
  libxdamage1 libxfixes3 libxrandr2 libgbm1 \
  libasound2 libpango-1.0-0 libcairo2
```

### "Browser closed unexpectedly"

**Problem**: Insufficient resources or conflicting software

**Solution**:
```bash
# Run with more verbose logging
DEBUG=pw:browser* npx playwright test

# Reduce parallel workers
npx playwright test --workers=1

# Check for antivirus/security software conflicts
```

---

## Permission Issues

### macOS: "Cannot Open Browser" Permission Dialog

**Problem**: macOS Gatekeeper blocking browser execution

**Solution**:
```bash
# Allow browser in System Preferences
# Go to: System Preferences → Security & Privacy → General
# Click "Allow Anyway" for Playwright browsers

# Or remove quarantine attribute
xattr -cr ~/Library/Caches/ms-playwright

# Grant permissions via terminal
xattr -d com.apple.quarantine ~/Library/Caches/ms-playwright/chromium-*/chrome-mac/Chromium.app
```

### macOS: "Chromium.app is damaged and can't be opened"

**Problem**: Gatekeeper security blocking unsigned app

**Solution**:
```bash
# Remove quarantine attribute from all browsers
cd ~/Library/Caches/ms-playwright
find . -name "*.app" -exec xattr -cr {} \;

# Or for specific browser
xattr -cr ~/Library/Caches/ms-playwright/chromium-*/chrome-mac/Chromium.app
```

### macOS: Screen Recording Permission Required

**Problem**: Tests need screen recording permission for screenshots/video

**Solution**:
1. Go to **System Preferences → Security & Privacy → Privacy**
2. Select **Screen Recording** from left sidebar
3. Add your **Terminal** or **VS Code** to the list
4. Restart the application

### Linux: Permission Denied on Browser Executable

**Problem**: Browser binary not executable

**Solution**:
```bash
# Make browser executable
chmod +x ~/.cache/ms-playwright/*/chrome-linux/chrome
chmod +x ~/.cache/ms-playwright/*/firefox/firefox
chmod +x ~/.cache/ms-playwright/*/webkit-*/minibrowser-gtk/MiniBrowser
```

---

## Network & Proxy Issues

### Browser Download Timeout

**Problem**: Slow network or firewall blocking download

**Solution**:
```bash
# Increase timeout
export PLAYWRIGHT_DOWNLOAD_CONNECTION_TIMEOUT=600000

# Install browsers
npx playwright install
```

### Corporate Proxy Issues

**Problem**: Proxy blocking npm or browser downloads

**Solution**:
```bash
# Set proxy environment variables
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080

# With authentication
export HTTP_PROXY=http://username:password@proxy.company.com:8080

# Configure npm proxy
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# Install Playwright
npm install --save-dev @playwright/test
npx playwright install
```

### SSL Certificate Errors

**Problem**: Corporate SSL inspection or self-signed certificates

**Solution**:
```bash
# Disable SSL verification (not recommended for production)
export NODE_TLS_REJECT_UNAUTHORIZED=0

# Or use custom CA certificate
export NODE_EXTRA_CA_CERTS=/path/to/ca-certificate.pem

# For npm
npm config set strict-ssl false
```

---

## Platform-Specific Issues

### Windows: PowerShell Execution Policy

**Problem**: Scripts disabled by execution policy

**Solution**:
```powershell
# Check current policy
Get-ExecutionPolicy

# Set policy for current user
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or run specific command
powershell -ExecutionPolicy Bypass -Command "npx playwright test"
```

### Windows: Long Path Issues

**Problem**: Windows path length limit (260 characters)

**Solution**:
```powershell
# Enable long paths (requires admin)
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" `
  -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force

# Or use shorter project paths
# Move project closer to root: C:\projects\playwright
```

### WSL (Windows Subsystem for Linux) Issues

**Problem**: Browser display issues in WSL

**Solution**:
```bash
# Install X server on Windows (VcXsrv or Xming)
# Set DISPLAY variable in WSL
export DISPLAY=:0

# Or run in headless mode
npx playwright test --headed=false
```

### macOS: Rosetta 2 on Apple Silicon (M1/M2)

**Problem**: Compatibility issues on ARM-based Macs

**Solution**:
```bash
# Install Rosetta 2 if not already installed
softwareupdate --install-rosetta

# Playwright should work natively on Apple Silicon
# If issues persist, try x86 Node.js
arch -x86_64 npm install
```

---

## VS Code Issues

### Playwright Extension Not Working

**Problem**: Extension not detecting tests

**Solution**:
1. **Reload VS Code**: `Cmd/Ctrl + Shift + P` → "Reload Window"
2. **Check extension settings**: Ensure correct test directory
3. **Verify playwright.config.ts** exists in project root
4. **Reinstall extension**: Uninstall and reinstall from marketplace

### Test Explorer Empty

**Problem**: Tests not appearing in Test Explorer

**Solution**:
```bash
# Verify Playwright is installed
npm list @playwright/test

# Check playwright.config.ts is valid
npx playwright test --list

# Restart VS Code
```

### Debugging Not Working

**Problem**: Breakpoints not hitting

**Solution**:
1. Use **Playwright extension's debug button** (not generic debugger)
2. Or run from terminal: `npx playwright test --debug`
3. Check `.vscode/launch.json` configuration

---

## Test Execution Issues

### "Port 9323 is already in use"

**Problem**: Another Playwright instance or Chrome DevTools running

**Solution**:
```bash
# Find process using port
# macOS/Linux
lsof -ti:9323 | xargs kill -9

# Windows
netstat -ano | findstr :9323
taskkill /PID <PID> /F

# Or use different port in config
```

### Tests Timeout Immediately

**Problem**: Timeout configuration too low

**Solution**:
```typescript
// playwright.config.ts
export default defineConfig({
  timeout: 60000,  // 60 seconds per test
  use: {
    navigationTimeout: 30000,
    actionTimeout: 10000,
  },
});
```

### "Target page, context or browser has been closed"

**Problem**: Browser closing unexpectedly

**Solution**:
```bash
# Run with debug logging
DEBUG=pw:api npx playwright test

# Check for memory issues
# Reduce parallel workers
npx playwright test --workers=1

# Disable video/screenshots
# Update playwright.config.ts
```

### Flaky Tests / Random Failures

**Problem**: Race conditions or timing issues

**Solution**:
```typescript
// Use auto-waiting (built-in)
await page.click('button');  // Waits automatically

// Avoid manual waits
// await page.waitForTimeout(1000);  // ❌ Bad

// Use proper assertions
await expect(page.locator('button')).toBeVisible();  // ✅ Good
```

---

## Getting Help

If you're still stuck after trying these solutions:

### Check Official Resources
- 📖 [Playwright Documentation](https://playwright.dev)
- 🐛 [GitHub Issues](https://github.com/microsoft/playwright/issues)
- 💬 [Discord Community](https://aka.ms/playwright/discord)
- 📺 [YouTube Channel](https://www.youtube.com/@Playwrightdev)

### Search for Similar Issues
```bash
# Search GitHub issues
https://github.com/microsoft/playwright/issues?q=your+error+message

# Stack Overflow
https://stackoverflow.com/questions/tagged/playwright
```

### Report a Bug
If you've found a bug:
1. Check if it's already reported
2. Create minimal reproduction
3. Open issue on GitHub with details

---

## 📍 Navigation

- [← Back to Installation Docs](README.md)
- [Quick Start](01-quick-start.md) | [Complete Guide](02-complete-guide.md) | [Advanced Topics](03-advanced-topics.md)


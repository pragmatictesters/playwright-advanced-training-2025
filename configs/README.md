# Playwright Configuration Files

This folder contains environment-specific Playwright configuration files demonstrating two different approaches for managing configurations across multiple environments.

---

## 📁 Files in This Folder

### Approach 1: Multiple Configuration Files

- **`playwright.config.dev.ts`** - Development environment configuration
- **`playwright.config.staging.ts`** - Staging environment configuration
- **`playwright.config.prod.ts`** - Production environment configuration

### Approach 2: Single Configuration with Projects

- **`playwright.config.unified.ts`** - Unified configuration with multiple projects

---

## 🚀 Quick Start

### Using Approach 1 (Multiple Files)

```bash
# Development
npx playwright test --config=configs/playwright.config.dev.ts

# Staging
npx playwright test --config=configs/playwright.config.staging.ts

# Production
npx playwright test --config=configs/playwright.config.prod.ts
```

### Using Approach 2 (Unified File)

```bash
# Development
npx playwright test --config=configs/playwright.config.unified.ts --project=dev

# Staging
npx playwright test --config=configs/playwright.config.unified.ts --project=staging

# Production
npx playwright test --config=configs/playwright.config.unified.ts --project=prod
```

---

## ⚙️ Setup

### 1. Create .env File

```bash
# Copy example file
cp .env.example .env

# Edit with your credentials
nano .env
```

### 2. Add npm Scripts (Optional)

Add to your `package.json`:

```json
{
  "scripts": {
    "test:dev": "playwright test --config=configs/playwright.config.dev.ts",
    "test:staging": "playwright test --config=configs/playwright.config.staging.ts",
    "test:prod": "playwright test --config=configs/playwright.config.prod.ts"
  }
}
```

Then run:

```bash
npm run test:dev
npm run test:staging
npm run test:prod
```

---

## 🔐 Environment Variables

Each configuration file uses environment variables for sensitive data:

### Development
- `DEV_BASE_URL` - Base URL for development
- `DEV_AUTH_TOKEN` - Authentication token
- `DEV_API_KEY` - API key
- `DEV_CLIENT_ID` - Client ID

### Staging
- `STAGING_BASE_URL` - Base URL for staging
- `STAGING_AUTH_TOKEN` - Authentication token
- `STAGING_API_KEY` - API key
- `STAGING_CLIENT_ID` - Client ID

### Production
- `PROD_BASE_URL` - Base URL for production
- `PROD_AUTH_TOKEN` - Authentication token
- `PROD_API_KEY` - API key
- `PROD_CLIENT_ID` - Client ID
- `PROD_CLIENT_SECRET` - Client secret

---

## 📊 Configuration Comparison

| Feature | Dev | Staging | Prod |
|---------|-----|---------|------|
| **Base URL** | localhost:3000 | staging.example.com | www.example.com |
| **Headless** | false | true | true |
| **Retries** | 0 | 1 | 2 |
| **Workers** | 1 | 2 | 4 |
| **Timeout** | 60s | 45s | 30s |
| **Screenshots** | Always | On failure | On failure |
| **Videos** | Always | On failure | On failure |
| **Traces** | Always | On retry | On failure |
| **Browsers** | Chrome | Chrome, Firefox, Safari | All + Mobile |

---

## 📚 Documentation

For complete documentation, see:
- **[Configuration Environments Guide](../docs/configuration-environments.md)** - Comprehensive guide with examples
- **[Configuration Guide](../docs/configuration-guide.md)** - Basic configuration reference

---

## 🎯 Which Approach to Use?

### Use Multiple Files (Approach 1) When:
- ✅ Team is new to Playwright
- ✅ You want maximum clarity
- ✅ Environments are very different
- ✅ You have 2-3 environments

### Use Unified File (Approach 2) When:
- ✅ Team is experienced with Playwright
- ✅ You want to reduce duplication
- ✅ Environments share many settings
- ✅ You have 4+ environments

**For beginners**: Start with **Approach 1 (Multiple Files)** ✅

---

## 🔒 Security

**Important**: Never commit credentials to version control!

```bash
# .gitignore
.env
.env.local
.env.*.local
```

Use:
- `.env` file for local development
- GitHub Secrets for CI/CD
- Azure Key Vault for Azure DevOps
- AWS Secrets Manager for AWS

---

## 🎓 Learning Resources

- [Playwright Configuration Docs](https://playwright.dev/docs/test-configuration)
- [Playwright Projects Docs](https://playwright.dev/docs/test-projects)
- [Environment Variables Best Practices](https://12factor.net/config)

---

**Happy Testing!** 🎭✨



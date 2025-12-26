# 🎯 Using Regex in Playwright Tests

## Real-world patterns for UI & API testing

---

## 📌 Common Use Cases

### 1. Locators with partial or flexible text
```typescript
// Match any text containing "success" (case-insensitive)
page.getByText(/success/i)

// Match button with "Submit" or "Save"
page.getByRole('button', { name: /submit|save/i })

// Match any heading starting with "Welcome"
page.getByRole('heading', { name: /^Welcome/ })
```

### 2. Validating dynamic content on the page
```typescript
// Verify order confirmation message
const message = await page.locator('.confirmation').textContent();
expect(message).toMatch(/Order #\d+/);

// Verify success message appears
await expect(page.locator('.alert')).toHaveText(/success/i);
```

### 3. Extracting OTP codes from emails or API responses
```typescript
const emailBody = 'Your verification code is 847291. Valid for 5 minutes.';
const otp = emailBody.match(/(\d{6})/)?.[1];
expect(otp).toMatch(/^\d{6}$/);
```

### 4. Validating API responses (IDs, dates, tokens)
```typescript
const response = await request.get('/api/user/123');
const json = await response.json();

// Validate UUID format
expect(json.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

// Validate ISO date
expect(json.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}/);
```

### 5. URL matching during redirects
```typescript
// Wait for redirect to dashboard
await expect(page).toHaveURL(/dashboard/);

// Match URL with query parameters
await expect(page).toHaveURL(/\/orders\?status=complete/);

// Match any URL ending with /success
await expect(page).toHaveURL(/\/success$/);
```

### 6. Replacing or cleaning test data
```typescript
// Remove all non-digits from phone number
const cleanPhone = '(555) 123-4567'.replace(/\D/g, '');
// Result: '5551234567'

// Extract numbers from text
const price = 'Total: $29.99'.match(/\d+\.\d{2}/)?.[0];
// Result: '29.99'
```

---

## 📋 Common Regex Patterns for Test Automation

| Pattern | Regex | Example Match |
|---------|-------|---------------|
| **OTP (6 digits)** | `/\b\d{6}\b/` | `847291` |
| **UUID** | `/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i` | `550e8400-e29b-...` |
| **ISO Date** | `/\d{4}-\d{2}-\d{2}/` | `2025-12-06` |
| **US Date** | `/\d{2}\/\d{2}\/\d{4}/` | `12/06/2025` |
| **Currency ($)** | `/^\$[\d,]+(\.\d{2})?$/` | `$1,299.99` |
| **Email** | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | `test@example.com` |
| **Phone (US)** | `/\d{3}[-.]?\d{3}[-.]?\d{4}/` | `555-123-4567` |
| **URL** | `/https?:\/\/[^\s]+/` | `https://example.com` |
| **JWT Token** | `/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/` | `eyJhbG...` |

---

## 🔤 Regex Syntax Quick Reference

| Symbol | Meaning | Example |
|--------|---------|---------|
| `.` | Any character | `a.c` → `abc`, `a1c` |
| `\d` | Any digit (0-9) | `\d{3}` → `123` |
| `\w` | Word char (a-z, 0-9, _) | `\w+` → `hello_123` |
| `\s` | Whitespace | `\s+` → spaces, tabs |
| `^` | Start of string | `^Hello` |
| `$` | End of string | `world$` |
| `*` | 0 or more | `a*` → ``, `aaa` |
| `+` | 1 or more | `a+` → `a`, `aaa` |
| `?` | 0 or 1 (optional) | `colou?r` → `color`, `colour` |
| `{n}` | Exactly n times | `\d{6}` → `123456` |
| `{n,m}` | Between n and m | `\d{2,4}` → `12`, `1234` |
| `[abc]` | Any of a, b, or c | `[aeiou]` → vowels |
| `[^abc]` | Not a, b, or c | `[^0-9]` → non-digits |
| `(...)` | Capture group | `(\d+)` captures digits |
| `\|` | OR | `cat\|dog` |
| `\b` | Word boundary | `\bword\b` |

---

## 🚀 Flags

| Flag | Meaning | Example |
|------|---------|---------|
| `i` | Case-insensitive | `/hello/i` matches `HELLO` |
| `g` | Global (find all) | `/a/g` finds all `a`s |
| `m` | Multiline | `^` matches line starts |

---

## ✅ Playwright-Specific Examples

```typescript
// ✅ Flexible text locators
await page.getByText(/welcome/i).click();
await page.getByRole('button', { name: /submit|save/i }).click();

// ✅ URL assertions
await expect(page).toHaveURL(/\/dashboard/);
await expect(page).toHaveURL(/\?status=success/);

// ✅ Text content assertions
await expect(page.locator('.message')).toHaveText(/order.*confirmed/i);
await expect(page.locator('.price')).toHaveText(/\$\d+\.\d{2}/);

// ✅ API response validation
const json = await response.json();
expect(json.id).toMatch(/^[a-f0-9-]{36}$/i);
```

---

## 💡 Pro Tips

1. **Use `i` flag** for case-insensitive matching in UI tests
2. **Use `?` for optional parts** - `https?` matches http or https
3. **Use capture groups `()`** to extract values
4. **Use `\b` word boundaries** to avoid partial matches
5. **Test your regex** at [regex101.com](https://regex101.com)

---

## 📁 Related Files

- `regex-examples.spec.ts` - Runnable demo tests
- Run: `npx playwright test tests/utils/helpers/regex-examples.spec.ts --project=chromium`


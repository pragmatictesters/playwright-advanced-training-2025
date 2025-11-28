# Email to Jayashan

---

**Subject:** 🎉 Homework Review - Excellent Work on SauceDemo Exercise!

---

Hi Jayashan,

I've reviewed your Day 3 homework submission for the SauceDemo Shopping Cart tests, and I'm impressed with your work!

**Overall Grade: A- (Excellent!)** 🎉

## What You Did Great:

✅ **Excellent folder structure** - Clean separation with `auth/` and `shopping/` folders  
✅ **Reusable helper functions** - Smart approach with `loginAsStandardUser()` and `loginAs()`  
✅ **Multiple locator strategies** - Great demonstration of data-test, ID, XPath, and CSS selectors  
✅ **Good test coverage** - 13 tests covering both positive and negative scenarios  
✅ **Professional practices** - Using `test.fixme()` to document known bugs  

## Quick Fixes Needed:

1. **Bug in code:** Change `not.toBeVisible` → `not.toBeVisible()` (missing parentheses)
2. **Missing login:** Add login step to the "empty cart checkout" test

## Suggestions for Next Level:

- Rename `login.spec.ts` → `login.helpers.ts` (since it contains helpers, not tests)
- Use `test.beforeEach()` hook for login to reduce code duplication
- Consider "should...when" pattern for test names

I've attached the detailed feedback document for your reference.

Keep up the excellent work! You're building strong automation skills. 💪

Best regards,  
**Janesh Kodikara**  
Pragmatic Test Labs

---

*Attachment: jayashan-chamiya98-feedback.md*


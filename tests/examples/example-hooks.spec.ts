import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://playwright.dev/');
  console.log('I am in the before each');
});

test.afterEach(async ({ page }) => {
  console.log('I am in the after each');
});


test.only('test one ', async ({ page }) => {
  console.log('I am in the test 1');
});

test('test two', async ({ page }) => {
  console.log('I am in the test 2');
});

test.fixme('test three', async ({ page }) => {
  console.log('I am in the test 3');
});

test.fail('test four', async ({ page }) => {
  expect(true).toBe(false);
  console.log('I am in the test 4');
});

test('test five', async ({ page }) => {
  console.log('I am in the test 5');
});

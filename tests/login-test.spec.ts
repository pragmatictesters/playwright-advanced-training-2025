import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Verify user login with blank username and blank password', async ({ page }) => {
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('form')).toContainText('Required');
});

test('Verify user login with blank username and valid password', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('span')).toContainText('Required');
});

test.skip('Verify user login with valid username and blank password', async ({ page }) => {

});

test('Verify user login with valid username and invalid password', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Username' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('alert')).toContainText('Invalid credentials');
});

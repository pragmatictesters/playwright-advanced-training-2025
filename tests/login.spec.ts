// tests/login.spec.ts

import { test, expect } from '@playwright/test';
import { LoginPage } from './login-page';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

test.describe('Login Tests', () => {

    //Parameterise the test for username, password and error message
    [
        { username: 'invalid_user', password: 'invalid_pass', expectedError: 'Username and password do not match' },
        { username: 'locked_out_user', password: 'secret_sauce', expectedError: 'Sorry, this user has been locked out' },
        { username: '', password: 'secret_sauce', expectedError: 'Username is required' },
    ].forEach(({ username, password, expectedError }) => {
        test(`should show error "${expectedError}" for user "${username}"`, async ({ page }) => {
            // Arrange
            const loginPage = new LoginPage(page);
            await loginPage.goto();

            // Act
            await loginPage.login(username, password);

            // Assert
            // Wait for an element containing the expected error text to become visible (substring match)
            const errorLocator = page.locator(`text=${expectedError}`);
            await errorLocator.first().waitFor({ state: 'visible', timeout: 5000 });
            await expect(errorLocator.first()).toBeVisible();
        });

    });

    const records = parse(fs.readFileSync(path.join(__dirname, 'input.csv')), {
        columns: true,
        skip_empty_lines: true
    });

    for (const record of records) {
        test(`foo: ${record.test_case}`, async ({ page }) => {
            console.log(record.test_case, record.some_value, record.some_other_value);
        });
    }
});





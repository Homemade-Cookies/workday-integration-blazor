import { test, expect } from '@playwright/test';

test.describe('Item Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });

  test('should add a new item', async ({ page }) => {
    await page.fill('#name', 'Test Item');
    await page.fill('#description', 'This is a test item.');
    await page.click('button[type="submit"]');

    const itemName = await page.textContent('.item-list li:last-child strong');
    expect(itemName).toBe('Test Item');
  });

  test('should update an existing item', async ({ page }) => {
    await page.click('.item-list li:last-child button:has-text("Edit")');
    await page.fill('#name', 'Updated Test Item');
    await page.fill('#description', 'This is an updated test item.');
    await page.click('button[type="submit"]');

    const itemName = await page.textContent('.item-list li:last-child strong');
    expect(itemName).toBe('Updated Test Item');
  });

  test('should delete an item', async ({ page }) => {
    await page.click('.item-list li:last-child button:has-text("Delete")');

    const items = await page.$$('.item-list li');
    expect(items.length).toBe(0);
  });

  test('should display validation errors', async ({ page }) => {
    await page.fill('#name', '');
    await page.fill('#description', '');
    await page.click('button[type="submit"]');

    const errorMessages = await page.$$('.validation-summary-errors li');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  test('should handle invalid input', async ({ page }) => {
    await page.fill('#name', 'Invalid Item');
    await page.fill('#description', '12345'); // Invalid description type
    await page.click('button[type="submit"]');

    const errorMessages = await page.$$('.validation-summary-errors li');
    expect(errorMessages.length).toBeGreaterThan(0);
  });

  test('should handle empty request body', async ({ page }) => {
    await page.fill('#name', '');
    await page.fill('#description', '');
    await page.click('button[type="submit"]');

    const errorMessages = await page.$$('.validation-summary-errors li');
    expect(errorMessages.length).toBeGreaterThan(0);
  });
});

test.describe('Item List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200');
  });

  test('should display a list of items', async ({ page }) => {
    const items = await page.$$('.item-list li');
    expect(items.length).toBeGreaterThan(0);
  });

  test('should display item details', async ({ page }) => {
    const itemName = await page.textContent('.item-list li:first-child strong');
    expect(itemName).toBeTruthy();
  });

  test('should handle database errors', async ({ page }) => {
    // Simulate a database error
    await page.route('**/api/items', route => route.abort('failed'));

    await page.goto('http://localhost:4200');
    const errorMessage = await page.textContent('.error-message');
    expect(errorMessage).toBe('Failed to load items.');
  });
});

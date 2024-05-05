import { expect } from '@playwright/test';

export async function deleteProfile(page) {
  const firstElement = await page.locator('[data-testid="property-list-id"]').first();

  // Get the text content of the selected element
  const rowId = await firstElement.textContent();

  // Click on the second checkbox inside a specific parent
  await page.click('(//span[contains(@class, "adminjs_Checkbox")])[2]');
  await page.click('[data-testid="action-bulkDelete"]');
  await page.click('button:has-text("Confirm the removal of 1 record")');

  await page.click('[data-css="Profile-filter-button"]');

  await page.fill('input[name="filter-id"]', rowId);
  await page.click('button[data-css="Profile-filter-drawer-button-apply"]');

  const text = await page.locator('.sc-gjTGSA.cMvPaq.adminjs_Text').textContent();

  expect(text.trim()).toBe('There are no records in this resource');
}

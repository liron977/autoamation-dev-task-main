import { expect } from '@playwright/test';

export async function editPost(page) {
  await page.click('[data-css="Post-table-row"]:first-child');
  const section = await page.locator('[data-testid="property-show-id"]');
  const recordId = (await section.textContent()).trim().replace('#', '');

  await page.click('[data-testid="action-edit"]');
  await page.click('.css-k21zfa-ValueContainer');

  await page.click('.css-1wrbua2-option:has-text("REMOVED")');
  await page.click('[data-testid="someJson-add"]');

  await page.click('[data-testid="button-save"]');

  await page.click('[data-css="Post-filter-button"]');

  await page.fill('input[name="filter-id"]', recordId);
  await page.click('button[data-css="Post-filter-drawer-button-apply"]');

  const text = await page.textContent('[data-testid="property-list-status"]');

  expect(text).toBe('REMOVED');
}

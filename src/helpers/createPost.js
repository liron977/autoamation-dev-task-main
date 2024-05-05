import { getUuid } from './uuid';

export async function createPost(page, index) {
  const uniquePost = `Profile-${getUuid()}`;

  await page.click('[data-testid="action-new"]');
  await page.fill('#title', uniquePost);
  await page.fill('#content', uniquePost);

  await page.click('.css-k21zfa-ValueContainer');

  await page.click('.css-jvatm4-option');

  await page.click('[data-testid="property-edit-published"] .sc-gLDzan');

  const container = page.locator('.css-p6wpjx-control');

  await container.locator('.css-1hb7zxy-IndicatorsContainer').nth(1).click();

  const inputField = page.locator('#react-select-3-input'); // Locate the input field by its ID

  // Click the input field to focus on it (ensure it's active)
  await inputField.click();

  // Insert the desired value
  await inputField.fill('YourDesiredValue');
  // const selector = `.css-1wrbua2-option:nth-child(${index})`;
  // await page.click(selector);

  await page.click('[data-testid="button-save"]');
}

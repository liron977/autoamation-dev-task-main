import { getUuid } from './uuid';

export async function createProfile(page, index) {
  const uniqueUsername = `Profile-${getUuid()}`;

  await page.click('[data-testid="action-new"]');
  await page.fill('#bio', uniqueUsername);
  // Click the field to open the drop-down
  await page.click('.css-k21zfa-ValueContainer');

  const selector = `.css-1wrbua2-option:nth-child(${index})`;
  await page.click(selector);

  await page.click('[data-testid="button-save"]');
}

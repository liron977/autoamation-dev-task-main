import { getUuid } from './uuid';

//This part is flaky but works as required
// export async function createPost(page, uniqueEmail) {
//   const uniquePost = `Profile-${getUuid()}`;

//   await page.click('[data-testid="action-new"]');
//   await page.fill('#title', uniquePost);
//   await page.fill('#content', uniquePost);

//   await page.click('.css-k21zfa-ValueContainer');

//   await page.click('.css-jvatm4-option');

//   await page.click('[data-testid="property-edit-published"] .sc-gLDzan');

//   const publisherDropdown = await page.locator('.css-k21zfa-ValueContainer').nth(1);
//   await publisherDropdown.scrollIntoViewIfNeeded();
//   await publisherDropdown.click();

//   // Use Playwright's locator to find the element with the required text
//   const element = await page.locator(`.css-1wrbua2-option:has-text("${uniqueEmail}")`);

//   // Click the element if it exists
//   if (await element.isVisible()) {
//     await element.click();
//   } else {
//     console.log('Element not found');
//   }

//   await page.click('[data-testid="button-save"]');
// }
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

  const selector = `.css-1wrbua2-option:nth-child(${index})`;
  await page.click(selector);

  await page.click('[data-testid="button-save"]');
}

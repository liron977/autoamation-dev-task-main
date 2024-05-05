import { test, chromium } from '@playwright/test';
import { login } from '../src/helpers/login';
import { createPost } from '../src/helpers/createPost';
import { createPublisher } from '../src/helpers/createPublisher';
import { editPost } from '../src/helpers/editPost';

test.describe('Create Publisher ->Create Post - link to the Publisher created( Status > Active Published= True) ->Edit Post> Change status to remove and save ->Validate post status was changed to Remove from the Post page', () => {
  let testBrowser;
  let context;
  let page;

  // Before all tests in this suite, set up the browser and context
  test.beforeAll(async () => {
    // Launch a Chromium browser instance
    testBrowser = await chromium.launch();

    // Create a new browser context with download acceptance enabled
    context = await testBrowser.newContext({ acceptDownloads: true });

    // Create a new page from the context
    page = await context.newPage();

    // Call the 'login' function
    await login(page);
  });

  test('Second Scenario', async () => {
    await page.click('.fOmMdg');
    await page.click('a:has-text("Happy Folder")');
    await page.click('a:has-text("Publisher")');

    await createPublisher(page);

    await page.click('.fOmMdg');
    //await page.click('a:has-text("Happy Folder")');
    await page.click('a:has-text("Post")');

    await createPost(page, 3);

    await editPost(page);
    // await page.click('[data-css="Post-table-row"]:first-child');
    // const section = await page.locator('[data-testid="property-show-id"]');
    // const recordId = (await section.textContent()).trim().replace('#', '');

    // await page.click('[data-testid="action-edit"]');
    // await page.click('.css-k21zfa-ValueContainer');

    // await page.click('.css-1wrbua2-option:has-text("REMOVED")');
    // await page.click('[data-testid="someJson-add"]');

    // await page.click('[data-testid="button-save"]');

    // await page.click('[data-css="Post-filter-button"]');

    // await page.fill('input[name="filter-id"]', recordId);
    // await page.click('button[data-css="Post-filter-drawer-button-apply"]');

    // const text = await page.textContent('[data-testid="property-list-status"]');

    // expect(text).toBe('REMOVED');
  });
  test.afterAll(async () => {
    console.log('Closing browser context...');
    await context.close();

    console.log('Closing browser...');
    await testBrowser.close();
  });
});

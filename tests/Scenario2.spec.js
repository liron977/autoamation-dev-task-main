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

    const uniqueEmail = await createPublisher(page);

    await page.click('.fOmMdg');

    await page.click('a:has-text("Post")');

    // await createPost(page, uniqueEmail);

    await createPost(page, 2);

    await editPost(page);
  });
  test.afterAll(async () => {
    console.log('Closing browser context...');
    await context.close();

    console.log('Closing browser...');
    await testBrowser.close();
  });
});

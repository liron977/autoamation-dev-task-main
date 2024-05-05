import { test, chromium, expect } from '@playwright/test';
import createPublisherApi from '../src/helpers/publisherApi';
import { createPostApi, editPostApi, getPostStatusByIdApi } from '../src/helpers/PostApi';
import { login } from '../src/helpers/login';

test.describe('Scenario 4 using API to do Scenario 2', () => {
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

  test.afterAll(async () => {
    console.log('Closing browser context...');
    await context.close();

    console.log('Closing browser...');
    await testBrowser.close();
  });

  test('should do scenario 2 using only API', async () => {
    // Create two unique Publishers using the API function
    const publisherId = await createPublisherApi(page);
    console.log('Publisher ID:', publisherId);

    // Create post publisher
    const postId = await createPostApi(page, publisherId);

    console.log('Post ID:', postId);

    // Edit Post> Change status to remove and save
    await editPostApi(page, postId);

    // Validate post status was changed to Remove from the Post page
    const recordStatus = await getPostStatusByIdApi(page, postId);
    expect(recordStatus).toBe('REMOVED');
  });
});

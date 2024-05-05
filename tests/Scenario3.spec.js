import { test, chromium, expect } from '@playwright/test';
import createPublisherApi from '../src/helpers/publisherApi';
import { createProfileApi, deleteProfileApi, getProfileByIdApi } from '../src/helpers/profileApi';
import { login } from '../src/helpers/login';

test.describe('Scenario 3 using API to do Scenario 1', () => {
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

  test('should do scenario 1 using only API', async () => {
    // Create two unique Publishers using the API function
    const publisherIDFirst = await createPublisherApi(page);
    const publisherIDSecond = await createPublisherApi(page);

    console.log('First Publisher ID:', publisherIDFirst);
    console.log('Second Publisher ID:', publisherIDSecond);

    // Create profiles for each Publisher
    await createProfileApi(page, publisherIDFirst);
    const profileID = await createProfileApi(page, publisherIDSecond);

    console.log('Profile ID:', profileID);

    // Delete the profile if it's successfully created
    if (profileID !== null) {
      await deleteProfileApi(page, profileID);

      // Check if the profile was successfully deleted
      const profileFilter = await getProfileByIdApi(page, profileID);
      expect(profileFilter.total).toEqual(0); // Expecting no records after deletion
    } else {
      console.error('Failed to create profile. Cannot proceed with deletion.');
    }
  });
});

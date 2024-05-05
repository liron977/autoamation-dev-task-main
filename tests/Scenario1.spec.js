import { test, chromium } from '@playwright/test';
import { login } from '../src/helpers/login';
import { createPublisher } from '../src/helpers/createPublisher';
import { createProfile } from '../src/helpers/createProfile';
import { deleteProfile } from '../src/helpers/deleteProfile';
test.describe('Create two Publishers ->Create two Profiles->Delete one Profile and make sure the deletion process was successful using the filtering option.', () => {
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

  test('first Scenario', async () => {
    await page.click('.fOmMdg');
    await page.click('a:has-text("Happy Folder")');
    await page.click('a:has-text("Publisher")');

    await createPublisher(page);
    await createPublisher(page);

    await page.click('.fOmMdg');
    await page.click('a:has-text("Happy Folder")');
    await page.click('a:has-text("Happy Folder")');
    await page.click('a:has-text("Profile")');

    await createProfile(page, 1);
    await createProfile(page, 2);

    await deleteProfile(page);
  });
  test.afterAll(async () => {
    console.log('Closing browser context...');
    await context.close();

    console.log('Closing browser...');
    await testBrowser.close();
  });
});

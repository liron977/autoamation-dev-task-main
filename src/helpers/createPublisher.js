import { getUuid } from './uuid';

export async function createPublisher(page) {
  const uniqueUsername = `Publisher-${getUuid()}`;
  const uniqueEmail = `${uniqueUsername}@gmail.com`;

  await page.click('[data-testid="action-new"]'); // Click to create new Publisher
  await page.fill('#name', uniqueUsername); // Fill the name field
  await page.fill('#email', uniqueEmail); // Fill the email field

  await page.click('[data-testid="button-save"]'); // Click the save button

  // Return the uniqueEmail at the end of the function
  return uniqueEmail;
}

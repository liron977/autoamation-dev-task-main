export async function login(page) {
  const baseUrl = 'http://localhost:3000/admin';

  // Navigate to the login page
  await page.goto(baseUrl);

  // Fill in the Organization ID
  await page.getByPlaceholder('Email').fill('admin@example.com');

  // Fill in the Email
  await page.getByPlaceholder('Password').fill('password');

  // Click the "Login" button
  await page.getByRole('button', { name: 'Login' }).click();
}

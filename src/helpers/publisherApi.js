import { getUuid } from './uuid.js';
import qs from 'qs';

const createPublisherApi = async (page) => {
  const name = getUuid();
  const email = `${getUuid()}@gmail.com`; // Generates a unique email address
  const formData = qs.stringify({
    name,
    email,
  });

  const response = await page.evaluate(
    async ({ url, formData }) => {
      const fetchResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      return fetchResponse.json(); // Parses the JSON response
    },
    { url: 'http://localhost:3000/admin/api/resources/Publisher/actions/new', formData }, // Passes additional parameters
  );

  if (response.error) {
    // Checks if there's an error in the response
    console.error('API error:', response.error);
    throw new Error('Failed to create publisher');
  } else {
    const id = response.record.params.id; // Extracts the ID from the response
    console.log('Created publisher with id:', id);
    return id; // Returns the ID of the newly created publisher
  }
};

export default createPublisherApi;

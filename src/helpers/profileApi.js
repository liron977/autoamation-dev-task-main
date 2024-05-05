import qs from 'qs';

// Function to create a new profile
export const createProfileApi = async (page, publisherId) => {
  const bio = 'test bio';
  const formData = qs.stringify({
    bio,
    publisher: publisherId,
  });

  const responseText = await page.evaluate(
    async ({ url, formData }) => {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      return response.text(); // Retrieve the text content of the response
    },
    { url: 'http://localhost:3000/admin/api/resources/Profile/actions/new', formData },
  );

  const idMatch = responseText.match(/"id":\s*(\d+)/);
  const id = idMatch ? parseInt(idMatch[1], 10) : null;

  if (id) {
    console.log('Created profile with ID:', id);
    return id; // Return the profile ID if successfully extracted
  } else {
    console.error('Failed to extract ID from response:', responseText);
    return null;
  }
};

// Function to delete a profile by ID
export const deleteProfileApi = async (page, id) => {
  const url = `http://localhost:3000/admin/api/resources/Profile/records/${id}/delete`;
  const responseText = await page.evaluate(async (url) => {
    const response = await fetch(url, {
      method: 'POST',
    });
    return response.text();
  }, url);

  const response = JSON.parse(responseText);
  if (response.error) {
    console.error('API error:', response.error);
  } else {
    console.log('Deleted profile with ID:', id);
  }
};

// Function to fetch a profile by ID
export const getProfileByIdApi = async (page, id) => {
  const url = `http://localhost:3000/admin/api/resources/Profile/actions/list?filters.id=${id}&page=1`;
  const response = await page.evaluate(async (url) => {
    const response = await fetch(url, {
      method: 'GET',
    });
    return response.json(); // Get the JSON response
  }, url);

  if (response.error) {
    console.error('API error:', response.error);
    return { total: null, records: [] }; // Return an empty result on error
  } else {
    console.log('Fetched profile with ID:', id);
    return { total: response.meta.total, records: response.records }; // Return the records and total count
  }
};

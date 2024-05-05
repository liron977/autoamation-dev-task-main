import { getUuid } from './uuid.js';
import qs from 'qs';

export const createPostApi = async (page, publisherId) => {
  const title = getUuid(); // Generates a unique name
  const formData = qs.stringify({
    title,
    status: 'ACTIVE',
    published: true,
    publisher: publisherId,
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

      return fetchResponse.json();
    },
    { url: 'http://localhost:3000/admin/api/resources/Post/actions/new', formData },
  );

  if (response.error) {
    // Checks if there's an error in the response
    console.error('API error:', response.error);
    throw new Error('Failed to create post request');
  } else {
    const id = response.record.params.id; // Extracts the ID from the response
    console.log('Created post with id:', id);
    return id; // Returns the ID of the newly created publisher
  }
};
export const editPostApi = async (page, postId) => {
  const url = `http://localhost:3000/admin/api/resources/Post/records/${postId}/edit`;
  const formData = qs.stringify({
    id: postId,
    status: 'REMOVED',
    'someJson.0': '__FORM_VALUE_EMPTY_OBJECT__',
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

      if (!fetchResponse.ok) {
        const errorText = await fetchResponse.text();
        throw new Error(`Request failed with status ${fetchResponse.status}: ${errorText}`);
      }

      return fetchResponse.json();
    },
    { url: url, formData },
  );

  if (response.error) {
    console.error('API error:', response.error); // Log the server error
    throw new Error('Failed to edit post request'); // Raise an error for failure
  } else {
    console.log('Edited post was done successfully');
  }
};

export const getPostStatusByIdApi = async (page, id) => {
  const url = `http://localhost:3000/admin/api/resources/Post/records/${id}/show`;
  const response = await page.evaluate(async (url) => {
    const fetchResponse = await fetch(url, {
      method: 'GET', // Making a GET request to retrieve information
    });

    if (!fetchResponse.ok) {
      const errorText = await fetchResponse.text();
      throw new Error(`Request failed with status ${fetchResponse.status}: ${errorText}`);
    }

    return fetchResponse.json();
  }, url);

  if (response.error) {
    console.error('API error:', response.error);
    return null;
  } else {
    return response.record.params.status;
  }
};

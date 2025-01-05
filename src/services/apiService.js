import { API_BASE_URL } from '../config/apiConfig';

export const generateFitnessPlan = async (requestBody) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Failed to submit the form');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}; 
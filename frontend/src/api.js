/* ─── API Service Layer ──────────────────────────────── */

const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Sends a content idea to the backend and returns
 * AI-generated viral content (caption, hashtags, hook, score, suggestions).
 *
 * @param {string} idea — The content idea to generate for
 * @returns {Promise<Object>} The generated content object
 * @throws {Error} With a user-friendly message on failure
 */
export async function generateContent(idea) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/generate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idea }),
    });
  } catch (err) {
    // Network error — server down, CORS blocked, DNS failure, etc.
    throw new Error('Server not responding. Make sure the backend is running.');
  }

  // Parse the body (even error responses return JSON)
  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Invalid response from server.');
  }

  // Handle HTTP errors
  if (!response.ok) {
    // Django REST Framework sends validation errors in { error: { field: [msgs] } }
    if (data?.error) {
      const messages = Object.values(data.error).flat().join(' ');
      throw new Error(messages || 'Validation error.');
    }
    throw new Error(data?.detail || 'Something went wrong. Try again.');
  }

  return data;
}

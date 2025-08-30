const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://postsmith-ai.onrender.com';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call to ${endpoint} failed:`, error);
    throw error;
  }
};

// Generate LinkedIn posts
export const generateLinkedInPosts = async (formData) => {
  return apiCall('/api/generate', {
    method: 'POST',
    body: JSON.stringify(formData),
  });
};

// Save a post
export const savePost = async (postData) => {
  return apiCall('/api/save', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
};

// Get saved posts
export const getSavedPosts = async () => {
  return apiCall('/api/myposts', {
    method: 'GET',
  });
};

// Health check
export const checkHealth = async () => {
  return apiCall('/api/health', {
    method: 'GET',
  });
};

// Delete a saved post
export const deletePost = async (postId) => {
  return apiCall(`/api/posts/${postId}`, {
    method: 'DELETE',
  });
};

// Update a saved post
export const updatePost = async (postId, updateData) => {
  return apiCall(`/api/posts/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(updateData),
  });
};

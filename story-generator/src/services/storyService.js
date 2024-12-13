const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const generateStory = async (heroNames) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create?names=${heroNames}`);
    if (!response.ok) {
      throw new Error('Failed to generate story');
    }
    const data = await response.json();
    return data.story.story;
  } catch (error) {
    console.error('Error in generateStory:', error);
    throw error;
  }
};
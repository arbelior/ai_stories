const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const generateStory = async (heroNames) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create?names=${heroNames}`);
    if (!response.ok) {
      throw new Error('Failed to generate story');
    }
    const data = await response.json();
    return {
      text: data.story.story,
      audioUrl: data.story.audioUrl
    };
  } catch (error) {
    console.error('Error in generateStory:', error);
    throw error;
  }
};
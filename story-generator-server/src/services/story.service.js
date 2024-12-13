exports.createStory = async (names) => {
  try {
    // Here you'll implement the AI integration
    // For now, we'll return a placeholder
    const prompt = `Create a story about four friends named ${names.join(', ')}.`;
    
    // TODO: Implement AI service integration
    return {
      prompt,
      // This is where you'll add the AI-generated story
      story: "AI-generated story will go here"
    };
  } catch (error) {
    throw new Error('Failed to create story');
  }
}; 
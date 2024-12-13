const openaiService = require('./openai.service');

exports.createStory = async (names) => {
  try {
    const prompt = `Create a story about four friends named ${names.join(', ')}.`;
    const generatedStory = await openaiService.generateStoryWithOpenAI(names);
    
    if (!generatedStory) {
      throw new Error('No story was generated');
    }

    console.log('Generated Story:', generatedStory);

    return {
      prompt,
      story: generatedStory
    };
  } catch (error) {
    console.error('Story Service Error:', error);
    throw new Error(`Failed to create story: ${error.message}`);
  }
}; 
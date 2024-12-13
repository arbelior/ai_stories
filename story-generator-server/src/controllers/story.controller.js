const storyService = require('../services/story.service');

exports.generateStory = async (req, res) => {
  try {
    console.log('Request received:', req.query);
    const { names: namesString, gender = 'neutral', ageRange = '7-9' } = req.query;
    
    if (!namesString) {
      return res.status(400).json({ 
        error: 'Please provide names as query parameter',
        receivedParams: { namesString, gender, ageRange }
      });
    }

    const names = namesString.split(',').map(name => name.trim());

    if (names.length !== 4) {
      return res.status(400).json({ 
        error: 'Please provide exactly 4 names',
        receivedNames: names 
      });
    }

    console.log('Processing request with:', { names, gender, ageRange });
    
    const story = await storyService.createStory(names, gender, ageRange);
    res.json({ story });
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ 
      error: 'Failed to generate story',
      details: error.message,
      params: { namesString, gender, ageRange }
    });
  }
}; 
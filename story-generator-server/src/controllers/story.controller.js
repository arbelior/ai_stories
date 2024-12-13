const storyService = require('../services/story.service');

exports.generateStory = async (req, res) => {
  try {
    // Get names from query parameters
    const namesString = req.query.names;
    
    if (!namesString) {
      return res.status(400).json({ 
        error: 'Please provide names as a query parameter' 
      });
    }

    // Split the comma-separated names
    const names = namesString.split(',').map(name => name.trim());

    // Validate we have exactly 4 names
    if (names.length !== 4) {
      return res.status(400).json({ 
        error: 'Please provide exactly 4 names' 
      });
    }

    const story = await storyService.createStory(names);
    res.json({ story });
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Failed to generate story' });
  }
}; 
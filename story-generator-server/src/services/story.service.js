const openaiService = require('./openai.service');
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fsSync.existsSync(uploadsDir)){
    fsSync.mkdirSync(uploadsDir, { recursive: true });
}

const baseUrl = process.env.BASE_URL || 'http://localhost:8000';

exports.createStory = async (names) => {
  try {
    const prompt = `Create a story about four friends named ${names.join(', ')}.`;
    const generated = await openaiService.generateStoryWithOpenAI(names);
    
    if (!generated) {
      throw new Error('No story was generated');
    }

    // Generate unique filename
    const filename = `story_${Date.now()}.mp3`;
    const filepath = path.join(uploadsDir, filename);
    
    // Save the audio buffer to file and log the result
    await fs.writeFile(filepath, generated.audio);
    console.log('File saved successfully at:', filepath);
    
    // Verify file exists after saving
    const fileExists = fsSync.existsSync(filepath);
    console.log('File exists after saving:', fileExists);

    // Generate full URL with base URL and port
    const audioUrl = `${baseUrl}/uploads/${filename}`;

    return {
      prompt,
      story: generated.text,
      audioUrl: audioUrl,
      filepath: filepath // Include this for debugging
    };
  } catch (error) {
    console.error('Story Service Error:', error);
    throw new Error(`Failed to create story: ${error.message}`);
  }
}; 
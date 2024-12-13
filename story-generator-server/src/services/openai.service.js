const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateStoryWithOpenAI = async (names) => {
  try {
    console.log('Attempting to generate story with names:', names);
    
    const prompt = `Create a story 20 words  long  in hebrewfor 8 years old kid with the following heroes: ${names.join(', ')}`;
    
    console.log('Using prompt:', prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt
            }
          ]
        }
      ],
      response_format: {
        "type": "text"
      },
      temperature: 1,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    const storyText = response.choices[0].message.content;
    console.log('OpenAI Response:', storyText);
    
    // Generate audio from the story
    const audioBuffer = await generateAudio(storyText);
    
    return {
      text: storyText,
      audio: audioBuffer
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to generate story with OpenAI: ${error.message}`);
  }
}; 

async function generateAudio(text) {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input: text,
    });

    // Convert the response to an audio buffer
    const audioBuffer = await mp3.arrayBuffer();
    // Convert array buffer to Buffer
    const buffer = Buffer.from(audioBuffer);
    
    return buffer;
  } catch (error) {
    console.error('Text-to-Speech Error:', error);
    throw new Error(`Failed to generate audio: ${error.message}`);
  }
} 
const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateStoryWithOpenAI = async (names, gender = 'neutral', ageRange = '7-9') => {
  try {
    console.log('OpenAI Service - Starting generation with:', { names, gender, ageRange });
    
    if (!names || !Array.isArray(names)) {
      throw new Error('Names must be provided as an array');
    }

    const prompt = createAgeAppropriatePrompt(names, gender, ageRange);
    console.log('Generated prompt:', prompt);

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          "role": "user",
          "content": prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 2048,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    });

    if (!response.choices || response.choices.length === 0) {
      throw new Error('OpenAI returned no choices in response');
    }

    const storyText = response.choices[0].message.content;
    console.log('OpenAI Response received:', storyText);
    
    const audioBuffer = await generateAudio(storyText);
    console.log('Audio generated successfully');
    
    return {
      text: storyText,
      audio: audioBuffer
    };
  } catch (error) {
    console.error('OpenAI Service Error:', {
      message: error.message,
      stack: error.stack,
      response: error.response?.data
    });
    throw error;
  }
};

function createAgeAppropriatePrompt(names, gender = 'neutral', ageRange = '7-9') {
  try {
    console.log('Creating prompt for:', { names, gender, ageRange });
    
    // Default age range if not provided
    const [minAge, maxAge] = (ageRange || '7-9').split('-').map(Number);
    
    let prompt = `צור סיפור בעברית שהוא`;

    if (minAge <= 6) {
      prompt += ` פשוט ועדין מאוד, עם אוצר מילים בסיסי`;
    } else if (minAge <= 9) {
      prompt += ` מעניין והרפתקני, עם לקחים מוסריים ברורים`;
    } else {
      prompt += ` מורכב ומעניין יותר, עם התפתחות דמויות`;
    }

    if (gender === 'girl') {
      prompt += `, עם דמויות נשיות חזקות ונושאים שמעצימים ילדות צעירות`;
    } else if (gender === 'boy') {
      prompt += `, עם דמויות גבריות חיוביות ונושאים של חברות ואומץ`;
    }

    prompt += `. הסיפור צריך להיות באורך של כ-20 מילים ולכלול את הדמויות הבאות: ${names.join(', ')}.`;

    if (minAge <= 6) {
      prompt += ` כלול נושאים של חברות, שיתוף וטוב לב.`;
    } else if (minAge <= 9) {
      prompt += ` כלול נושאים של עבודת צוות, פתרון בעיות וצמיחה אישית.`;
    } else {
      prompt += ` כלול נושאים של אחריות, גילוי עצמי והתגברות על אתגרים.`;
    }

    console.log('Generated prompt:', prompt);
    return prompt;
  } catch (error) {
    console.error('Error creating prompt:', error);
    throw error;
  }
}

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
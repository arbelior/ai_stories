const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateStoryWithOpenAI = async (names) => {
  try {
    console.log('Attempting to generate story with names:', names);
    
    const prompt = `Create a story for 8 years old kid with the following heroes: ${names.join(', ')}`;
    
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

    console.log('OpenAI Response:', response.choices[0].message);
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw new Error(`Failed to generate story with OpenAI: ${error.message}`);
  }
}; 
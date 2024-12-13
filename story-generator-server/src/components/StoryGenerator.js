import React, { useState } from 'react';
import './StoryGenerator.css';

function StoryGenerator() {
  const [names, setNames] = useState('');
  const [story, setStory] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerateStory = async () => {
    try {
      setError(null);
      const response = await fetch(
        `http://localhost:8000/api/create?names=${encodeURIComponent(names)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate story');
      }

      const data = await response.json();
      setStory(data.story);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="story-generator">
      <div className="input-section">
        <input
          type="text"
          value={names}
          onChange={(e) => setNames(e.target.value)}
          placeholder="Enter 4 names separated by commas"
        />
        <button onClick={handleGenerateStory}>Generate Story</button>
      </div>

      {error && <div className="error">{error}</div>}
      
      {story && (
        <div className="story-section">
          <h3>Generated Story</h3>
          <div className="prompt">
            <strong>Prompt:</strong> {story.prompt}
          </div>
          <div className="story-content">
            <p>{story.story}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StoryGenerator; 
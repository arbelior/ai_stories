import React from 'react';
import './Story.css';

const Story = ({ story }) => {
  if (!story) return null;

  return (
    <div className="story-container">
      <h2>Your Generated Story</h2>
      <div className="story-text">
        {story}
      </div>
    </div>
  );
};

export default Story; 
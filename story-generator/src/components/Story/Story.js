import React, { useEffect, useRef } from 'react';
import './Story.css';

const Story = ({ story, audioUrl }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play().catch(error => {
        console.error("Audio autoplay failed:", error);
      });
    }
  }, [audioUrl]);

  if (!story) return null;

  return (
    <div className="story-container">
      <h2>Your Generated Story</h2>
      <div className="story-text">
        {story}
      </div>
      {audioUrl && (
        <div className="audio-player">
          <audio 
            ref={audioRef}
            controls 
            src={audioUrl}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default Story; 
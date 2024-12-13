import React, { useEffect, useRef } from 'react';
import './Story.css';

const Story = ({ story, audioUrl }) => {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play().catch(error => {
        console.error("נכשלה הפעלה אוטומטית של השמע:", error);
      });
    }
  }, [audioUrl]);

  if (!story) return null;

  return (
    <div className="story-container">
      <h2>הסיפור שלך</h2>
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
            הדפדפן שלך אינו תומך בהשמעת שמע.
          </audio>
        </div>
      )}
    </div>
  );
};

export default Story; 
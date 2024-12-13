import React, { useState } from 'react';
import './WelcomePage.css';

const WelcomePage = ({ onStart }) => {
  const [gender, setGender] = useState('');
  const [ageRange, setAgeRange] = useState('');

  const ageRanges = [
    { id: '3-6', label: '3-6' },
    { id: '7-9', label: '7-9' },
    { id: '10-12', label: '10-12' },
    { id: '13-15', label: '13-15' }
  ];

  const handleSubmit = () => {
    if (!gender || !ageRange) {
      alert('אנא בחר מגדר וטווח גיל');
      return;
    }
    onStart({ gender, ageRange });
  };

  return (
    <div className="welcome-container">
      <h1>ברוכים הבאים למחולל הסיפורים</h1>
      
      <div className="selection-container">
        <div className="selection-group">
          <h2>בחר מגדר:</h2>
          <div className="options-container">
            <button 
              className={`option-button ${gender === 'boy' ? 'selected' : ''}`}
              onClick={() => setGender('boy')}
            >
              בן 👦
            </button>
            <button 
              className={`option-button ${gender === 'girl' ? 'selected' : ''}`}
              onClick={() => setGender('girl')}
            >
              בת 👧
            </button>
          </div>
        </div>

        <div className="selection-group">
          <h2>בחר טווח גיל:</h2>
          <div className="options-container">
            {ageRanges.map(range => (
              <button
                key={range.id}
                className={`option-button ${ageRange === range.id ? 'selected' : ''}`}
                onClick={() => setAgeRange(range.id)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        className="start-button"
        onClick={handleSubmit}
      >
        התחל
      </button>
    </div>
  );
};

export default WelcomePage; 
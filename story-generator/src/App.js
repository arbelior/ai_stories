import React, { useState } from 'react';
import HeroList from './components/HeroList/HeroList';
import heroes from './data/heroes';
import './App.css';

function App() {
  const [selectedHeroes, setSelectedHeroes] = useState([]);

  const handleHeroSelect = (hero) => {
    if (selectedHeroes.find(h => h.id === hero.id)) {
      setSelectedHeroes(selectedHeroes.filter(h => h.id !== hero.id));
    } else if (selectedHeroes.length < 4) {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
  };

  const handleGenerateStory = () => {
    if (selectedHeroes.length === 0) {
      alert('Please select at least one hero!');
      return;
    }
    // Story generation logic will go here
    console.log('Generating story with:', selectedHeroes);
  };

  return (
    <div className="App">
      <div className="app-top-section">
        <header className="app-header">
          <h1>Story Generator</h1>
          <div className="hero-counter">
            Selected Heroes: {selectedHeroes.length}/4
          </div>
        </header>
        
        <button 
          className="generate-button"
          onClick={handleGenerateStory}
          disabled={selectedHeroes.length === 0}
        >
          Generate Story
        </button>
      </div>
      
      <main>
        <HeroList 
          heroes={heroes}
          selectedHeroes={selectedHeroes}
          onHeroSelect={handleHeroSelect}
        />
      </main>
    </div>
  );
}

export default App;

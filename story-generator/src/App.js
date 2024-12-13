import React, { useState } from 'react';
import HeroList from './components/HeroList/HeroList';
import Story from './components/Story/Story';
import { generateStory } from './services/storyService';
import heroes from './data/heroes';
import './App.css';

function App() {
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [story, setStory] = useState({ text: '', audioUrl: '' });
  const [loading, setLoading] = useState(false);

  const handleHeroSelect = (hero) => {
    if (selectedHeroes.find(h => h.id === hero.id)) {
      setSelectedHeroes(selectedHeroes.filter(h => h.id !== hero.id));
    } else if (selectedHeroes.length < 4) {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
  };

  const handleGenerateStory = async () => {
    if (story.text) {
      // Reset everything for a new story
      setStory({ text: '', audioUrl: '' });
      setSelectedHeroes([]);
      return;
    }

    if (selectedHeroes.length === 0) {
      alert('Please select at least one hero!');
      return;
    }

    setLoading(true);
    try {
      const heroNames = selectedHeroes.map(hero => hero.name).join(',');
      const { text, audioUrl } = await generateStory(heroNames);
      setStory({ text, audioUrl });
    } catch (error) {
      alert('Failed to generate story. Please try again.');
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        >
          {loading ? 'Generating...' : story.text ? 'New Story' : 'Generate Story'}
        </button>
      </div>
      
      <main>
        <Story story={story.text} audioUrl={story.audioUrl} />
        {!story.text && (
          <HeroList 
            heroes={heroes}
            selectedHeroes={selectedHeroes}
            onHeroSelect={handleHeroSelect}
          />
        )}
      </main>
    </div>
  );
}

export default App;

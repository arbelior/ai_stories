import React, { useState } from 'react';
import HeroList from './components/HeroList/HeroList';
import Story from './components/Story/Story';
import { generateStory } from './services/storyService';
import heroes from './data/heroes';
import WelcomePage from './components/WelcomePage/WelcomePage';
import './App.css';

function App() {
  const [selectedHeroes, setSelectedHeroes] = useState([]);
  const [story, setStory] = useState({ text: '', audioUrl: '' });
  const [loading, setLoading] = useState(false);
  const [userParams, setUserParams] = useState(null);

  const handleStart = (params) => {
    setUserParams(params);
  };

  const handleHeroSelect = (hero) => {
    if (selectedHeroes.find(h => h.id === hero.id)) {
      setSelectedHeroes(selectedHeroes.filter(h => h.id !== hero.id));
    } else if (selectedHeroes.length < 4) {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
  };

  const handleGenerateStory = async () => {
    if (story.text) {
      setStory({ text: '', audioUrl: '' });
      setSelectedHeroes([]);
      return;
    }

    if (selectedHeroes.length === 0) {
      alert('אנא בחר לפחות גיבור אחד!');
      return;
    }

    setLoading(true);
    try {
      const heroNames = selectedHeroes.map(hero => hero.name).join(',');
      const { text, audioUrl } = await generateStory(heroNames, userParams.gender, userParams.ageRange);
      setStory({ text, audioUrl });
    } catch (error) {
      alert('נכשל ביצירת הסיפור. אנא נסה שוב.');
    } finally {
      setLoading(false);
    }
  };

  if (!userParams) {
    return <WelcomePage onStart={handleStart} />;
  }

  return (
    <div className="App">
      <div className="app-top-section">
        <header className="app-header">
          <h1>מחולל הסיפורים</h1>
          <div className="hero-counter">
            גיבורים שנבחרו: {selectedHeroes.length}/4
          </div>
        </header>
        
        <button 
          className="generate-button"
          onClick={handleGenerateStory}
          disabled={loading}
        >
          {loading ? 'יוצר סיפור...' : story.text ? 'סיפור חדש' : 'צור סיפור'}
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

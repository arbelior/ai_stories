import React from 'react';
import HeroCard from '../HeroCard/HeroCard';
import './HeroList.css';

const HeroList = ({ heroes, selectedHeroes, onHeroSelect }) => {
  return (
    <div className="hero-list">
      {heroes.map(hero => (
        <HeroCard
          key={hero.id}
          hero={hero}
          isSelected={selectedHeroes.some(h => h.id === hero.id)}
          onSelect={onHeroSelect}
        />
      ))}
    </div>
  );
};

export default HeroList; 
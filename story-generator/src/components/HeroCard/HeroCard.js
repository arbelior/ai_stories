import React from 'react';
import './HeroCard.css';

const HeroCard = ({ hero, isSelected, onSelect }) => {
  return (
    <div 
      className={`hero-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(hero)}
    >
      <div className="hero-icon">{hero.image}</div>
      <h3>{hero.name}</h3>
      <p>{hero.power}</p>
    </div>
  );
};

export default HeroCard; 
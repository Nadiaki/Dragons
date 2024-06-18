import React, { useState } from 'react';

type Dragon = {
  id: number;
  name: string;
  size: string;
  type: string;
  strength: number;
};

interface DragonCardProps {
    dragon: Dragon;
    health: number;
  }
  
  const DragonCard: React.FC<DragonCardProps> = ({ dragon, health }) => {
    return (
      <div className="dragon-card">
        <h2>{dragon.name}</h2>
        <p><strong>Size:</strong>{dragon.size}</p>
        <p><strong>Type:</strong>{dragon.type}</p>
        <p><strong>Strength:</strong>{dragon.strength}</p>
        <p><strong>Hitpoints:</strong>{health}</p>
      </div>
    );

  };

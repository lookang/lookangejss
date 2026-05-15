
import React from 'react';
import { type Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  isSelected: boolean;
  onSelect: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, isSelected, onSelect }) => {
  const Icon = recipe.icon;

  const cardClasses = `
    p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
    flex flex-col items-center text-center gap-2
    ${isSelected
      ? 'bg-primary/20 border-primary shadow-lg scale-105'
      : 'bg-gray-800 border-gray-700 hover:border-primary/50 hover:bg-gray-700'
    }
  `;

  return (
    <div className={cardClasses} onClick={() => onSelect(recipe)}>
      <Icon className={`w-8 h-8 mb-2 ${isSelected ? 'text-primary' : 'text-gray-400'}`} />
      <h3 className="font-semibold text-sm text-white">{recipe.title}</h3>
      <p className="text-xs text-gray-400 hidden md:block">{recipe.description}</p>
    </div>
  );
};

export default RecipeCard;

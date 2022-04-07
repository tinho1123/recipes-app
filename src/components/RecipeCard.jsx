import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './RecipeCard.css';

export default function RecipeCard({ index, recipe }) {
  const history = useHistory();

  const handleClick = () => {
    if (recipe.idMeal) {
      history.push(`/foods/${recipe.idMeal}`, [recipe]); // requisito 32
      return;
    }
    history.push(`/drinks/${recipe.idDrink}`);
  };

  if (index >= +'12') return null;
  return (
    <div className="containerRecipeCard">
      <div className="RecipeCard">
        <button
          onClick={ handleClick }
          type="button"
          data-testid={ `${index}-recipe-card` }
        >
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal || recipe.strDrink}</p>
          <p>{recipe.strAlcoholic}</p>
          <img
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt={ recipe.strMeal || recipe.strDrink }
            data-testid={ `${index}-card-img` }
          />
        </button>
      </div>
    </div>
  );
}

RecipeCard.propTypes = { recipe: PropTypes.any, index: PropTypes.any }.isRequired;

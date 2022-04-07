import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { REQ_DRINKS, REQ_FOODS } from '../consts';
import './Recommended.css';

const N_REC = 6;

function fetchFoodRecipes(set, URL) {
  fetch(URL).then((r) => r.json()).then((d) => {
    if (d.meals) {
      set(d.meals.slice(0, N_REC));
    } else if (d.drinks) { set(d.drinks.slice(0, N_REC)); }
  });
}

function reCard({ strMealThumb, strMeal, idMeal, strDrinkThumb, strDrink,
  idDrink, strAlcoholic }, index, click) {
  const url = idMeal ? `/foods/${idMeal}` : `/drinks/${idDrink}`;
  return (
    <div className="reCard" data-testid={ `${index}-recomendation-card` } key={ index }>
      <button onClick={ () => click(url) } type="button" className="reCard-btn">
        {strAlcoholic ? <h2 data-testid="recipe-category">{strAlcoholic}</h2> : null}
        <p>{index}</p>
        <p data-testid={ `${index}-recomendation-title` }>{strMeal || strDrink}</p>
        <img
          className="reCard-img"
          src={ strMealThumb || strDrinkThumb }
          alt={ strMeal || strDrink }
          data-testid={ `${index}-card-img` }
        />
      </button>
    </div>
  );
}

export default function Recommended({ type }) {
  const [recipes, setRecipes] = useState([]);
  const history = useHistory();
  const click = (url) => history.push(url);
  useEffect(() => {
    fetchFoodRecipes(setRecipes, type === 'foods' ? REQ_DRINKS : REQ_FOODS);
  }, [type]);
  return (
    <div>
      <h2 className="recommended">Recommended:</h2>
      <div className="carrousel-container">
        <div className="carrousel">
          {recipes.length ? recipes.map((i, k) => reCard(i, k, click)) : null }
        </div>
      </div>
    </div>
  );
}

Recommended.propTypes = { type: PropTypes.string }.isRequired;

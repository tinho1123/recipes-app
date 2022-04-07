import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Favorite from '../components/Favorite';
import Recommended from '../components/Recommended';
import Share from '../components/Share';
import './Details.css';

const fetchItemByID = async (id, food, set) => {
  let url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  if (food) url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const apiPromise = await fetch(url);
  const jsonData = await apiPromise.json();
  if (food) { set(jsonData.meals[0]); } else { set(jsonData.drinks[0]); }
};

function createList(lista) {
  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {Object.entries(lista).map((i, x, a) => {
          if (i[0].includes('strIngredient') && i[1] !== '' && i[1] !== null) {
            let offset = +'15';
            if (a[0][0] === 'idMeal') offset = +'20';
            const indice = i[0].split('strIngredient')[1] - 1;
            return (
              <li
                data-testid={ `${indice}-ingredient-name-and-measure` }
                key={ x }
              >
                {a[x + offset][1]}
                {' '}
                {i[1]}
              </li>);
          }
          return null;
        })}
      </ul>
    </div>
  );
}

const ytVideo = (id, title) => (
  <div className="videoTutorial">
    <h2>Video</h2>
    <iframe
      title={ title }
      width="320"
      height="240"
      src={ `https://www.youtube.com/embed/${id}` }
      data-testid="video"
    />
  </div>
);

export default function Details() {
  const [r, setRecipe] = useState(null);
  const href = window.location.href.split('/');
  const history = useHistory();
  const { location: { pathname, state } } = history;
  const food = pathname.split('/')[1] === 'foods'; // Foods OR Drinks
  const id = pathname.split('/')[2]; // Foods OR Drinks id

  useEffect(() => {
    if (state) setRecipe(state[0]); // requisito 32
    else fetchItemByID(id, food, setRecipe);
  }, []);

  if (!r) { return (<div>Carregando ...</div>); }
  return (
    <div className="containerDetails">
      <button
        type="button"
        className="voltar"
        onClick={ () => history.goBack() }
      >
        Voltar
      </button>
      <div className="RecipeDetailsdescription">
        <img
          data-testid="recipe-photo"
          className="imgRecipe"
          src={ r.strMealThumb || r.strDrinkThumb }
          alt={ r.strMeal || r.strDrink }
        />
        <h1 data-testid="recipe-title">{r.strMeal || r.strDrink}</h1>
        <h2 data-testid="recipe-category">
          {`${r.strCategory}
          ${r.strAlcoholic === undefined ? '' : ` - ${r.strAlcoholic}`}`}
        </h2>
      </div>
      <Share url={ `${href.splice(0, href.length - 1).join('/')}/${id}` } />
      <Favorite recipe={ r } food={ food } />

      <div className="ingredientsList">{ createList(r) }</div>

      <h2 className="instructions">Instructions</h2>
      <p data-testid="instructions" className="instructionsText">{r.strInstructions}</p>

      {r.strYoutube ? ytVideo(r.strYoutube.split('=')[1], r.strMeal) : null}

      <Recommended type={ food ? 'foods' : 'drinks' } />
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ () => history.push({
          pathname: `/${food ? 'foods' : 'drinks'}/${id}/in-progress`,
          state: r }) }
      >
        Continue Recipe
      </button>

    </div>
  );
}

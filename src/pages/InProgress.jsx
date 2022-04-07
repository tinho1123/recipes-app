import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Favorite from '../components/Favorite';
import Share from '../components/Share';
import './InProgress.css';

const fetchFoodID = async (id, set) => {
  const FETCH_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const apiPromise = await fetch(FETCH_URL);
  const jsonData = await apiPromise.json();
  set(jsonData.meals[0]);
};

const fetchDrinkID = async (id, set) => {
  const FETCH_URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const apiPromise = await fetch(FETCH_URL);
  const jsonData = await apiPromise.json();
  set(jsonData.drinks[0]);
};

function createList(lista, stripe, setStripe, onCheck) {
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
                key={ x }
              >
                <label
                  htmlFor={ `ingredient-${indice}` }
                  data-testid={ `${indice}-ingredient-step` }
                  style={ stripe[indice]
                    ? { textDecorationLine: 'line-through' } : null }
                >
                  <input
                    id={ `ingredient-${indice}` }
                    type="checkbox"
                    className="ingredient-check"
                    checked={ stripe[indice] }
                    onChange={ () => {
                      setStripe({ ...stripe, [indice]: !stripe[indice] });
                      onCheck({ ...stripe, [indice]: !stripe[indice] });
                    } }
                  />
                  {' '}
                  {a[x + offset][1]}
                  {' '}
                  {i[1]}
                </label>

              </li>);
          }
          return null;
        })}
      </ul>
    </div>
  );
}

// const copyClipboard = async () => {
//   await navigator.clipboard.writeText(window.location.href);
//   global.alert('Link copied!');
//   const appended = document.createElement('p');
//   document.body.appendChild(appended);
//   appended.innerHTML = 'Link copied!';
// };

export default function InProgress() {
  const { location: { state, pathname } } = useHistory();
  const history = useHistory();
  const [stripe, setStripe] = useState({});
  const [item, setItem] = useState({});
  const [progress, setProgress] = useState({});
  const [conclude, setConclude] = useState(false);
  const [nIngredients, setNIngredients] = useState(0);
  const food = pathname.split('/')[1] === 'foods'; // Foods OR Drinks
  const id = pathname.split('/')[2]; // Foods OR Drinks id
  const href = window.location.href.split('/');

  useEffect(() => { // ComponentDidMount
    if (!state && food) fetchFoodID(id, setItem);
    else if (!state) fetchDrinkID(id, setItem);
    else setItem(state);
    if (localStorage.getItem('inProgressRecipes')) {
      const s = JSON.parse(localStorage.getItem('inProgressRecipes'));
      let key = 'cocktails';
      if (food) key = 'meals';
      if (s[key]) setStripe({ ...s[key][id] });
      // setProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  }, []);

  useEffect(() => {
    setNIngredients(Object.entries(item).filter((i) => i[0]
      .includes('strIngredient') && i[1] !== '' && i[1] !== null).length);
  }, [item]);

  const onCheck = (s) => {
    let key = 'cocktails';
    if (food) { key = 'meals'; }
    localStorage.setItem('inProgressRecipes',
      JSON.stringify({ ...progress, [key]: { [id]: s, ...progress.key } }));
    setProgress({ ...progress, [key]: { [id]: s, ...progress.key } });
  };

  useEffect(() => setConclude((nIngredients - Object.values(stripe)
    .filter((i) => i === true).length)), [stripe, nIngredients]);

  return (

    <div className="containerFoodDetails">
      <div className="foodDetailsdescription">
        <img
          data-testid="recipe-photo"
          src={ item.strMealThumb || item.strDrinkThumb }
          alt={ item.strMeal || item.strDrink }
        />
        <h1 data-testid="recipe-title">{item.strMeal || item.strDrink}</h1>
        <h2 data-testid="recipe-category">{item.strCategory}</h2>
      </div>
      <Share url={ href.splice(0, href.length - 1).join('/') } />
      <Favorite recipe={ item } food={ food } />
      <div className="ingredientsList">
        {createList(item, stripe, setStripe, onCheck)}
      </div>
      <h2 className="instructions">Instructions</h2>
      <p
        data-testid="instructions"
        className="instructionsText"
      >
        {item.strInstructions}
      </p>
      <button
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn"
        type="button"
        disabled={ conclude }
        onClick={ () => history.push('/done-recipes') }
      >
        Finalizar Receita
      </button>
    </div>

  );
}

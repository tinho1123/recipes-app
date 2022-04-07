import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

const fetchIngredients = (set) => {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((r) => r.json()).then((d) => set(d));
};

const fetchDrinkIngredients = (set) => {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then((r) => r.json())
    .then((d) => set({
      meals: d.drinks.map((i, k) => ({ strIngredient: i.strIngredient1,
        idIngredient: k })) }));
};

const cards = (recipes, handleClick, ford) => (
  <div className="foods-cards-container">
    {recipes.map(({ strIngredient }, k) => (
      <button
        className="food-card"
        key={ k }
        data-testid={ `${k}-ingredient-card` }
        onClick={ () => handleClick(strIngredient) }
        type="button"
      >
        <p data-testid={ `${k}-card-name` }>{strIngredient}</p>
        <img
          src={ ford === 'foods'
            ? `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png`
            : `https://www.thecocktaildb.com/images/ingredients/${strIngredient}-Small.png` }
          alt={ strIngredient }
          data-testid={ `${k}-card-img` }
        />
      </button>
    ))}
  </div>
);

export default function ExploreIngredients() {
  const history = useHistory();
  const ford = history.location.pathname.split('/')[2]; // Foods OR Drinks
  const { apiDrinkFetcher, apiFoodFetcher, recipes } = useContext(Context);
  const [ingredients, setIngredients] = useState([]);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (ford === 'foods') {
      fetchIngredients(setIngredients);
    } else { fetchDrinkIngredients(setIngredients); }
  }, [ford]);

  const handleClick = (ingredient) => {
    if (ford === 'foods') {
      apiFoodFetcher('ingredient', ingredient);
    } else { apiDrinkFetcher('ingredient', ingredient); }
    setRedirect(true);
  };

  useEffect(() => { if (redirect) { history.push(`/${ford}`); } }, [recipes]);

  const r = { meals: [...ingredients.meals || []] };
  const max = 12;
  return (
    <div>{ cards(r.meals ? r.meals.splice(0, max) : [], handleClick, ford)}</div>
  );
}

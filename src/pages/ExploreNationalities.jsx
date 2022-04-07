import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import './ExploreNationalities.css';

const fetchFilter = (set) => {
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((r) => r.json()).then((d) => set(d.meals.map((i) => i.strArea)));
};

const fetchNat = (set, nat) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nat}`)
    .then((r) => r.json()).then((d) => set(d.meals.splice(0, +'12')));
};

const cards = (recipes, history) => (
  <div className="foods-cards-container">
    {recipes.map(({ idMeal, strMeal, strMealThumb }, k) => (
      <button
        className="food-card"
        key={ k }
        data-testid={ `${k}-recipe-card` }
        onClick={ () => history.push(`/foods/${idMeal}`,
          [{ idMeal, strMeal, strMealThumb }]) } // req 79.3 = 32
        type="button"
      >
        <p>{k}</p>
        <p data-testid={ `${k}-card-name` }>{strMeal}</p>
        <img
          src={ strMealThumb }
          alt={ strMeal }
          data-testid={ `${k}-card-img` }
        />
      </button>
    ))}
  </div>
);

export default function ExploreNationalities() {
  const [n, setNacionalidades] = useState([]);
  const [filtro, setFiltro] = useState('All');
  const [meals, setMeals] = useState([]);
  const { recipes, nameFoodFetcher } = useContext(Context);
  const history = useHistory();

  useEffect(() => fetchFilter(setNacionalidades), []);
  useEffect(() => { if (!recipes.meals) { nameFoodFetcher(''); } }, []);
  useEffect(() => {
    if (filtro === 'All') { setMeals([]); return; }
    fetchNat(setMeals, filtro);
  }, [filtro]);

  const r = { meals: [...recipes.meals || []] };
  const max = 12;
  return (
    <div className="containerExploreNationalities">
      {/* FILTRO */}
      <select
        data-testid="explore-by-nationality-dropdown"
        onChange={ ({ target }) => setFiltro(target.value) }
      >
        <option key={ 0 } value="All" data-testid="All-option">All</option>
        {n.map((i, k) => (
          <option key={ k + 1 } data-testid={ `${i}-option` } value={ i }>{i}</option>))}
      </select>

      {/* CARTÕES */}
      { cards(filtro === 'All' && r.meals ? r.meals.splice(0, max) : meals, history)}
    </div>
  );
}

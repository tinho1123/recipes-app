import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ExploreFoods.css';

function ExploreFoods() {
  const history = useHistory();
  const [surpriseState, setSurprise] = useState([]);

  useEffect(() => {
    (async () => {
      const FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const apiPromise = await fetch(FETCH_URL);
      const jsonData = await apiPromise.json();
      setSurprise(jsonData);
    })();
  }, []);

  const redirect = () => {
    const ID = surpriseState.meals[0].idMeal;
    const link = `/foods/${ID}`;
    history.push(link);
  };

  return (
    <div className="containerExploreFoods">
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explore/foods/ingredients') }
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-by-nationality"
        type="button"
        onClick={ () => history.push('/explore/foods/nationalities') }
      >
        By Nationality
      </button>
      <button
        data-testid="explore-surprise"
        type="button"
        onClick={ redirect }
      >
        Surprise me!
      </button>
    </div>
  );
}

export default ExploreFoods;

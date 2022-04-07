import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ExploreDrinks.css';

function ExploreDrinks() {
  const history = useHistory();
  const [surpriseState, setSurprise] = useState([]);

  useEffect(() => {
    (async () => {
      const FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const apiPromise = await fetch(FETCH_URL);
      const jsonData = await apiPromise.json();
      setSurprise(jsonData);
    })();
  }, []);

  const redirect = () => {
    const ID = surpriseState.drinks[0].idDrink;
    const link = `/drinks/${ID}`;
    history.push(link);
  };

  return (
    <div className="containerExploreDrinks">
      <button
        data-testid="explore-by-ingredient"
        type="button"
        onClick={ () => history.push('/explore/drinks/ingredients') }
      >
        By Ingredient
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

export default ExploreDrinks;

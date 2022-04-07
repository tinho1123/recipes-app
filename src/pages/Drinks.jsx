import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Context from '../context/Context';
import './Drinks.css';

export default function Drinks() {
  const history = useHistory();
  const { recipes, nameDrinkFetcher, usingFilter } = useContext(Context);
  const { drinks } = recipes;

  const checkLength = () => {
    if (!usingFilter && drinks && drinks !== null && drinks.length === 1) {
      const result = drinks[0];
      history.push(`/drinks/${result.idDrink}`);
    } else if (drinks === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { checkLength(); }, [drinks]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (!recipes.drinks) { nameDrinkFetcher(''); } }, []);

  return (
    <div className="drink-cards-container">
      {drinks && drinks.length > 0 ? drinks.map((drink, index) => (
        // <DrinkCard key={ index } drink={ drink } index={ index } />
        <RecipeCard key={ index } recipe={ drink } index={ index } />
      )) : null}
    </div>

  );
}

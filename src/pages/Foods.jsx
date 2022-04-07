import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import FoodCard from '../components/FoodCard';
import RecipeCard from '../components/RecipeCard';
import Context from '../context/Context';
import './Foods.css';

export default function Foods() {
  const history = useHistory();
  const { recipes, nameFoodFetcher, usingFilter } = useContext(Context);
  const { meals } = recipes;

  const checkLength = () => {
    if (!usingFilter && meals && meals !== null && meals.length === 1) {
      const result = meals[0];
      history.push(`/foods/${result.idMeal}`);
    } else if (meals === null) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { checkLength(); }, [meals]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (!recipes.meals) { nameFoodFetcher(''); } }, []);

  return (
    <div className="foods-cards-container">
      {meals && meals.length > 0 ? meals.map((food, index) => (
        // <FoodCard key={ index } food={ food } index={ index } />
        <RecipeCard key={ index } recipe={ food } index={ index } />
      )) : null}
    </div>
  );
}

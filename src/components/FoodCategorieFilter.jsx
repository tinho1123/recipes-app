import React, { useState, useEffect, useContext } from 'react';
import Context from '../context/Context';
import './FoodCategorieFilter.css';

export default function FoodCategorieFilter() {
  const [categorie, setCategorie] = useState([]);
  const [filter, setFilter] = useState('');
  const {
    foodFilterByCategory,
    setUsingFilter,
    nameFoodFetcher,
    usingFilter,
  } = useContext(Context);

  const fetchCategories = async () => {
    const FETCH_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const apiPromise = await fetch(FETCH_URL);
    const jsonData = await apiPromise.json();
    setCategorie(jsonData.meals);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const FIVE = 5;

  return (
    <div className="containerFoodCategorieFilter">
      {categorie.length && categorie.slice(0, FIVE).map(({ strCategory }) => (
        <button
          key={ strCategory }
          type="button"
          className="button-category-filter"
          data-testid={ `${strCategory}-category-filter` }
          onClick={ () => {
            if (usingFilter && filter === strCategory) {
              setUsingFilter(false);
              setFilter('');
              nameFoodFetcher('');
            } else {
              foodFilterByCategory(strCategory);
              setFilter(strCategory);
              setUsingFilter(true);
            }
          } }
        >
          { strCategory }
        </button>
      ))}
      <button
        type="button"
        className="FoodAllCategory"
        data-testid="All-category-filter"
        onClick={ () => {
          nameFoodFetcher('');
          setUsingFilter(false);
        } }
      >
        All
      </button>
    </div>
  );
}

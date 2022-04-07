import React, { useState, useEffect, useContext } from 'react';
import Context from '../context/Context';
import './DrinkCategorieFilter.css';

export default function DrinkCategorieFilter() {
  const [categorie, setCategorie] = useState([]);
  const [filter, setFilter] = useState('');
  const {
    drinkFilterByCategory,
    nameDrinkFetcher,
    setUsingFilter,
    usingFilter } = useContext(Context);

  const fetchCategories = async () => {
    const FETCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const apiPromise = await fetch(FETCH_URL);
    const jsonData = await apiPromise.json();
    setCategorie(jsonData.drinks);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const FIVE = 5;

  return (
    <div className="containerDrinkCategorieFilter">
      {categorie.length && categorie.slice(0, FIVE).map(({ strCategory }) => (
        <button
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          className="button-category-filter"
          type="button"
          onClick={ () => {
            if (usingFilter && filter === strCategory) {
              setUsingFilter(false);
              setFilter('');
              nameDrinkFetcher('');
            } else {
              drinkFilterByCategory(strCategory);
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
        className="buttonAllCategory"
        data-testid="All-category-filter"
        onClick={ () => {
          setUsingFilter(false);
          nameDrinkFetcher('');
        } }
      >
        All
      </button>
    </div>
  );
}

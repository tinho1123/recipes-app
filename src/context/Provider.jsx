import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [usingFilter, setUsingFilter] = useState(false);

  const ingredientFoodFetcher = async (input) => {
    const FETCH_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
    const apiPromise = await fetch(FETCH_URL);
    const jsonData = await apiPromise.json();
    setRecipes(jsonData);
  };

  const nameFoodFetcher = async (input) => {
    const FETCH_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    const apiPromise = await fetch(FETCH_URL);
    const jsonData = await apiPromise.json();
    setRecipes(jsonData);
  };

  const letterFoodFetcher = async (input) => {
    if (input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const FETCH_URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input[0]}`;
      const apiPromise = await fetch(FETCH_URL);
      const jsonData = await apiPromise.json();
      setRecipes(jsonData);
    }
  };

  const apiFoodFetcher = (endPoint, input) => {
    switch (endPoint) {
    default:
    case 'ingredient':
      ingredientFoodFetcher(input);
      break;
    case 'name':
      nameFoodFetcher(input);
      break;
    case 'firstLetter':
      letterFoodFetcher(input);
      break;
    }
  };

  const ingredientDrinkFetcher = async (input) => {
    const FETCH_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
    const apiPromise = await fetch(FETCH_URL);
    const jsonData = await apiPromise.json();
    setRecipes(jsonData);
  };

  const nameDrinkFetcher = async (input) => {
    const FETCH_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
    const apiPromise = await fetch(FETCH_URL);
    const jsonData = await apiPromise.json();
    setRecipes(jsonData);
  };

  const letterDrinkFetcher = async (input) => {
    if (input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    } else {
      const FETCH_URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input[0]}`;
      const apiPromise = await fetch(FETCH_URL);
      const jsonData = await apiPromise.json();
      setRecipes(jsonData);
    }
  };

  const apiDrinkFetcher = (endPoint, input) => {
    switch (endPoint) {
    default:
    case 'ingredient':
      ingredientDrinkFetcher(input);
      break;
    case 'name':
      nameDrinkFetcher(input);
      break;
    case 'firstLetter':
      letterDrinkFetcher(input);
      break;
    }
  };

  const nationalityFoodFetcher = async (input) => {
    const FETCH_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${input}`;
    const apiPromise = await fetch(FETCH_URL);
    const jsonData = await apiPromise.json();
    setRecipes(jsonData);
  };

  const foodFilterByCategory = async (input) => {
    const FETCH_URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${input}`;
    const apiPromise = await fetch(FETCH_URL);
    const jsonData = await apiPromise.json();
    setRecipes(jsonData);
  };

  const drinkFilterByCategory = async (input) => {
    const FETCH_URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${input}`;
    const apiPromise = await fetch(FETCH_URL);
    const jsonData = await apiPromise.json();
    setRecipes(jsonData);
  };

  const context = { recipes,
    setRecipes,
    apiFoodFetcher,
    apiDrinkFetcher,
    nameFoodFetcher,
    nameDrinkFetcher,
    nationalityFoodFetcher,
    foodFilterByCategory,
    drinkFilterByCategory,
    usingFilter,
    setUsingFilter };

  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );

  //   Passando o contexto para englobar os componentes filhos
};

RecipesProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export { Context, RecipesProvider as Provider };

import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import './SearchFoodBar.css';

function SearchFoodBar() {
  const [radioFilter, setRadioFilter] = useState({ filter: '' });
  const [searchFilter, setSearchFilter] = useState({ search: '' });
  const { apiFoodFetcher } = useContext(Context);

  const handleRadioChange = ({ target }) => {
    const { value } = target;
    setRadioFilter({ ...radioFilter, filter: value });
  };

  const handleSearchFilter = ({ target }) => {
    const { value, id } = target;
    setSearchFilter({ ...searchFilter, [id]: value });
  };

  const { filter } = radioFilter;
  const { search } = searchFilter;

  return (
    <div className="containerSearchFoodBar">
      <label htmlFor="search" className="labelSearch">
        Search
        <input
          data-testid="search-input"
          id="search"
          className="search"
          onChange={ handleSearchFilter }
        />
      </label>
      <div className="radiotype">
        <label htmlFor="ingredientRadio">
          Ingredient
          <input
            id="ingredientRadio"
            className="ingredientRadio"
            type="radio"
            name="searchRadio"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ handleRadioChange }
          />
        </label>
        <label htmlFor="nameRadio">
          Name
          <input
            id="nameRadio"
            className="nameRadio"
            type="radio"
            name="searchRadio"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleRadioChange }
          />
        </label>
        <label htmlFor="letterRadio">
          First letter
          <input
            id="letterRadio"
            className="letterRadio"
            type="radio"
            name="searchRadio"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            onChange={ handleRadioChange }
          />
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        className="search-btn"
        type="button"
        onClick={ () => apiFoodFetcher(filter, search) }
      >
        Search

      </button>
    </div>
  );
}

export default SearchFoodBar;

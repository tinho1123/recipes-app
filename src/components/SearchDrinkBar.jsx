import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function SearchDrinkBar() {
  const [radioFilter, setRadioFilter] = useState({ filter: '' });
  const [searchFilter, setSearchFilter] = useState({ search: '' });
  const { apiDrinkFetcher } = useContext(Context);

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
      <label htmlFor="search">
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
            type="radio"
            name="searchRadio"
            className="ingredientRadio"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ handleRadioChange }
          />
        </label>
        <label htmlFor="nameRadio">
          Name
          <input
            id="nameRadio"
            type="radio"
            name="searchRadio"
            className="nameRadio"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleRadioChange }
          />
        </label>
        <label htmlFor="letterRadio">
          First letter
          <input
            id="letterRadio"
            type="radio"
            name="searchRadio"
            className="letterRadio"
            data-testid="first-letter-search-radio"
            value="firstLetter"
            onChange={ handleRadioChange }
          />
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        type="button"
        className="search-btn"
        onClick={ () => apiDrinkFetcher(filter, search) }
      >
        Search

      </button>
    </div>
  );
}

// fix

export default SearchDrinkBar;

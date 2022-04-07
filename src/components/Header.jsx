import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { EXPLORE, MOSTRA_HEADER } from '../consts';
import imageProfile from '../images/profileIcon.svg';
import imageSearch from '../images/searchIcon.svg';
import SearchDrinkBar from './SearchDrinkBar';
import SearchFoodBar from './SearchFoodBar';
import FoodCategorieFilter from './FoodCategorieFilter';
import DrinkCategorieFilter from './DrinkCategorieFilter';
import './Header.css';

function getTitle(path) {
  switch (path) {
  case '/foods': return 'Foods';
  case '/drinks': return 'Drinks';
  case '/explore': return 'Explore';
  case '/profile': return 'Profile';
  case '/done-recipes': return 'Done Recipes';
  case '/favorite-recipes': return 'Favorite Recipes';
  case '/explore/foods': return 'Explore Foods';
  case '/explore/drinks': return 'Explore Drinks';
  case '/explore/foods/ingredients': return 'Explore Ingredients';
  case '/explore/drinks/ingredients': return 'Explore Ingredients';
  case '/explore/foods/nationalities': return 'Explore Nationalities';
  case '/explore/drinks/nationalities': return 'Explore Nationalities';
  default: return '';
  }
}

function showSearchBar(pathname) {
  if (pathname === '/foods') { return (<SearchFoodBar />); }
  return (<SearchDrinkBar />);
}

function showSearchFilters(pathname) {
  if (pathname === '/foods') return <FoodCategorieFilter />;
  if (pathname === '/drinks') return <DrinkCategorieFilter />;
}

export default function Header() {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [pathname, setPathname] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setPathname(history.location.pathname);
    setTitle(getTitle(history.location.pathname));
  }, [history.location.pathname]);

  history.listen((l) => {
    setPathname(l.pathname);
    setTitle(getTitle(l.pathname));
  });

  if (!MOSTRA_HEADER.includes(pathname)) { return null; }
  return (
    <div className="containerHeader">
      <div className="profileAndSearch">
        <Link to="/profile">
          <img
            src={ imageProfile }
            alt="profile-top-btn"
            data-testid="profile-top-btn"
            className="profile-top-btn"
            type="button"
          />
        </Link>
        {EXPLORE.includes(pathname) ? null
          : (
            <div className="containerButtonSearch">
              <button
                type="button"
                onClick={ () => setShowSearch(!showSearch) }
                className="buttonSearch"
              >
                <img
                  src={ imageSearch }
                  alt="search-top-btn"
                  type="text"
                  data-testid="search-top-btn"
                  className="imgSearch"
                />
              </button>
            </div>
          )}
      </div>
      { showSearch
        ? showSearchBar(pathname) : showSearchFilters(pathname) }
      <h3 data-testid="page-title" className="page-title">
        {title}
      </h3>
    </div>
  );
}

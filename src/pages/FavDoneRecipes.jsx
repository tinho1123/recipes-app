import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import favoriteIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import './FavDoneRecipes.css';

const copy = require('clipboard-copy');

const card = ({ i, k, share, copied, go, unFav }) => {
  const url = `/${i.type}s/${i.id}`;
  return (
    <div key={ k }>
      <button type="button" onClick={ () => go(url) }>
        <div data-testid={ `${k}-horizontal-name` }>{i.name}</div>
        <img data-testid={ `${k}-horizontal-image` } src={ i.image } alt={ i.name } />
      </button>
      <div data-testid={ `${k}-horizontal-top-text` }>
        {`${i.nationality} - ${i.category} - ${i.alcoholicOrNot}`}
      </div>
      <div data-testid={ `${k}-horizontal-done-date` }>{i.doneDate}</div>

      <button type="button" onClick={ () => share(url) }>
        <img data-testid={ `${k}-horizontal-share-btn` } src={ shareIcon } alt="share" />
        {copied.includes(url) && 'Link copied!'}
      </button>

      <button type="button" onClick={ () => unFav(i.id) }>
        <img
          data-testid={ `${k}-horizontal-favorite-btn` }
          src={ favoriteIcon }
          alt="favorite"
        />
        {copied.includes(url) && 'Link copied!'}
      </button>

      {i.tags ? i.tags.map((j, x) => (
        <p key={ x } data-testid={ `${k}-${j}-horizontal-tag` }>{j}</p>)) : null}
    </div>
  );
};

export default function FavDoneRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [copied, setCopied] = useState([]);
  const [filter, setFilter] = useState('');
  const history = useHistory();
  const href = window.location.href.split('/');

  useEffect(() => {
    let key = 'doneRecipes';
    if (href[href.length - 1] === 'favorite-recipes') key = 'favoriteRecipes';
    if (localStorage.getItem(key)) setRecipes(JSON.parse(localStorage.getItem(key)));
  }, []);

  const share = (url) => {
    copy(`${href.splice(0, href.length - 1).join('/')}${url}`);
    setCopied([...copied, url]);
  };

  const go = (url) => history.push(url);

  const unFav = (id) => {
    const fav = recipes.filter((i) => i.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(fav));
    setRecipes(fav);
  };

  return (
    <div className="containerFavDoneRecipes">
      {/* FILTROS */}
      <div className="buttonFilterFavDoneRecipes">
        <button
          type="button"
          onClick={ () => setFilter('') }
          data-testid="filter-by-all-btn"
        >
          Tudo
        </button>
        <button
          type="button"
          onClick={ () => setFilter('food') }
          data-testid="filter-by-food-btn"
        >
          Comidas
        </button>
        <button
          type="button"
          onClick={ () => setFilter('drink') }
          data-testid="filter-by-drink-btn"
        >
          Bebidas
        </button>
      </div>
      {/* CARDS */}
      {filter === '' ? recipes
        .map((i, k) => card({ i, k, share, copied, go, filter, unFav }))
        : recipes.filter((j) => j.type === filter)
          .map((i, k) => card({ i, k, share, copied, go, filter }))}
    </div>
  );
}

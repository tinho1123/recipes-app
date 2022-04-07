import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import favoriteIcon from '../images/blackHeartIcon.svg';
import notfavoriteIcon from '../images/whiteHeartIcon.svg';
import './Favorite.css';

const makeItem = (recipe, food) => ({
  id: recipe.idMeal || recipe.idDrink,
  type: food ? 'food' : 'drink',
  nationality: recipe.strArea || '',
  category: recipe.strCategory,
  alcoholicOrNot: recipe.strAlcoholic || '',
  name: recipe.strMeal || recipe.strDrink,
  image: recipe.strMealThumb || recipe.strDrinkThumb,
});

export default function Favorite(props) {
  const { recipe, food } = props;
  const id = recipe.idMeal || recipe.idDrink;
  const [buttonFav, setButtonFav] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) { // carrega favoritos
      const fav = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavorites(fav);
      setButtonFav(fav.find((e) => e.id === id));
    }
  }, [recipe]);

  const toogleFav = () => {
    const storage = localStorage.getItem('favoriteRecipes');
    // falta o teste se já está favoritado?
    if (storage !== null && JSON.parse(storage).find((e) => e.id === id)) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify(favorites.filter((e) => e.id !== id)));
      setFavorites(favorites.filter((i) => i.id !== id));
    } else {
      const item = makeItem(recipe, food);
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([...favorites, item]));
      setFavorites([...favorites, item]);
    }
    setButtonFav(!buttonFav);
  };
  return (
    <button
      type="button"
      onClick={ toogleFav }
      className="favorite-btn"
    >
      <img
        data-testid="favorite-btn"
        src={ buttonFav ? favoriteIcon : notfavoriteIcon }
        alt="heart-icon"
      />
    </button>
  );
}

Favorite.propTypes = {
  recipe: PropTypes.shape({}),
  food: PropTypes.bool,
}.isRequired;

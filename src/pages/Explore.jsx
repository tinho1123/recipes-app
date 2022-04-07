import React from 'react';
import { useHistory } from 'react-router-dom';
import './Explore.css';

export default function Explore() {
  const history = useHistory();
  return (
    <div className="containerExplore">
      <button
        type="button"
        data-testid="explore-foods"
        className="buttonExploreFoods"
        onClick={ () => history.push('/explore/foods') }
      >
        Explore Foods
      </button>

      <button
        onClick={ () => history.push('/explore/drinks') }
        type="button"
        data-testid="explore-drinks"
      >
        Explore Drinks
      </button>
    </div>
  );
}

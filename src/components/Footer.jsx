import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

const MF1 = '/foods,/drinks,/explore,/explore/foods,/profile,/explore/foods/ingredients,';
const MF2 = '/explore/foods/nationalities,/explore/drinks/ingredients,/explore/drinks';
const MOSTRA_FOOTER = (MF1 + MF2).split(',');

export default function Footer() {
  const history = useHistory();
  const [pathname, setPathname] = useState('');

  useEffect(() => {
    setPathname(history.location.pathname);
  }, [history.location.pathname]);

  history.listen((l) => {
    setPathname(l.pathname);
  });

  if (!MOSTRA_FOOTER.includes(pathname)) { return null; }
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="Drink icon"
        />
      </Link>
      <Link to="/explore">
        <img
          data-testid="explore-bottom-btn"
          src={ exploreIcon }
          alt="Explore icon"
        />
      </Link>
      <Link to="/foods">
        <img
          data-testid="food-bottom-btn"
          src={ mealIcon }
          alt="Meal icon"
        />
      </Link>
    </footer>
  );
}

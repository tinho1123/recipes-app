import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFound from './components/NotFound';
import { Provider } from './context/Provider';
import Details from './pages/Details';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreNationalities from './pages/ExploreNationalities';
import FavDoneRecipes from './pages/FavDoneRecipes';
import Foods from './pages/Foods';
import InProgress from './pages/InProgress';
import Login from './pages/Login';
import Profile from './pages/Profile';

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/foods/:id" component={ Details } />
        <Route exact path="/drinks/:id" component={ Details } />
        <Route exact path="/done-recipes" component={ FavDoneRecipes } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/favorite-recipes" component={ FavDoneRecipes } />
        <Route path="/profile" component={ Profile } />
        <Route path="/foods/:id/in-progress" component={ InProgress } />
        <Route path="/drinks/:id/in-progress" component={ InProgress } />
        <Route path="/explore/foods/ingredients" component={ ExploreIngredients } />
        <Route path="/explore/drinks/ingredients" component={ ExploreIngredients } />
        <Route path="/explore/foods/nationalities" component={ ExploreNationalities } />
        <Route path="/explore/drinks/nationalities" component={ NotFound } />
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}

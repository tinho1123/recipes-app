const MH1 = '/foods,/drinks,/explore,/explore/foods,/profile,/explore/foods/ingredients,';
const MH2 = '/explore/foods/nationalities,/explore/drinks/ingredients,/explore/drinks,';
const MH3 = '/done-recipes,/favorite-recipes';
export const MOSTRA_HEADER = (MH1 + MH2 + MH3).split(',');

const EX1 = '/explore,/profile,/explore/foods,/explore/drinks,/done-recipes,';
const EX2 = '/explore/drinks/ingredients,/explore/foods/ingredients,/favorite-recipes';
export const EXPLORE = (EX1 + EX2).split(',');

export const REQ_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const REQ_FOODS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

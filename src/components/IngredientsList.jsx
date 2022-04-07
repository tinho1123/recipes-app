import React from 'react';

export default function IngrediensList(lista) {
  return (
    <div>
      <h2>Ingredients</h2>
      <ul>
        {Object.entries(lista).map((i, x, a) => {
          if (i[0].includes('strIngredient') && i[1] !== '' && i[1] !== null) {
            let offset = '15';
            if (a[0][0] === 'idMeal') offset = '20';
            const indice = i[0].split('strIngredient')[1] - 1;
            return (
              <li
                key={ x }
                data-testid={ `${indice}-ingredient-name-and-measure` }
              >
                {a[x + parseInt(offset, 10)][1]}
                {' '}
                {i[1]}
              </li>);
          }
          return null;
        })}
      </ul>
    </div>
  );
}

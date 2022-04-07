import React from 'react';
import './Profile.css';

export default function Profile(prop) {
  const { history } = prop;
  const e = JSON.parse(localStorage.getItem('user'));
  let email = 'perfil@email.com';
  if (e !== null) email = e.email;
  return (
    <div className="containerProfile">
      <div className="Header">
        <div className="Foto-perfil">
          <img src="" alt="" />
        </div>
      </div>

      <div className="Corpo">
        <h3 data-testid="profile-email">
          {email}
        </h3>
      </div>
      <div className="caixa-de-ações">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes

        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes

        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
        >
          Logout

        </button>
      </div>
    </div>
  );
}

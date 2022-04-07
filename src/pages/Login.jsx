import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import rockGlass from '../images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

function Login() {
  const history = useHistory();

  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
    buttonStatus: true,
  });

  const validateButton = () => {
    let buttonState = true;
    const minLength = 6;
    const { email, password } = loginState;
    const button = document.getElementsByTagName('button')[0];
    if (email.includes('@') && email.includes('.com') && password.length >= minLength) {
      buttonState = false;
      button.classList.remove('disabled');
    } else {
      buttonState = true;
      button.classList.add('disabled');
    }
    return buttonState;
  };

  const handleInputChange = ({ target }) => {
    const { id, value } = target;
    const buttonDisabled = validateButton();
    setLoginState({ ...loginState, [id]: value, buttonStatus: buttonDisabled });
  };

  const handleClick = () => {
    const { email } = loginState;
    const emailObj = {
      email,
    };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', `${JSON.stringify(emailObj)}`);
    history.push('/foods');
  };

  const { buttonStatus } = loginState;

  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>
      <div className="containerEmail">
        <label htmlFor="email">
          E-mail
          <input
            type="text"
            className="email"
            id="email"
            data-testid="email-input"
            onChange={ handleInputChange }
          />
        </label>
      </div>
      <div className="containerPassword">
        <label htmlFor="password">
          Password
          <input
            type="password"
            className="password"
            id="password"
            data-testid="password-input"
            onChange={ handleInputChange }
          />
        </label>
      </div>
      <button
        disabled={ buttonStatus }
        onClick={ handleClick }
        onChange={ () => handleChangeButton }
        type="button"
        className="btn first disabled"
        data-testid="login-submit-btn"
      >
        Enter

      </button>
    </div>
  );
}

// Login

export default Login;

import React from 'react';
import { Link } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <form name="registration" className="auth-form" onSubmit={handleSubmit}>
      <h2 className="auth-form__title">Регистрация</h2>
      <input
        className="auth-form__input"
        type="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleChangeEmail}
        autoComplete="off"
      />
      <input
        className="auth-form__input"
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={handleChangePassword}
        autoComplete="off"
      />
      <button type="submit" className="auth-form__submit-button">
        Зарегистрироваться
      </button>
      <p className="auth-form__text">
        Уже зарегистрированы?
        <Link to="/signin" className="auth-form__link">
          {' '}
          Войти
        </Link>
      </p>
    </form>
  );
}

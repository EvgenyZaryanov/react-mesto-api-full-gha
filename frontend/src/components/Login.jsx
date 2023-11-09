import React from 'react';

const Login = ({ handleLogIn }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    handleLogIn(email, password);
  };

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <form name="login" onSubmit={handleSubmit} className="auth-form">
      <h2 className="auth-form__title">Вход</h2>
      <input
        className="auth-form__input"
        type="email"
        name="email"
        placeholder="Email"
        autoComplete="off"
        value={email}
        onChange={handleChangeEmail}
        required
      />
      <input
        className="auth-form__input"
        type="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={handleChangePassword}
        autoComplete="off"
        required
      />
      <button type="submit" className="auth-form__submit-button">
        Войти
      </button>
    </form>
  );
};

export default Login;

// React.useEffect(() => {
//   const previousEmail = localStorage.getItem('userName');
//   const previousPassword = localStorage.getItem('userPassword');

//   previousEmail ? setUserEmail(previousEmail) : setUserEmail('');
//   previousPassword ? setUserPassword(previousPassword) : setUserPassword('');
// }, []);

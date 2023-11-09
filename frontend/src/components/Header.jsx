import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import logo from '../images/logo__image.svg';

function Header({ email, setLoggedIn }) {
  function handleLogOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const location = useLocation();

  return (
    <header className="header">
      <div className={`header__menu ${isMenuOpen && 'header__menu_opened'}`}>
        <span className="header__user-email">{email}</span>
        <button className="header__quit-button" onClick={handleLogOut}>
          Выйти
        </button>
      </div>
      <div className="header__container">
        <img src={logo} alt="Логотип Место России" className="header__logo" />
        {location.pathname === '/sign-in' && (
          <Link to="sign-up" className="header__link">
            Регистрация
          </Link>
        )}
        {location.pathname === '/sign-up' && (
          <Link to="sign-in" className="header__link">
            Войти
          </Link>
        )}
        {location.pathname === '/' && (
          <>
            <button
              className={`header__menu-button ${isMenuOpen && 'header__menu-button_opened'}`}
              type="button"
              onClick={toggleMenu}
            ></button>
            <nav className="header__auth-navigation">
              <p className="header__user-email">{email}</p>
              <button className="header__quit-button" onClick={handleLogOut}>
                Выйти
              </button>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

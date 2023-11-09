import '../index.css';
import React from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from '../components/ImagePopup.jsx';
import EditProfilePopup from '../components/EditProfilePopup.jsx';
import EditAvatarPopup from '../components/EditAvatarPopup.jsx';
import AddPlacePopup from '../components/AddPlacePopup.jsx';
import ConfirmDeletePopup from '../components/ConfirmDeletePopup.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api.js';
import { auth } from '../utils/auth.js';
//-------------------------------------------12-------------------------------------------------//
import ProtectedRouteElement from './ProtectedRoute.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';
import InfoTooltip from './InfoTooltip.jsx';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '', isOpen: false });
  const [selectedCardDelete, setSelectedCardDelete] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isSucceeded, setIsSucceeded] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getCards()
        .then(cards => {
          setCards(cards);
        })
        .catch(err => console.log(`Ой!...: ${err}`));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api
        .getUserInfo()
        .then(data => {
          setCurrentUser(data);
        })
        .catch(err => console.log(`Ой!...: ${err}`));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    const currentEmail = localStorage.getItem('userName');
    currentEmail ? setEmail(currentEmail) : setEmail('');
  }, []);

  const handleTokenCheck = jwt => {
    auth
      .checkToken(jwt)
      .then(res => {
        if (res) {
          setLoggedIn(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        console.log(`Ошибка доступа: ${err}`);
      });
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      handleTokenCheck(jwt);
    }
  }, []);

  const handleRegistration = (email, password) => {
    auth
      .register(email, password)
      .then(res => {
        if (!res || res.statusCode === 400) {
          setIsSucceeded(false);
          setInfoTooltipOpen(true);
        } else {
          setIsSucceeded(true);
          setInfoTooltipOpen(true);
          navigate('/', { replace: true });
        }
      })
      .catch(err => {
        setIsSucceeded(false);
        setInfoTooltipOpen(true);
        console.log(`Ошибка регистрации: ${err}`);
      });
  };

  const handleLogIn = (email, password) => {
    auth
      .login(email, password)
      .then(res => {
        if (res) {
          setLoggedIn(true);
          setEmail(email);
          navigate('/cards');
        }
      })
      .catch(err => {
        console.log(`Ошибка авторизации: ${err}`);
        setInfoTooltipOpen(true);
        setIsSucceeded(false);
      });
  };

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .changeUserInfo({ name, about })
      .then(resultUser => {
        setIsLoading(false);
        setCurrentUser(resultUser);
        closeAllPopups();
      })
      .catch(err => console.log(`Ошибка отправки данных на сервер: ${err}`));
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .changeAvatar(avatar)
      .then(avatar => setCurrentUser(avatar))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Ошибка обновления аватара: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .addCard({ name, link })
      .then(newCard => setCards([newCard, ...cards]))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Ошибка добавления новой карточки на сервер: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(id => id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(cardLike => setCards(state => state.map(c => (c._id === card._id ? cardLike : c))))
      .catch(err => console.log(`Ошибка поддержки лайков/дизлайков: ${err}`));
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(selectedCardDelete._id)
      .then(() => setCards(cards => cards.filter(c => c._id !== selectedCardDelete._id)))
      .then(() => closeAllPopups())
      .catch(err => console.log(`Ошибка удаления карточки: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setEmail('');
    navigate('/signin', { replace: true }).catch(err => console.log(`Ой!...: ${err}`));
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ link: card.link, name: card.name, isOpen: true });
  }

  function handleConfirmDeleteClick(card) {
    setConfirmDeletePopupOpen(!isConfirmDeletePopupOpen);
    setSelectedCardDelete(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setSelectedCard({ link: '', name: '', isOpen: false });
    setInfoTooltipOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header
          loggedIn={loggedIn}
          email={email}
          setLoggedIn={setLoggedIn}
          handleLogOut={handleLogOut}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleConfirmDeleteClick}
              />
            }
          />
          <Route path="/signup" element={<Register onRegister={handleRegistration} />} />
          <Route path="/signin" element={<Login handleLogIn={handleLogIn} />} />
          <Route path="*" element={!loggedIn ? <Navigate to="/signin" /> : <Navigate to="/" />} />
        </Routes>
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSucceeded={isSucceeded}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

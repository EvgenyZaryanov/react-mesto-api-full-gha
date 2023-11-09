import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__data">
          <button type="button" className="profile__update-avatar" onClick={onEditAvatar}>
            <img src={currentUser.avatar} alt="Аватар профиля" className="profile__avatar" />
          </button>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__details">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button profile__popup-add"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements" aria-label="Карточки с изображениями">
        {cards.map(card => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;

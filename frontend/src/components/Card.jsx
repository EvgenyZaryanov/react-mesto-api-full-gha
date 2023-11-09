import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(id => id === currentUser._id);

  const cardDeleteButtonClassName = `element__delete-button ${
    isOwn ? '' : 'element__delete-button_invisible'
  }`;

  const cardLikeButtonClassName = `element__like-button ${
    isLiked ? 'element__like-button_active' : ''
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="element">
      <img
        className="element__image"
        onClick={handleCardClick}
        src={card.link}
        title={card.name}
        alt={card.name}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        aria-label="Удалить"
        type="button"
      ></button>
      <div className="element__place">
        <h3 className="element__place-name">{card.name}</h3>
        <div className="element__like-attributes">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            aria-label="Лайк"
            type="button"
          ></button>
          <p className="element__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;

// const isOwn = card.owner._id === currentUser._id;
//   const isLiked = card.likes.some(i => i._id === currentUser._id);

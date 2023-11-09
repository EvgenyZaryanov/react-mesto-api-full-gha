import React from 'react';
import passRegistration from '../images/pass-registration-icon.svg';
import notPassRegistration from '../images/not-pass-icon.svg';

const InfoTooltip = ({ isOpen, onClose, isSucceeded }) => {
  return (
    <div className={`popup popup__infoTooltip ${isOpen && 'popup_opened'}`}>
      <div className="popup__container-infoTooltip">
        <button className="popup__close-button" type="button" onClick={onClose}></button>
        <img
          src={isSucceeded ? passRegistration : notPassRegistration}
          alt=""
          className="popup__infoTooltip-image"
        />
        <h2 className="popup__infoTooltip-text">
          {isSucceeded
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </h2>
      </div>
    </div>
  );
};
export default InfoTooltip;

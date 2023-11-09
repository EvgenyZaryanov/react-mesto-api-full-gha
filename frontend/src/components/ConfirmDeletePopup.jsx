import React from 'react';
import PopupWithForm from './PopupWithForm';

function ConfirmDeletePopup({ isOpen, onClose, onDeleteCard, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <PopupWithForm
      name="deleteCard"
      title="Вы уверены?"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Удаление...' : 'Да'}
    />
  );
}

export default ConfirmDeletePopup;

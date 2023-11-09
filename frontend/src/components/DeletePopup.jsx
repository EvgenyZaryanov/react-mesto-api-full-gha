import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeleteCard(props.isOpen);
    props.onClose();
  }

  return (
    <PopupWithForm
      name="deleteCard "
      title="Вы уверены?"
      submit="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeletePopup;

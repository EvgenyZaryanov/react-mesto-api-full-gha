import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleAddCardName(e) {
    setName(e.target.value);
  }

  function handleAddCardLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Создать'}
    >
      <input
        name="item-name"
        className="popup__input"
        id="newCardName-input"
        placeholder="Название"
        type="text"
        value={name}
        onChange={handleAddCardName}
        minLength="2"
        maxLength="30"
        required
      />
      <p className="popup__span-paragraph"></p>
      <span className="popup__input-error"></span>
      <input
        name="item-link"
        className="popup__input popup__input_url_card"
        id="newCardLink-input"
        placeholder="Ссылка на картинку"
        type="url"
        value={link}
        onChange={handleAddCardLink}
        required
      />
      <p className="popup__span-paragraph"></p>
      <span className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

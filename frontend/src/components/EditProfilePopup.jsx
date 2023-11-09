import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="add-form"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? 'Сохранение...' : 'Сохранить'}
    >
      <input
        className="popup__input"
        name="profileName"
        id="profileName-input"
        placeholder="Имя"
        type="text"
        value={name || ''}
        onChange={handleChangeName}
        minLength="2"
        maxLength="40"
        required
      />
      <p className="popup__span-paragraph"></p>
      <span className="popup__input-error"></span>
      <input
        className="popup__input"
        name="profileDetails"
        id="profileDetails-input"
        placeholder="О себе"
        type="text"
        value={description || ''}
        onChange={handleChangeAbout}
        minLength="2"
        maxLength="200"
        required
      />
      <p className="popup__span-paragraph"></p>
      <span className="popup__input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;

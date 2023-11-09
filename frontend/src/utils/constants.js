//---------------------ОБЩИЕ-------------------//
export const token = '2386186e-8350-4225-ade5-72f6caee8811';

export const buttonOpenProfileAvatar = document.querySelector('.profile__avatar');
export const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
export const buttonOpenPopupAddNewCard = document.querySelector('.profile__add-button');
export const popupFormProfile = document.querySelector('#profilePopup');
export const formAddNewCard = document.querySelector('#addNewCardPopup');
export const popupAvatar = document.querySelector('.popup_avatar');
export const openPopupWithImage = document.querySelector('#fullImagePopup');
export const elementDeleteButton = document.querySelector('.element__delete-button');
export const inputNameFormProfile = document.querySelector('#profileName-input');
export const inputDetailsFormProfile = document.querySelector('#profileDetails-input');
// export const popupAddNewCard = document.querySelector('#addNewCardPopup');
export const containerCardElementsSelector = document.querySelector('.elements');
export const userNameSelector = document.querySelector('.profile__name');
export const userAboutSelector = document.querySelector('.profile__details');
// export const userAvatarSelector = document.querySelector('.profile__avatar');
export const popupAddPlaceSelector = document.querySelector('.popup-add');
// export const popupElementAddButton = document.querySelector('.profile__add-button');
export const popupEditProfileSelector = document.querySelector('.popup-edit');
export const avatarFormButton = document.querySelector('#profile__avatar-button');

//------переменные для валидации----------//
export const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: '.popup__input-error',
  errorClass: '.popup__input-error'
};

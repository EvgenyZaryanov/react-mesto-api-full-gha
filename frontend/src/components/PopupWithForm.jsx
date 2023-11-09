import { usePopupClose } from '../hooks/usePopupClose.js';

function PopupWithForm({ title, name, children, buttonText, isOpen, onClose, onSubmit }) {
  usePopupClose(isOpen, onClose);
  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className={`popup__container popup__container_${name}`}>
        <button
          className={`popup__close-button popup__close-button_${name}`}
          type="button"
          onClick={onClose}
        />
        <form className={`popup__form popup__form_${name}`} onSubmit={onSubmit} noValidate>
          <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
          {children}
          <button className="popup__submit-button " type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

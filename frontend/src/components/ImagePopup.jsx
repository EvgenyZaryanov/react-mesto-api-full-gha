import { usePopupClose } from '../hooks/usePopupClose.js';

function ImagePopup({ card, onClose }) {
  usePopupClose(card?.link, onClose);
  return (
    <div className={`popup popup_overlay ${card.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_zoom">
        <button
          className="popup__close-button popup__close-button_fullImage"
          onClick={onClose}
          type="button"
        />
        <img className="popup__fullImage" src={card.link} alt={card.name} />
        <figcaption className="popup__fullImageTitle">{card.name}</figcaption>
      </div>
    </div>
  );
}

export default ImagePopup;

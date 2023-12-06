import React from 'react';

function ImagePopup({card, onClose}) {
    return (
        <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
            <div className="popup__content-image">
                <button
                    aria-label="Закрыть"
                    type="button"
                    className="popup__close-button popup__close-button_type_image"
                    onClick={onClose} />
                <img src={card?.link} alt={card?.name} className="popup__image" />
                <p className="popup__text">{card?.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;
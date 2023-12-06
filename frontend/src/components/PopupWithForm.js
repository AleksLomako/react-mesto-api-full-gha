import React from 'react';

function PopupWithForm({name, title, isOpen, onClose, children, button, onSubmit}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__content">
                <button
                    aria-label="Закрыть"
                    type="button"
                    className="popup__close-button"
                    onClick={onClose} />
                <h2 className="popup__title">{title}</h2>
                <form
                    name={`${name}`}
                    className={`popup__form popup__form_type${name}`}
                    onSubmit={onSubmit}
                >
                    <div className="popup__form-container">
                        {children}
                    </div>
                    <button
                        type="submit" className="popup__save-button">{button}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;
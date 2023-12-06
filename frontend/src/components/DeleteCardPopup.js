import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup({ isOpen, onClose, card, onSubmit }) {

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(card)
    }

    return (
        <PopupWithForm
            name="card-delete"
            title="Вы уверены?"
            button="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        />
    )
}

export default DeleteCardPopup;
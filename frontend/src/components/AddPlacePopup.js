import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [placeName, setPlacename] = useState('');
    const [placeLink, setPlaceLink] = useState('');

    useEffect(() => {
        setPlacename('');
        setPlaceLink('')
    }, [isOpen]);

    function handlePlaceNameChange(e) {
        setPlacename(e.target.value);
    }
    function handlePlaceLinkChange(e) {
        setPlaceLink(e.target.value);
    }
    function handleSubmitPlace(e) {
        e.preventDefault();
        onAddPlace({
            name: placeName,
            link: placeLink
        })
    }

    return (
        <PopupWithForm name="place" title="Новое место" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmitPlace} button="Создать">
            <input className="popup__input" onChange={handlePlaceNameChange} value={placeName} id="place-name" name="place-name" placeholder="Название" type="text" minLength={2} maxLength={30} required />
            <span className="popup__input-error place-name-error" />
            <input className="popup__input" onChange={handlePlaceLinkChange} value={placeLink} id="place-link" name="place-link" placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__input-error place-link-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;
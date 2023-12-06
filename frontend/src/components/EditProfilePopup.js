import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useEffect, useState } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description
        })
    }
    return (
        <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} button="Сохранить">
            <input className="popup__input" type="text" value={name || ''} onChange={handleNameChange} id="name" name="name" placeholder="Имя" minLength={2} maxLength={40} required />
            <span className="popup__input-error name-error" />
            <input className="popup__input" type="text" value={description || ''} onChange={handleDescriptionChange} id="about" name="about" placeholder="Профессия" minLength={2} maxLength={200} required />
            <span className="popup__input-error about-error" />
        </PopupWithForm>
    )
}
export default EditProfilePopup;
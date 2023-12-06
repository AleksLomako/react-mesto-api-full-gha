import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useRef } from "react";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value
        })
    }
    return (
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} button="Сохранить">
            <input ref={avatarRef} className="popup__input" id="avatar-link" name="avatar-link" placeholder="Ссылка на картинку" type="url" required />
            <span className="popup__input-error avatar-link-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
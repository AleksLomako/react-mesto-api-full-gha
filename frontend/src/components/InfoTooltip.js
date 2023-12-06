import React from 'react';
import successImg from '../images/Icon-success.svg';
import errorImg from '../images/Icon-error.svg';

function InfoTooltip({ isOpen, onClose, isLoginCorrect}) {
    return (
        <div className={`popup  ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content popup__content_tooltip">
                <button
                    aria-label="Закрыть"
                    type="button"
                    className="popup__close-button"
                    onClick={onClose} />
                <img
                    src={isLoginCorrect ? successImg : errorImg}
                    alt={isLoginCorrect ? "Успешная регистрация" : "Неуспешная регистрация"}
                    className="popup__login-img"
                />
                <h2 className="popup__title popup__title_tooltip">
                    {isLoginCorrect
                        ? "Вы успешно зарегистрировались!"
                        : "Что-то пошло не так! Попробуйте ещё раз."}
                </h2>
            </div>
        </div>
    )
}

export default InfoTooltip;
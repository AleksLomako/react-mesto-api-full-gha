import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(card) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;  // Определяем, являемся ли мы владельцем текущей карточки
    const isLiked = card.likes.some((i) => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const cardLikeButtonClassName = (`card__like ${isLiked && 'card__like_active'}`);

    function handleClick() {
        card.onCardClick(card);
    }
    function handleDeleteClick() {
        card.onCardDelete(card.card._id);
    }
    function handleLikeClick() {
        card.onCardLike(card.card)
    }

    return (
        <article className="card">
            <img className="card__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick} />
            {isOwn && <button aria-label="Удалить" className="card__delete" onClick={handleDeleteClick} />}
            <div className="card__item">
                <h2 className="card__title">{card.name}</h2>
                <div>
                    <button aria-label="Лайк" className={cardLikeButtonClassName} onClick={handleLikeClick} />
                    <p className="card__likes">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;
import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import editAvatar from '../images/edit_avatar.svg';
import Card from './Card';

function Main({cards, onAddPlace, onEditProfile, onEditAvatar, onCardClick, onCardDelete, onCardLike}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__card">
                    <div className="profile__avatar">
                        <img
                            src={currentUser.avatar}
                            alt="Фото"
                            className="profile__image-avatar"
                        />
                        <img
                            onClick={onEditAvatar}
                            src={editAvatar} alt="карандаш"
                            className="profile__edit-avatar"
                        />
                    </div>
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button
                            onClick={onEditProfile}
                            aria-label="Редактировать"
                            type="button"
                            className="profile__edit-button"
                        />
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button
                    onClick={onAddPlace}
                    aria-label="Добавить"
                    type="button"
                    className="profile__add-button"
                />
            </section>
            <section className="photo-cards">
                {cards.map(card => (
                    <Card
                        key={card._id}
                        id={card._id}
                        owner={card.owner}
                        card={card}
                        link={card.link}
                        name={card.name}
                        likes={card.likes}
                        onCardClick={onCardClick}
                        onCardDelete={onCardDelete}
                        onCardLike={onCardLike}
                        />
                ))}
            </section>
        </main>
    )
}

export default Main;

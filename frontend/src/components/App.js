import React from 'react';
import { Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/api';
import auth from '../utils/auth';

function App() {

  //Стейты
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccessRegistration, setIsSuccessRegistration] = useState(false); //Состояние регистрации
  const [userEmail, setUserEmail] = useState(''); //E-mail/Вход/Регистрация в шапке профиля
  const navigate = useNavigate();

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false); //Попап с подсказкой о регистрации
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false); //Попап редактирования профиля
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false); //Попап редактирования карточки
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); //Попап редактирования аватара
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false); //Попап удаления карточки

  const [selectedCard, setSelectedCard] = useState(null); //Попап с картинкой
  const [currentUser, setCurrentUser] = useState({});  //Данные текущего пользователя
  const [cards, setCards] = useState([]); //Инициализация карточек
  const [deletedCard, setDeletedCard] = useState(null);// Удаление карточки

  //Проверка токена
  useEffect(() => {
    tockenCheck()
  }, []);

  // Загрузка данных карточек и профиля
  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo().then(res => {
        setCurrentUser(res)
      })
        .catch((err) => {
          console.log(err);
        });
      api.getInitialCards().then(res => {
        setCards(res);
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  //Открытие попапов
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }
  function handleDeleteCardClick(cardItem) {
    setDeletedCard(cardItem);
    setIsDeleteCardPopupOpen(true);
  }
  function handleSuccessRegistration() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }

  //Закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  // Удаление карточки
  function handleCardDelete(id) {
    api.deleteCard(id).then(() => {
      const newCards = cards.filter((c) => c._id !== id)
      setCards(newCards);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }
  // Лайк и дизлайк карточки
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api.likeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
      })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api.dislikeCard(card._id).then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)))
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //Обработчик данных пользователя
  function handleUpdateUser(user) {
    api.changeUserInfo(user.name, user.about).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  //Обработчик редактирования аватара
  function handleUpdateAvatar(data) {
    api.changeAvatar(data).then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }

  //Обработчик сохранения карточки
  function handleAddPlaceSubmit(place) {
    api.addNewCard(place.name, place.link).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
      .catch((err) => {
        console.log(err);
      });
  }
  //Обработчик проверки Токена
  function tockenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkTocken(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.data.email);
            setLoggedIn(true);
            navigate('/', { replace: true })
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  //Обработчик регистрации
  function handleRegister(data) {
    auth.register(data)
      .then((res) => {
        setIsSuccessRegistration(true);
        handleSuccessRegistration();
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessRegistration(false);
      })
  }

  //Обработчик входа в приложение
  function handleLogin(data) {
    auth.authorize(data)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(data.email);
        localStorage.setItem('jwt', res.token);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
        setIsSuccessRegistration(false);
        handleSuccessRegistration();
      })
  }

  //Обработчик выхода из приложения
  function handleSignOut() {
    localStorage.removeItem('jwt')
    navigate('/signin', { replace: true })
    setLoggedIn(false)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header isLoginCorrect={loggedIn} onSignOut={handleSignOut} userEmail={userEmail} />
        <Routes>
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route path="/" element={
            <ProtectedRoute
              component={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardDelete={handleDeleteCardClick}
              onCardLike={handleCardLike}
              cards={cards} />
          }>
          </Route>
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          card={deletedCard}
          onSubmit={handleCardDelete}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isLoginCorrect={isSuccessRegistration}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;




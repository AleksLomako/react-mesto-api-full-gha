import React from 'react';
import headerLogo from '../images/header_logo.svg';
import { Link, useLocation } from 'react-router-dom';


function Header({ onSignOut, userEmail, isLoginCorrect }) {

    const location = useLocation();

    return (
        <header className="header">
            <img src={headerLogo} alt="Mesto Russia" className="header__logo" />
            {location.pathname === '/sign-in' && (
                <Link to="/sign-up" className="header__sign">
                    Регистрация
                </Link>
            )}
            {location.pathname === '/sign-up' && (
                <Link to="/sign-in" className="header__sign">
                    Вход
                </Link>
            )}
            {isLoginCorrect ? (
                <div className="header__auth">
                    <p className="header__email">{userEmail}</p>
                    <button className="header__sign header__sign_out" onClick={onSignOut}>
                        Выйти
                    </button>
                </div>
            ) : (
                ''
            )}
        </header>
    )
}

export default Header;
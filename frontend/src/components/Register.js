import React from 'react';
import LoginForm from './LoginForm';
import { useState } from "react";
import { Link } from 'react-router-dom';

function Register({ onRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const linkRegistration = (
        <p className="login-form__registration">Уже зарегистрированы?&nbsp;
            <Link className="login-form__link" to="sign-in">Войти</Link>
        </p>
    )

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmitRegistration(e) {
        e.preventDefault();
        onRegister({
            email: email,
            password: password
        })
    }

    return (
        <LoginForm
            title="Регистрация"
            button="Зарегистрироваться"
            onSubmit={handleSubmitRegistration}
            linkRegistration={linkRegistration}>
            <input className="popup__input popup__input_sign"
                type="email"
                id="login-email"
                name="login-email"
                placeholder="Email"
                minLength={2}
                maxLength={30}
                required
                value={email}
                onChange={handleEmailChange} />
            <input className="popup__input popup__input_sign"
                type="password"
                id="login-password"
                name="login-password"
                placeholder="Пароль"
                minLength={2}
                maxLength={30}
                required
                value={password}
                onChange={handlePasswordChange} />
        </LoginForm>
    )
}

export default Register;
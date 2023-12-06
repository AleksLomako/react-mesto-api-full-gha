import React from 'react';
import LoginForm from './LoginForm';
import { useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmitLogin(e) {
        e.preventDefault();
        
        onLogin({
            email: email,
            password: password
        });
    }

    return (
        <LoginForm
            title="Вход"
            button="Войти"
            onSubmit={handleSubmitLogin}
        >
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

export default Login;
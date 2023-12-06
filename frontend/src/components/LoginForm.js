import React from 'react';

function LoginForm({ title, children, button, onSubmit, linkRegistration }) {

    return (
        <form className="login-form" onSubmit={onSubmit} >
            <h2 className="popup__title popup__title_sign">{title}</h2>
            {children}
            <button
                type="submit"
                className="popup__save-button popup__save-button_sign">{button}</button>
            {linkRegistration}
        </form>


    )

}

export default LoginForm;
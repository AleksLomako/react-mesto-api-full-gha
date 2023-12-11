class Api {
    constructor(options) {
        this._options = options;
        this._baseUrl = this._options.url;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    setAuthorizationHeader(jwt) {
        this._headers = {
            ...this._headers,
            authorization: `Bearer ${jwt}`,
        };
    }


    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    getInitialCards() {
        return this._request(`${this._baseUrl}/cards`, { headers: this._headers })
            .then((result) => {
                return result
            })
    }

    getUserInfo() {
        console.log(this._headers);
        return this._request(`${this._baseUrl}/users/me`, { headers: this._headers })
            .then((result) => {
                return result
            })
    }

    changeUserInfo(name, about) {
        return this._request(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then((result) => {
            return result
        })
    }

    changeAvatar(link_avatar) {
        return this._request(`${this._baseUrl}/users/me/avatar`,{
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link_avatar.avatar
            })
        })
        .then((result) => {
            return result
        })
    }

    addNewCard(name, link) {
        return this._request(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then((result) => {
            return result
        })
    }

    deleteCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}`,
        {
            method: 'DELETE',
            headers: this._headers
        })
        .then((result) => {
            return result
        })
    }

    likeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`,
        {
            method: 'PUT',
            headers: this._headers
        })
        .then((result) => {
            return result
        })
    }

    dislikeCard(cardId) {
        return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE', 
            headers: this._headers
        })
        .then((result) => {
            return result
        })
    }
}

const api = new Api({
    url: 'https://api.alekslomako.mesto.nomoredomainsmonster.ru',
    headers: {
        // authorization: '85766c71-5b2d-4633-aac9-ecd12aeaf051',
        'Content-Type': 'application/json'
    }
});

export default api;
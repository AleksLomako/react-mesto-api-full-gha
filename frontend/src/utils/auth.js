class Auth {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    register(data) {
        console.log("registration", data)
        return this._request(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
    }

    authorize(data) {
        console.log("auth", data)
        return this._request(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
    }

    checkTocken(token) {
        console.log(token);
        return this._request(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                // headers: this._headers,
                ...this._headers,
                Authorization: `Bearer ${token}`
            }
        })
    }
}

const auth = new Auth({
    baseUrl: 'https://api.alekslomako.mesto.nomoredomainsmonster.ru', 
    headers: {
        'Content-Type': 'application/json'
    }
})

export default auth;
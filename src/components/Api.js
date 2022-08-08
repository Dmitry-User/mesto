export default class Api {

  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._headers = settings.headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._getResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(this._getResponse)
  }

  setAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userData.avatar
      })
    })
    .then(this._getResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(this._getResponse)
  }

  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._getResponse)
  }

  deleteCard(cardData) {
    return fetch(`${this._baseUrl}/cards/${cardData._id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponse)
  }

  addLike(cardData) {
    return fetch(`${this._baseUrl}/cards/${cardData._id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._getResponse)
  }

  removeLike(cardData) {
    return fetch(`${this._baseUrl}/cards/${cardData._id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponse)
  }
}
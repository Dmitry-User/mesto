export default class Api {

  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._token = settings.token;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._getResponse)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._getResponse)
  }

  setAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: userData.avatar
      })
    })
    .then(this._getResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(this._getResponse)
  }

  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link
      })
    })
    .then(this._getResponse)
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(this._getResponse)
  }

  putLike(cardData) {
    return fetch(`${this._baseUrl}/cards/${cardData._id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._token,
      }
    })
    .then(this._getResponse)
  }

  removeLike(cardData) {
    return fetch(`${this._baseUrl}/cards/${cardData._id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then(this._getResponse)
  }

}
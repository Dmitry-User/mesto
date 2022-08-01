
import { configApi } from "../utils/constants.js";
class Api {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._key = settings.key;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._key
      }
    })
    .then(this._getResponse)
  }

  setUserInfo(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
    .then(this._getResponse)
  }

  setAvatar(userData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._key,
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
        authorization: this._key
      }
    })
    .then(this._getResponse)
  }

  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._key,
        'Content-Type': 'application/json'
      },
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
      headers: {
        authorization: this._key,
        'Content-Type': 'application/json'
      }
    })
    .then(this._getResponse)
  }
  // другие методы работы с API
}

export const api = new Api(configApi);
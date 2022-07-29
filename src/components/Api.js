export default class Api {

  constructor(settings) {
    // тело конструктора
    this._cohort = settings.cohort;
    this._key = settings.key;
  }

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${this._cohort}/cards`, {
      headers: {
        authorization: this._key
      }
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserInfo() {

    return fetch(`https://nomoreparties.co/v1/${this._cohort}/users/me`, {
      headers: {
        authorization: this._key
      }
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .catch((err) => {
      console.log(err);
    })

  }

  // другие методы работы с API
}

export default class Api {

  constructor() {
    // тело конструктора
    
  }

  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-47/cards', {
      headers: {
        authorization: '5755190e-89aa-4139-b42f'
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
    this._nameUser = document.querySelector('.profile__name');
    this._aboutUser = document.querySelector('.profile__about');
    this._avatarUser = document.querySelector('.profile__avatar');

    return fetch('https://nomoreparties.co/v1/cohort-47/users/me', {
      headers: {
        authorization: '5755190e-89aa-4139-b42f'
      }
    })

    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .then(res => {
      this._nameUser.textContent = res.name;
      this._aboutUser.textContent = res.about;
      this._avatarUser.src = res.avatar;
    })

    .catch((err) => {
      console.log(err);
    })
  }

  // другие методы работы с API
}

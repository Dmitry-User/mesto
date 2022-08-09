export default class UserInfo {

  constructor(selectors) {
    this._name = document.querySelector(selectors.nameUser);
    this._about = document.querySelector(selectors.aboutUser);
    this._avatar = document.querySelector(selectors.avatarUser);
  }

  setUserInfo( { name, about, avatar} ) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }

  getUserInfo() {
    const user = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return user;
  }
}
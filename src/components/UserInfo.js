export default class UserInfo {

  constructor(userData) {
    this._name = document.querySelector(userData.nameUser);
    this._about = document.querySelector(userData.aboutUser);
    this._avatar = document.querySelector(userData.avatarUser);
  }

  setUserInfo(user) {
    this._name.textContent = user.name;
    this._about.textContent = user.about;
    this._avatar.src = user.avatar;
  }

  getUserInfo() {
    const user = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return user;
  }
}
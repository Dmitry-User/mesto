export default class UserInfo {
  constructor(userData) {
    this._name = document.querySelector(userData.nameUser);
    this._about = document.querySelector(userData.aboutUser);
  }

  setUserInfo(user) {
    this._name.textContent = user.name;
    this._about.textContent = user.about;
  }
  
  getUserInfo() {
    const user = {
      name: this._name.textContent,
      about: this._about.textContent,
    };
    return user;
  }
}
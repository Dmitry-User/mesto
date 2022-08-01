import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {

  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__submit');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(item => {
      inputValues[item.name] = item.value;
    });
    return inputValues;
  }

  setInputValues(userData) {
    this._inputList.forEach(item => {
      item.value = userData[item.name];
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoading(isLoading, initialButton) {
    isLoading
    ? this._buttonSubmit.textContent = 'Сохранение...'
    : this._buttonSubmit.textContent = initialButton;
  }

  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListener();
  }
}
import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {

  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._buttonSubmit = this._form.querySelector('.popup__submit');
    this._initialButtonSubmit = this._buttonSubmit.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(item => {
      this._inputValues[item.name] = item.value;
    });
    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach(item => {
      item.value = data[item.name];
    });
  }

  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListener();
  }

  renderLoading(isLoading, text) {
    isLoading
    ? this._buttonSubmit.textContent = text
    : this._buttonSubmit.textContent = this._initialButtonSubmit;
  }

  close() {
    this._form.reset();
    super.close();
  }
}
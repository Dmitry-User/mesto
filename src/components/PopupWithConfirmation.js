import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {

  constructor(popupSelector, handleSubmitConfirm) {
    super(popupSelector);
    this._handleSubmitConfirm = handleSubmitConfirm;
    this._form = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__submit');
  }

  open(cardData) {
    this._card = cardData;
    super.open();
  }

  setEventListeners() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault();
      this._handleSubmitConfirm(this._card);
    });
    super.setEventListener();
  }

  renderLoading(isLoading) {
    isLoading
    ? this._buttonSubmit.textContent = 'Удаление...'
    : this._buttonSubmit.textContent = 'Да';
  }
}
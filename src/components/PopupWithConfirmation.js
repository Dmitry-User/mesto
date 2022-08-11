import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {

  constructor(popupSelector, handleSubmitConfirm) {
    super(popupSelector);
    this._handleSubmitConfirm = handleSubmitConfirm;
    this._form = this._popup.querySelector('.popup__form');
    this._buttonSubmit = this._form.querySelector('.popup__submit');
    this._handleEnterSubmitConfirm = this._handleEnterSubmitConfirm.bind(this);
  }

  _handleEnterSubmitConfirm(evt) {
    if (evt.key === 'Enter') {
      this._handleSubmitConfirm(this._card);
    }
  }

  open(cardData) {
    this._card = cardData;
    document.addEventListener('keydown', this._handleEnterSubmitConfirm);
    super.open();
  }

  close() {
    document.removeEventListener('keydown', this._handleEnterSubmitConfirm);
    super.close();
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
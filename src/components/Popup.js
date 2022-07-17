export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_is-open');
    document.addEventListener('keydown', () => {
      this._handleEscClose();
    });
  }

  close() {
    this._popup.classList.remove('popup_is-open');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  setEventListener() {
    this._popup.addEventListener('mousedown', () => {
      
    });
  }
}
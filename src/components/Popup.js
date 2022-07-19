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
    document.addEventListener('keydown', evt => {
      this._handleEscClose(evt);
    });
  }

  close() {
    this._popup.classList.remove('popup_is-open');
    document.removeEventListener('keydown', evt => {
      this._handleEscClose(evt);
    });
  }

  setEventListener() {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_is-open')
        ||evt.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}
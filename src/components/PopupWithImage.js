import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup__image');
    this._captionPopup = this._popup.querySelector('.popup__image-caption');
  }

  open(link, name) {
    this._imagePopup.src = link;
    this._imagePopup.alt = `Фото ${name}.`;
    this._captionPopup.textContent = name;
    super.open();
  }
}
import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imagePopup = this._popup.querySelector('.popup__image');
    this._captionPopup = this._popup.querySelector('.popup__image-caption');
  }

  open(item) {
    this._imagePopup.src = item.link;
    this._imagePopup.alt = `Фото ${item.name}.`;
    this._captionPopup.textContent = item.name;

    super.open();
  }
}
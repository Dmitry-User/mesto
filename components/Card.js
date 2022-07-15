export default class Card {

  constructor (cardData, cardSelector, openCardPopup) {
    this._cardElement = cardData;
    this._cardSelector = cardSelector;
    this._openCardPopup = openCardPopup;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _handleLikeButton() {
    this._buttonLike.classList.toggle('card__like_active');
  }

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners () {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteButton();
    });
    this._imageElement.addEventListener('click', () => {
      this._openCardPopup(this._cardElement);
    });
  }

  generateCard () {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.card__like');
    this._buttonDelete = this._element.querySelector('.card__delete')
    this._imageElement = this._element.querySelector('.card__image');
    
    this._imageElement.src = this._cardElement.link;
    this._element.querySelector('.card__title').textContent = this._cardElement.name;
    this._imageElement.alt = `Фото ${this._cardElement.name}.`;

    this._setEventListeners();

    return this._element;
  }

}
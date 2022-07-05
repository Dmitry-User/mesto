export default class Card {

  constructor (dataCard, cardSelector, openCardPopup) {
    this._name = dataCard.name;
    this._link = dataCard.link;
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
    const likeElement = this._element.querySelector('.card__like');
    likeElement.classList.contains('card__like_active')
      ? likeElement.classList.remove('card__like_active')
      : likeElement.classList.add('card__like_active');
  }
  
  _handleDeleteButton() {
    this._element.remove();
  }

  _setEventListeners () {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._handleDeleteButton();
    });
    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._openCardPopup(this._name, this._link);
    });
  }

  generateCard () {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.card__title').textContent = this._name;
    const imageElement = this._element.querySelector('.card__image');
    imageElement.src = this._link;
    imageElement.alt = `Фото ${this._name}.`;

    return this._element;
  }

}
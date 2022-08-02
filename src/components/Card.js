export default class Card {

  constructor (cardData, userId, cardSelector, handleCardClick, handleDeleteCard) {
    this._cardElement = cardData;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
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
    this._userId === this._cardElement.owner._id
    ? this._buttonLike.classList.add('card__like_active')
    : this._buttonLike.classList.remove('card__like_active');
  }

  _handleLikeButton() {
    this._buttonLike.classList.toggle('card__like_active');
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }
  
  _hideDeleteButton() {
    this._userId === this._cardElement.owner._id
    ? this._buttonDelete.classList.remove('card__delete_is-hide')
    : this._buttonDelete.classList.add('card__delete_is-hide');
  }



  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeButton());
    this._buttonDelete.addEventListener('click', () => this._handleDeleteCard());
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardElement));
  }



  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._buttonLike = this._card.querySelector('.card__like');
    this._buttonDelete = this._card.querySelector('.card__delete')

    this._cardImage.src = this._cardElement.link;
    this._cardTitle.textContent = this._cardElement.name;
    this._cardImage.alt = `Фото ${this._cardElement.name}.`;

    this._hideDeleteButton();
    this._setEventListeners();

    return this._card;
  }
}
export default class Card {

  constructor (cardData, userId, cardSelector, handleCardClick) {
    this._cardElement = cardData;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

  _handleDeleteButton() {
    this._element.remove();
    this._element = null;
  }
  
  _hideDeleteButton() {
    this._userId === this._cardElement.owner._id
    ? this._buttonDelete.classList.remove('card__delete_is-hide')
    : this._buttonDelete.classList.add('card__delete_is-hide');
  }



  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => {
      this._handleLikeButton();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeleteButton();
    });
    this._imageElement.addEventListener('click', () => {
      this._handleCardClick(this._cardElement);
    });
  }



  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.card__like');
    this._buttonDelete = this._element.querySelector('.card__delete')
    this._imageElement = this._element.querySelector('.card__image');


    this._imageElement.src = this._cardElement.link;
    this._element.querySelector('.card__title').textContent = this._cardElement.name;
    this._imageElement.alt = `Фото ${this._cardElement.name}.`;
    
    this._hideDeleteButton();
    this._setEventListeners();
    return this._element;
  }


}
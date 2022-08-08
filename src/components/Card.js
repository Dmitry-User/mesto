export default class Card {

  constructor
    (
      cardData,
      userId,
      cardSelector,
      handleCardClick,
      handleDeleteCard,
      handleLike
    ) {
    this.cardData = cardData;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLike = handleLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _addLike() {
    this._buttonLike.classList.add('card__like_active');
  }

  _deleteLike() {
    this._buttonLike.classList.remove('card__like_active');
  }

  _setCountLikes(cardData) {
    this._countLike.textContent = cardData.likes.length;
  }

  isLiked() {
    const likeActive = this._buttonLike.classList.contains('card__like_active');
    return likeActive;
  }

  _rendererUserLike() {
    this.cardData.likes.forEach(user => {
      user._id === this._userId
      ? this._addLike()
      : this._deleteLike();
    })
  }

  updateLikes(cardData) {
    this.isLiked()
    ? this._deleteLike()
    : this._addLike();
    this._setCountLikes(cardData);
  }

  _isOwner() {
    if (this._userId !== this.cardData.owner._id) {
      this._buttonDelete.remove();
      this._buttonDelete = null;
    }
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLike(this));
    this._buttonDelete.addEventListener('click', () => this._handleDeleteCard(this));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this));
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._buttonLike = this._card.querySelector('.card__like');
    this._countLike = this._card.querySelector('.card__like-count');
    this._buttonDelete = this._card.querySelector('.card__delete');

    this._cardImage.src = this.cardData.link;
    this._cardTitle.textContent = this.cardData.name;
    this._cardImage.alt = `Фото ${this.cardData.name}.`;

    this._setEventListeners();
    this._setCountLikes(this.cardData);
    this._rendererUserLike();
    this._isOwner();

    return this._card;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }
}
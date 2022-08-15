export default class Card {

  constructor
    (
      { likes, link, name, owner, _id },
      userId,
      cardSelector,
      handleCardClick,
      handleDeleteCard,
      handleLike
    ) {
    this._likes = likes;
    this.link = link;
    this.name = name;
    this._owner = owner;
    this.cardId = _id;
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

  isLiked() {
    const likeActive = this._buttonLike.classList.contains('card__like_active');
    return likeActive;
  }

  _setCountLikes(item) {
    this._countLike.textContent = item.length;
  }

  updateLikes(item) {
    this.isLiked()
    ? this._deleteLike()
    : this._addLike();
    this._setCountLikes(item.likes);
  }

  _rendererUserLike() {
    this._likes.forEach(user => {
      user._id === this._userId
      ? this._addLike()
      : this._deleteLike();
    })
  }

  _isOwner() {
    if (this._userId !== this._owner._id) {
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

    this._cardImage.src = this.link;
    this._cardTitle.textContent = this.name;
    this._cardImage.alt = `Фото ${this.name}.`;

    this._rendererUserLike();
    this._setCountLikes(this._likes);
    this._setEventListeners();
    this._isOwner();

    return this._card;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }
}
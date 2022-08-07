export default class Card {

  constructor
    (
      cardData,
      userId,
      cardSelector,
      handleCardClick,
      handleDeleteCard,
      handlePutLike,
      handleRemoveLike
    ) {
    this._cardElement = cardData;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handlePutLike = handlePutLike;
    this._handleRemoveLike = handleRemoveLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  _isLike() {
    this._buttonLike.classList.add('card__like_active');
  }

  _isDislike() {
    this._buttonLike.classList.remove('card__like_active');
  }

  _rendererUserLike() {
    this._cardElement.likes.forEach(user => {
      user._id === this._userId
      ? this._isLike()
      : this._isDislike();
    })
  }

  _setCountLikes(cardData) {
    this._countLike.textContent = cardData.likes.length;
  }

  _putLike() {
    this._handlePutLike(this._cardElement)
      .then((cardData) => {
        this._isLike();
        this._setCountLikes(cardData);
      })
      .catch(err => console.log(err))
  }

  _removeLike() {
    this._handleRemoveLike(this._cardElement)
      .then((cardData) => {
        this._isDislike();
        this._setCountLikes(cardData);
      })
      .catch(err => console.log(err))
  }

  _handleLikeButton() {
    this._buttonLike.classList.contains('card__like_active')
    ? this._removeLike()
    : this._putLike();
  }

  _isOwner() {
    if (this._userId !== this._cardElement.owner._id) {
      this._buttonDelete.remove();
      this._buttonDelete = null;
    }
  }

  _setEventListeners() {
    this._buttonLike.addEventListener('click', () => this._handleLikeButton());
    this._buttonDelete.addEventListener('click', () => this._handleDeleteCard(this));
    this._cardImage.addEventListener('click', () => this._handleCardClick(this._cardElement));
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._buttonLike = this._card.querySelector('.card__like');
    this._countLike = this._card.querySelector('.card__like-count');
    this._buttonDelete = this._card.querySelector('.card__delete');

    this._cardImage.src = this._cardElement.link;
    this._cardTitle.textContent = this._cardElement.name;
    this._cardImage.alt = `Фото ${this._cardElement.name}.`;

    this._setEventListeners();
    this._setCountLikes(this._cardElement);
    this._rendererUserLike();
    this._isOwner();

    return this._card;
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }
}
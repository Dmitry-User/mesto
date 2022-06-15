const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const formEditProfileElement = document.querySelector('.popup__form_type_edit-profile');
const nameEditProfileInput = formEditProfileElement.querySelector('.popup__input_type_name');
const aboutEditProfileInput = formEditProfileElement.querySelector('.popup__input_type_about');

const formAddCardElement = document.querySelector('.popup__form_type_add-card');
const nameAddCardInput = formAddCardElement.querySelector('.popup__input_type_name');
const linkAddCardInput = formAddCardElement.querySelector('.popup__input_type_link');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit');

const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.profile__add-card');

const popupFullImage = document.querySelector('.popup_type_full-image');
const fullImageElement = popupFullImage.querySelector('.popup__image');
const fullImageCaption = popupFullImage.querySelector('.popup__image-caption');

const cardTemplate = document.querySelector('.card-template').content;
const cardSection = document.querySelector('.cards');

const closeButtons = Array.from(document.querySelectorAll('.popup__close'));

const closePopup = popupElement => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscHandler);
};

const closePopupEscHandler = e => {
  const currentPopupElement = document.querySelector('.popup_opened');
  if (e.key === 'Escape') {
    closePopup(currentPopupElement);
  }
};

const closePopupOverlayHandler = e => {
  const currentElement = e.target;
    if (currentElement.classList.contains('popup')) {
    closePopup(currentElement);
  }
};

const openPopup = popupElement => {
  popupElement.classList.add('popup_opened');
  popupElement.addEventListener('mousedown', closePopupOverlayHandler);
  document.addEventListener('keydown', closePopupEscHandler);
};

const likeButtonHandler = e => {
  const likeElement = e.target;
  if (likeElement.classList.contains('card__like_active')) {
    likeElement.classList.remove('card__like_active');
  } else {
    likeElement.classList.add('card__like_active');
  }
};

const deleteButtonHandler = e => {
  const elementCard = e.target.closest('.card');
  elementCard.remove();
};

const handleFullImagePopup = e => {
  fullImageElement.src = e.target.src;
  fullImageElement.alt = e.target.alt;
  fullImageCaption.textContent = e.target.alt;
  openPopup(popupFullImage);
};

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');

  cardTitleElement.textContent = item.name;
  cardImageElement.alt = item.name;
  cardImageElement.src = item.link;
  
  cardElement.querySelector('.card__delete').addEventListener('click', deleteButtonHandler);
  cardElement.querySelector('.card__like').addEventListener('click', likeButtonHandler);
  cardImageElement.addEventListener('click', handleFullImagePopup);

  return cardElement;
}

function convertNameAddCardInput(text) {
  text = nameAddCardInput.value;
  const newText = text[0].toUpperCase() + text.toLowerCase().slice(1);
  nameAddCardInput.value = newText;
}

const addCard = (item) => cardSection.prepend(createCard(item));

initialCards.forEach(addCard);


formEditProfileElement.addEventListener('submit', function(e) {
  e.preventDefault();
  profileName.textContent = nameEditProfileInput.value;
  profileAbout.textContent = aboutEditProfileInput.value;
  closePopup(popupEditProfile);
});

formAddCardElement.addEventListener('submit', function(e) {
  e.preventDefault();
  convertNameAddCardInput();
  
  const newDataCard = {
    name: nameAddCardInput.value,
    link: linkAddCardInput.value
  };

  addCard(newDataCard);
  closePopup(popupAddCard);
  formAddCardElement.reset();
});

buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));

buttonEditProfile.addEventListener('click', () => {
  nameEditProfileInput.value = profileName.textContent;
  aboutEditProfileInput.value = profileAbout.textContent;
  openPopup(popupEditProfile);
});

closeButtons.forEach(buttonElement => {
  const currentCloseBotton = buttonElement.closest('.popup');
  buttonElement.addEventListener('click', () => closePopup(currentCloseBotton));
});


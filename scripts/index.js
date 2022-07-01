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
const popups = document.querySelectorAll('.popup');
const cardSection = document.querySelector('.cards');

const openPopup = popupElement => {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEscHandler);
};

const closePopup = popupElement => {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEscHandler);
};

const closePopupEscHandler = evt => {
  if (evt.key === 'Escape') {
    const currentPopupElement = document.querySelector('.popup_opened');
    closePopup(currentPopupElement);
  }
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

const disableButtonSubmit = evt => {
  const currentSubmitButton = evt.target.querySelector('.popup__submit');
  currentSubmitButton.classList.add('popup__submit_disable');
  currentSubmitButton.setAttribute('disabled', '');
};

const likeButtonHandler = evt => {
  const likeElement = evt.target;
  if (likeElement.classList.contains('card__like_active')) {
    likeElement.classList.remove('card__like_active');
  } else {
    likeElement.classList.add('card__like_active');
  }
};

const deleteButtonHandler = evt => {
  const elementCard = evt.target.closest('.card');
  elementCard.remove();
};

const handleFullImagePopup = evt => {
  fullImageElement.src = evt.target.src;
  fullImageElement.alt = evt.target.alt;
  fullImageCaption.textContent = evt.target.alt.replace(/Фото|\./g, '');
  openPopup(popupFullImage);
};

function createCard(item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');

  cardTitleElement.textContent = item.name;
  cardImageElement.alt = `Фото ${item.name}.`;
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

const addCard = item => {
  cardSection.prepend(createCard(item));
};

import { initialCards } from './data.js';

initialCards.forEach(addCard);

formEditProfileElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  profileName.textContent = nameEditProfileInput.value;
  profileAbout.textContent = aboutEditProfileInput.value;
  disableButtonSubmit(evt);
  closePopup(popupEditProfile);
  });

formAddCardElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  convertNameAddCardInput();
  
  const newDataCard = {
    name: nameAddCardInput.value,
    link: linkAddCardInput.value
  };

  addCard(newDataCard);
  formAddCardElement.reset();
  disableButtonSubmit(evt);
  closePopup(popupAddCard);
});

buttonAddCard.addEventListener('click', () => openPopup(popupAddCard));

buttonEditProfile.addEventListener('click', () => {
  nameEditProfileInput.value = profileName.textContent;
  aboutEditProfileInput.value = profileAbout.textContent;
  openPopup(popupEditProfile);
});
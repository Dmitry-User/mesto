import FormValidator from './FormValidator.js';
import Card from './Card.js';

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const settingsValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disable',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
};

const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const nameEditInput = formEditProfile .querySelector('.popup__input_type_name');
const aboutEditInput = formEditProfile .querySelector('.popup__input_type_about');

const formAddCard = document.querySelector('.popup__form_type_add-card');
const nameCardInput = formAddCard.querySelector('.popup__input_type_name');
const linkCardInput = formAddCard.querySelector('.popup__input_type_link');

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit');

const addCardPopup = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.profile__add-card');

const popups = document.querySelectorAll('.popup');
const cardList = document.querySelector('.card-list');

const cardPopup = document.querySelector('.popup_type_full-image');
const imageCardPopup = cardPopup.querySelector('.popup__image');
const captionCardPopup = cardPopup.querySelector('.popup__image-caption');

const closePopup = popupElement => {
  popupElement.classList.remove('popup_is-open');
  document.removeEventListener('keydown', handleEscClosePopup );
};

const handleEscClosePopup = evt => {
  if (evt.key === 'Escape') {
    const currentPopupElement = document.querySelector('.popup_is-open');
    closePopup(currentPopupElement);
  }
};

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_is-open')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

const openPopup = popupElement => {
  popupElement.classList.add('popup_is-open');
  document.addEventListener('keydown', handleEscClosePopup );
};

const openCardPopup = (name, link) => {
  imageCardPopup.src = link;
  imageCardPopup.alt = `Фото ${name}.`;
  captionCardPopup.textContent = name;
  openPopup(cardPopup);
};

const createCard = item => {
  const card = new Card(item, '.card-template', openCardPopup);
  const cardElement = card.generateCard();
  return cardElement;
};

const addCard = (item) => cardList.prepend(createCard(item));

initialCards.forEach(item => addCard(item));

formEditProfile .addEventListener('submit', () => {
  nameProfile.textContent = nameEditInput.value;
  aboutProfile.textContent = aboutEditInput.value;
  closePopup(editProfilePopup);
  });

formAddCard.addEventListener('submit', () => {
  const newDataCard = {
    name: nameCardInput.value,
    link: linkCardInput.value
  };
  addCard(newDataCard);
  closePopup(addCardPopup);
});

buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  validateFormAddCard.resetValidation();
  openPopup(addCardPopup);
});

buttonEditProfile.addEventListener('click', () => {
  nameEditInput.value = nameProfile.textContent;
  aboutEditInput.value = aboutProfile.textContent;
  validateFormEditProfile.resetValidation();
  openPopup(editProfilePopup);
});

const validateFormEditProfile = new FormValidator(settingsValidation, formEditProfile);
validateFormEditProfile.enableValidation();

const validateFormAddCard = new FormValidator(settingsValidation, formAddCard);
validateFormAddCard.enableValidation();
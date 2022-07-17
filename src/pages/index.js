import { cardsData, settingsValidation } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Popup from '../components/Card.js';
import Section from '../components/Section.js';

const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const nameEditInput = formEditProfile .querySelector('.popup__input_type_name');
const aboutEditInput = formEditProfile .querySelector('.popup__input_type_about');

const formAddCard = document.querySelector('.popup__form_type_add-card');
const nameCardInput = formAddCard.querySelector('.popup__input_type_name');
const linkCardInput = formAddCard.querySelector('.popup__input_type_link');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit');

const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.profile__add-card');

const popups = document.querySelectorAll('.popup');
// const cardList = document.querySelector('.card-list');
const cardsListSelector = '.card-list';
const cardSelector = '.card-template';

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

const handleCardClick = cardElement => {
  imageCardPopup.src = cardElement.link;
  imageCardPopup.alt = `Фото ${cardElement.name}.`;
  captionCardPopup.textContent = cardElement.name;
  openPopup(cardPopup);
};

const cardsList = new Section({
    items: cardsData,
    renderer: (item) => {
      const card = new Card(item, cardSelector, handleCardClick);
      const cardElement = card.generateCard();

      cardsList.addItem(cardElement);
    }
  },
  cardsListSelector
);

cardsList.renderItems();


formEditProfile .addEventListener('submit', () => {
  nameProfile.textContent = nameEditInput.value;
  aboutProfile.textContent = aboutEditInput.value;
  closePopup(popupEditProfile);
  });

formAddCard.addEventListener('submit', () => {
  const newDataCard = {
    name: nameCardInput.value,
    link: linkCardInput.value
  };
  addCard(newDataCard);
  closePopup(popupAddCard);
});

buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  validateFormAddCard.resetValidation();
  openPopup(popupAddCard);
});

buttonEditProfile.addEventListener('click', () => {
  nameEditInput.value = nameProfile.textContent;
  aboutEditInput.value = aboutProfile.textContent;
  validateFormEditProfile.resetValidation();
  openPopup(popupEditProfile);
});

const validateFormEditProfile = new FormValidator(settingsValidation, formEditProfile);
validateFormEditProfile.enableValidation();


const validateFormAddCard = new FormValidator(settingsValidation, formAddCard);
validateFormAddCard.enableValidation();
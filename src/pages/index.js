import { cardsData, settingsValidation } from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
// import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';


const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');

const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const nameEditInput = formEditProfile .querySelector('.popup__input_type_name');
const aboutEditInput = formEditProfile .querySelector('.popup__input_type_about');

const formAddCard = document.querySelector('.popup__form_type_add-card');
const nameCardInput = formAddCard.querySelector('.popup__input_type_name');
const linkCardInput = formAddCard.querySelector('.popup__input_type_link');

const userPopupSelector = '.popup_type_edit-profile';
const buttonEditProfile = document.querySelector('.profile__edit');

const addPopupSelector = '.popup_type_add-card';
const buttonAddCard = document.querySelector('.profile__add-card');

const popups = document.querySelectorAll('.popup');
// const cardList = document.querySelector('.card-list');
const cardsListSelector = '.card-list';
const cardSelector = '.card-template';

const imagePopupSelector = '.popup_type_full-image';
// const imageCardPopup = document.querySelector('.popup__image');
// const captionCardPopup = document.querySelector('.popup__image-caption');



const ImagePopup = new PopupWithImage(imagePopupSelector);
ImagePopup.setEventListener();

const userPopup = new PopupWithForm(userPopupSelector);
formPopup.setEventListener();

const addPopup = new PopupWithForm(addPopupSelector);
formPopup.setEventListener();

const handleCardClick = cardElement => {
  ImagePopup.open(cardElement);
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
  closePopup(popupUserSelector);
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
  openPopup(popupUserSelector);
});




const validateFormEditProfile = new FormValidator(settingsValidation, formEditProfile);
validateFormEditProfile.enableValidation();

const validateFormAddCard = new FormValidator(settingsValidation, formAddCard);
validateFormAddCard.enableValidation();
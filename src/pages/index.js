import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  cardsData,
  selectors,
  formAddCard,
  buttonAddCard,
  formEditUser,
  buttonEditUser
} from '../utils/constants.js';

const validateFormAddCard = new FormValidator(selectors, formAddCard);
const validateFormEditUser = new FormValidator(selectors, formEditUser);
const imagePopup = new PopupWithImage(selectors.imagePopup);
const userPopup = new PopupWithForm(selectors.userPopup, handleSubmitUser);
const userInfo = new UserInfo(selectors);
const cardPopup = new PopupWithForm(selectors.cardPopup, handleSubmitCard);
const cardsList = new Section({
  items: cardsData,
  renderer: item => {
    const cardElement = createCard(item);
    cardsList.addItem(cardElement);
  }
},
selectors.cardsList
);

function createCard(item) {
  const card = new Card(item, selectors.card, handleCardClick);
  return card.generateCard();
};

function handleCardClick(cardElement) {
  imagePopup.open(cardElement);
};

function handleSubmitCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.addItem(cardElement);
};

function handleSubmitUser(userData) {
  userInfo.setUserInfo(userData);
};

buttonAddCard.addEventListener('click', () => {
  validateFormAddCard.resetValidation();
  cardPopup.open();
});

buttonEditUser.addEventListener('click', () => {
  validateFormEditUser.resetValidation();
  const user = userInfo.getUserInfo();
  userPopup.setInputValues(user);
  userPopup.open();
});

cardsList.renderItems();
imagePopup.setEventListener();
cardPopup.setEventListeners();
userPopup.setEventListeners();
validateFormAddCard.enableValidation();
validateFormEditUser.enableValidation();
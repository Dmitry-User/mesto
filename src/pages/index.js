import './index.css';
import { api } from '../components/Api';
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
  buttonEditUser,
  configApi,
  avatar
} from '../utils/constants.js';





const validateFormAddCard = new FormValidator(selectors, formAddCard);
const validateFormEditUser = new FormValidator(selectors, formEditUser);
const imagePopup = new PopupWithImage(selectors.imagePopup);
const userPopup = new PopupWithForm(selectors.userPopup, handleSubmitUser);
const userInfo = new UserInfo(selectors);
const cardPopup = new PopupWithForm(selectors.cardPopup, handleSubmitCard);

const cardsList = new Section({
      renderer: item => {
      const cardElement = createCard(item);
      cardsList.addItem(cardElement);
    }
  },
  selectors.cardsList
);

let userId;



Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    avatar.src = user.avatar;

    // console.log(cards);
    cardsList.renderItems(cards);
  })
  .catch(err => console.log(err))






function createCard(item) {
  const card = new Card(item, userId, selectors.card, handleCardClick);
  // console.log(item.owner._id);
  return card.generateCard();
}

function handleCardClick(cardElement) {
  imagePopup.open(cardElement);
}

function handleSubmitCard(cardData) {
  api.addCard(cardData)
  .then(createCard(cardData))
  .then(cardsList.addItem(cardElement))

}

function handleSubmitUser(userData) {
  api.changeUserInfo(userData)
  .then(userInfo.setUserInfo(userData));
}

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



imagePopup.setEventListener();
cardPopup.setEventListeners();
userPopup.setEventListeners();
validateFormAddCard.enableValidation();
validateFormEditUser.enableValidation();
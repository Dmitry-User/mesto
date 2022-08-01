import './index.css';
import { api } from '../components/Api';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import {
  selectors,
  formEditAvatar,
  formConfirmation,
  buttonEditAvatar,
  formAddCard,
  buttonAddCard,
  formEditUser,
  buttonEditUser
} from '../utils/constants.js';





const validateFormCard = new FormValidator(selectors, formAddCard);
const validateFormUser = new FormValidator(selectors, formEditUser);
const validateFormAvatar = new FormValidator(selectors, formEditAvatar);
const imagePopup = new PopupWithImage(selectors.imagePopup);
const userPopup = new PopupWithForm(selectors.userPopup, handleSubmitUser);
const avatarPopup = new PopupWithForm(selectors.avatarPopup, handleSubmitAvatar);
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
// const buttonSubmit = document.querySelector('.popup__submit');



Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardsList.renderItems(cards);
  })
  .catch(err => console.log(err));






function createCard(item) {
  const card = new Card(item, userId, selectors.card, handleCardClick);
  return card.generateCard();
}

function handleCardClick(cardElement) {
  imagePopup.open(cardElement);
}

function handleSubmitCard(cardData) {
  cardPopup.renderLoading(true);
  api.addCard(cardData)
  .then(createCard(cardData))
  .then(() => {
    cardsList.addItem(cardElement);
    cardPopup.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    cardPopup.renderLoading(false, 'Создать');
  });
}

function handleSubmitUser(userData) {
  userPopup.renderLoading(true);
  api.setUserInfo(userData)
  .then(userData => {
    userInfo.setUserInfo(userData);
    userPopup.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    userPopup.renderLoading(false, 'Сохранить');
  });
}

function handleSubmitAvatar(userData) {
  avatarPopup.renderLoading(true);
  api.setAvatar(userData)
  .then(userData => {
    userInfo.setUserInfo(userData);
    avatarPopup.close();
  })
  .catch(err => console.log(err))
  .finally(() => {
    avatarPopup.renderLoading(false, 'Сохранить');
  });
}




buttonAddCard.addEventListener('click', () => {
  validateFormCard.resetValidation();
  cardPopup.open();
});

buttonEditUser.addEventListener('click', () => {
  validateFormUser.resetValidation();
  const user = userInfo.getUserInfo();
  userPopup.setInputValues(user);
  userPopup.open();
});

buttonEditAvatar.addEventListener('click', () => {
  validateFormAvatar.resetValidation();
  avatarPopup.open();
});


avatarPopup.setEventListeners();
validateFormAvatar.enableValidation();
cardPopup.setEventListeners();
validateFormCard.enableValidation();
userPopup.setEventListeners();
validateFormUser.enableValidation();
imagePopup.setEventListener();
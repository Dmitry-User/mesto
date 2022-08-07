import './index.css';
import Api from '../components/Api';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {
  selectors,
  formEditAvatar,
  buttonEditAvatar,
  formAddCard,
  buttonAddCard,
  formEditUser,
  buttonEditUser,
  configApi
} from '../utils/constants.js';

const api = new Api(configApi);
const validateFormUser = new FormValidator(selectors, formEditUser);
const validateFormAvatar = new FormValidator(selectors, formEditAvatar);
const validateFormCard = new FormValidator(selectors, formAddCard);
const userPopup = new PopupWithForm(selectors.userPopup, handleSubmitUser);
const avatarPopup = new PopupWithForm(selectors.avatarPopup, handleSubmitAvatar);
const cardPopup = new PopupWithForm(selectors.cardPopup, handleSubmitCard);
const imagePopup = new PopupWithImage(selectors.imagePopup);
const confirmPopup = new PopupWithConfirmation(selectors.сonfirmationPopup, handleSubmitConfirm);
const userInfo = new UserInfo(selectors);
const cardsList = new Section(
  {
    renderer: item => {
      const cardElement = createCard(item);
      cardsList.addItemFromServer(cardElement);
    }
  },
  selectors.cardsList
);

let userId;

function createCard(cardData) {
  const card = new Card(
    cardData,
    userId,
    selectors.card,
    handleCardClick,
    handleDeleteCard,
    handlePutLike,
    handleRemoveLike
  );
  return card.generateCard();
}

function handleCardClick(cardData) {
  imagePopup.open(cardData);
}

function handleDeleteCard(cardData) {
  confirmPopup.open(cardData);
}

function handlePutLike(cardData) {
  return api.putLike(cardData)
}

function handleRemoveLike(cardData) {
  return api.removeLike(cardData)
}

function handleSubmitCard(cardData) {
  cardPopup.renderLoading(true);
  api.addCard(cardData)
    .then((res) => {
      const cardElement = createCard(res);
      cardsList.addItem(cardElement);
    })
    .catch(err => console.log(err))
  .finally(() => {
    cardPopup.close();
    cardPopup.renderLoading(false);
  });
}

function handleSubmitConfirm(card) {
  api.deleteCard(card._cardElement)
    .then(() => {
      card.deleteCard()
    })
    .catch(err => console.log(err))
    .finally(() => confirmPopup.close());
}

function handleSubmitUser(userData) {
  userPopup.renderLoading(true);
  api.setUserInfo(userData)
    .then(userData => {
      userInfo.setUserInfo(userData);
    })
    .catch(err => console.log(err))
    .finally(() => {
      userPopup.close();
      userPopup.renderLoading(false);
    });
}

function handleSubmitAvatar(userData) {
  avatarPopup.renderLoading(true);
  api.setAvatar(userData)
    .then(userData => {
      userInfo.setUserInfo(userData);
    })
    .catch(err => console.log(err))
    .finally(() => {
      avatarPopup.close();
      avatarPopup.renderLoading(false);
    });
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardsList.renderItems(cards);
  })
  .catch(err => console.log(err));

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

cardPopup.setEventListeners();
imagePopup.setEventListener();
userPopup.setEventListeners();
avatarPopup.setEventListeners();
confirmPopup.setEventListeners();
validateFormCard.enableValidation();
validateFormUser.enableValidation();
validateFormAvatar.enableValidation();
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
  configApi,
  buttonEditAvatar,
  buttonAddCard,
  buttonEditUser
} from '../utils/constants.js';

let userId;

const api = new Api(configApi);
const userPopup = new PopupWithForm(selectors.userPopup, handleSubmitUser);
const avatarPopup = new PopupWithForm(selectors.avatarPopup, handleSubmitAvatar);
const cardPopup = new PopupWithForm(selectors.cardPopup, handleSubmitCard);
const imagePopup = new PopupWithImage(selectors.imagePopup);
const confirmationPopup = new PopupWithConfirmation(selectors.cardDeletePopup, handleSubmitDeleteCard);
const userInfo = new UserInfo(selectors);

const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
   validator.enableValidation();
  });
};
enableValidation(selectors);

const cardsList = new Section(
  {
    renderer: item => {
      const card = new Card(
        item,
        userId,
        selectors.card,
        handleCardClick,
        handleDeleteCard,
        handleLike
      );
      return card.generateCard();
    }
  },
  selectors.cardsList
);

function handleCardClick(card) {
  imagePopup.open(card.link, card.name);
}

function handleDeleteCard(cardData) {
  confirmationPopup.open(cardData);
}

function handleLike(card) {
  if (!this.isLiked()) {
    api.addLike(card.cardId)
      .then((res) => {
        this.updateLikes(res);
      })
      .catch(err => console.log(err))
  } else {
    api.removeLike(card.cardId)
      .then((res) => {
        this.updateLikes(res);
      })
      .catch(err => console.log(err))
  }
}

function handleSubmitCard(cardData) {
  cardPopup.renderLoading(true);
  api.addCard(cardData)
    .then((res) => {
      cardsList.addItem(res);
      cardPopup.close();
    })
    .catch(err => console.log(err))
  .finally(() => {
    cardPopup.renderLoading(false);
  });
}

function handleSubmitDeleteCard(card) {
  confirmationPopup.renderLoading(true);
  api.deleteCard(card.cardId)
    .then(() => {
      card.deleteCard();
      confirmationPopup.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      confirmationPopup.renderLoading(false);
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
      userPopup.renderLoading(false);
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
  formValidators['add-card'].resetValidation();
  cardPopup.open();
});

buttonEditUser.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation();
  const user = userInfo.getUserInfo();
  userPopup.setInputValues(user);
  userPopup.open();
});

buttonEditAvatar.addEventListener('click', () => {
  formValidators['edit-avatar'].resetValidation();
  avatarPopup.open();
});

cardPopup.setEventListeners();
imagePopup.setEventListener();
userPopup.setEventListeners();
avatarPopup.setEventListeners();
confirmationPopup.setEventListeners();
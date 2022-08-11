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
const userInfo = new UserInfo(selectors);

// ----------- Validation forms ------------
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

// ----------- Renderer card ------------
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

// ----------- Card popup------------
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

const cardPopup = new PopupWithForm(selectors.cardPopup, handleSubmitCard);
cardPopup.setEventListeners();

buttonAddCard.addEventListener('click', () => {
  formValidators['add-card'].resetValidation();
  cardPopup.open();
});

// ----------- Image popup ------------
const imagePopup = new PopupWithImage(selectors.imagePopup);
imagePopup.setEventListener();

// ----------- Confirmation popup ------------
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

const confirmationPopup = new PopupWithConfirmation(selectors.cardDeletePopup, handleSubmitDeleteCard);
confirmationPopup.setEventListeners();

// ----------- User popup ------------
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

const userPopup = new PopupWithForm(selectors.userPopup, handleSubmitUser);
userPopup.setEventListeners();

buttonEditUser.addEventListener('click', () => {
  formValidators['edit-profile'].resetValidation();
  const user = userInfo.getUserInfo();
  userPopup.setInputValues(user);
  userPopup.open();
});

// ----------- Avatar popup ------------
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

const avatarPopup = new PopupWithForm(selectors.avatarPopup, handleSubmitAvatar);
avatarPopup.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
  formValidators['edit-avatar'].resetValidation();
  avatarPopup.open();
});

// ----------- Initial user info and cards data ------------
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userId = user._id;
    userInfo.setUserInfo(user);
    cardsList.renderItems(cards);
  })
  .catch(err => console.log(err));
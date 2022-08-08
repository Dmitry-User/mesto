export const selectors = {
  cardPopup: '.popup_type_add-card',
  cardsList: '.card-list',
  card: '.card-template',
  imagePopup: '.popup_type_full-image',
  userPopup: '.popup_type_edit-profile',
  avatarPopup: '.popup_type_edit-avatar',
  cardDeletePopup: '.popup_type_delete-card',
  nameUser: '.profile__name',
  aboutUser: '.profile__about',
  avatarUser: '.profile__avatar-image',
  editUser: '.profile__edit',
  input: '.popup__input',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
  inactiveButtonClass: 'popup__submit_disable',
  submitButton: '.popup__submit',
  formSelector: '.popup__form'
};

export const configApi = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47',
  headers: {
    authorization: '5755190e-89aa-4139-b42f-16592ed204be',
    'Content-Type': 'application/json'
  }
};

export const avatar = document.querySelector('.profile__avatar-image');
export const buttonEditAvatar = document.querySelector('.profile__avatar-button');
export const buttonEditUser = document.querySelector('.profile__edit');
export const buttonAddCard = document.querySelector('.profile__add-card');
export const selectors = {
  cardPopup: '.popup_type_add-card',
  cardsList: '.card-list',
  card: '.card-template',
  imagePopup: '.popup_type_full-image',
  userPopup: '.popup_type_edit-profile',
  avatarPopup: '.popup_type_edit-avatar',
  сonfirmationPopup: '.popup_type_сonfirmation',
  nameUser: '.profile__name',
  aboutUser: '.profile__about',
  avatarUser: '.profile__avatar-image',
  editUser: '.profile__edit',
  input: '.popup__input',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
  inactiveButtonClass: 'popup__submit_disable',
  submitButton: '.popup__submit'
};

export const configApi = {
  key: '5755190e-89aa-4139-b42f-16592ed204be',
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-47'
};

export const formConfirmation = document.querySelector('.popup__form_type_сonfirmation');
export const avatar = document.querySelector('.profile__avatar-image');
export const formEditAvatar = document.querySelector('.popup__form_type_edit-avatar');
export const buttonEditAvatar = document.querySelector('.profile__avatar-button');
export const formEditUser = document.querySelector('.popup__form_type_edit-profile');
export const buttonEditUser = document.querySelector('.profile__edit');
export const formAddCard = document.querySelector('.popup__form_type_add-card');
export const buttonAddCard = document.querySelector('.profile__add-card');


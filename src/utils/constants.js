export const cardsData = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const selectors = {
  cardPopup: '.popup_type_add-card',
  cardsList: '.card-list',
  card: '.card-template',
  imagePopup: '.popup_type_full-image',
  userPopup: '.popup_type_edit-profile',
  nameUser: '.profile__name',
  aboutUser: '.profile__about',
  editUser: '.profile__edit',
  input: '.popup__input',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible',
  inactiveButtonClass: 'popup__submit_disable',
  submitButton: '.popup__submit'
};

export const formEditUser = document.querySelector('.popup__form_type_edit-profile');
export const buttonEditUser = document.querySelector('.profile__edit');
export const formAddCard = document.querySelector('.popup__form_type_add-card');
export const buttonAddCard = document.querySelector('.profile__add-card');
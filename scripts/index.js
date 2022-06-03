const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const aboutInput = formElement.querySelector('.popup__input_type_about');
const editProfileButton = document.querySelector('.profile__button-edit');
const editProfilePopup = document.querySelector('.popup_value_edit-profile');
const closeEditProfilePopup = document.querySelector('.popup__button-close_type_edit-profile');
const addCardButton = document.querySelector('.profile__button-add');
const addCardPopup = document.querySelector('.popup_value_add-card');
const closeAddCardPopup = document.querySelector('.popup__button-close_type_add-card');
const fullImagePopup = document.querySelector('.popup_value_full-image');
const closefullImagePopup = fullImagePopup.querySelector('.popup__button-close_type_full-image');
const imagePopup = document.querySelector('.popup__image');
const fullImageCaption = fullImagePopup.querySelector('.popup__image-caption');
const imageCard = document.querySelector('.card__image');
const cards = document.querySelector('.cards');
const popup = document.querySelector('.popup');

// const content = document.querySelector('.content');

// const closePopupButton = document.querySelector('.popup__button-close');

const openPopup = popupElement => popupElement.classList.add('popup_opened');

const closePopup = popupElement => popupElement.classList.remove('popup_opened');

const handleLike = (e) => e.target.classList.toggle('card__button-like_active'); 

const handleDelete = (e) => {
  const elementCard = e.target.closest('.card');
  elementCard.remove();
};

const handleImage = (e) => {
  popup.classList.add('popup_background-dark');
  imagePopup.src = e.target.src;
  fullImageCaption.textContent = e.target.alt;
  openPopup(fullImagePopup);
};

function createCard(item) {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');

  cardTitleElement.textContent = item.name;
  cardImageElement.alt = `Фото ${item.name}.`;
  cardImageElement.src = item.link;
  
  cardElement.querySelector('.card__button-delete').addEventListener('click', handleDelete);
  cardElement.querySelector('.card__button-like').addEventListener('click', handleLike);
  cardElement.querySelector('.card__image').addEventListener('click', handleImage);

  return cardElement;
}

const addCard = (item) => cards.prepend(createCard(item));

initialCards.forEach(addCard);

const fillElementsProfile = () => {
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value; 
};

const formSubmit = e => {
  e.preventDefault();
  if (classList('.popup_value_edit-profile')) {
    fillElementsProfile();
  } else {

  }
  
  closePopup(editProfilePopup);
}

formElement.addEventListener('submit', formSubmit);


const fillElementsInput = () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
};

editProfileButton.addEventListener('click', e => {
  openPopup(editProfilePopup);
  fillElementsInput();
});

closeEditProfilePopup.addEventListener('click', e => closePopup(editProfilePopup));

addCardButton.addEventListener('click', e => openPopup(addCardPopup));

closeAddCardPopup.addEventListener('click', e => closePopup(addCardPopup));

closefullImagePopup.addEventListener('click', e => closePopup(fullImagePopup));

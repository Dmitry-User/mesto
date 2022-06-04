const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const formEditProfileElement = document.querySelector('.popup__form_edit-profile');
const nameEditProfileInput = formEditProfileElement.querySelector('.popup__input_type_name');
const aboutEditProfileInput = formEditProfileElement.querySelector('.popup__input_type_about');

const formAddCardElement = document.querySelector('.popup__form_add-card');
const nameAddCardInput = formAddCardElement.querySelector('.popup__input_type_name');
const linkAddCardInput = formAddCardElement.querySelector('.popup__input_type_link');

const popupEditProfile = document.querySelector('.popup_value_edit-profile');
const editProfileButton = document.querySelector('.profile__button-edit');
const closePopupEditProfile = document.querySelector('.popup__button-close_type_edit-profile');

const popupAddCard = document.querySelector('.popup_value_add-card');
const addCardButton = document.querySelector('.profile__button-add');
const closePopupAddCard = document.querySelector('.popup__button-close_type_add-card');

const popupFullImage = document.querySelector('.popup_value_full-image');
const fullImageElement = popupFullImage.querySelector('.popup__image');
const fullImageCaption = popupFullImage.querySelector('.popup__image-caption');
const closePopupFullImage = popupFullImage.querySelector('.popup__button-close');

const cards = document.querySelector('.cards');

const openPopup = popupElement => popupElement.classList.add('popup_opened');

const closePopup = popupElement => popupElement.classList.remove('popup_opened');

const handleLikeButton = e => e.target.classList.toggle('card__button-like_active'); 

const handleDeleteButton = e => {
  const elementCard = e.target.closest('.card');
  elementCard.remove();
};

const handleFullImagePopup = e => {
  fullImageElement.src = e.target.src;
  fullImageElement.alt = e.target.alt;
  fullImageCaption.textContent = e.target.alt;
  openPopup(popupFullImage);
};

function createCard(item) {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');

  cardTitleElement.textContent = item.name;
  cardImageElement.alt = item.name;
  cardImageElement.src = item.link;
  
  cardElement.querySelector('.card__button-delete').addEventListener('click', handleDeleteButton);
  cardElement.querySelector('.card__button-like').addEventListener('click', handleLikeButton);
  cardElement.querySelector('.card__image').addEventListener('click', handleFullImagePopup);

  return cardElement;
}

function convertNameAddCardInput(text) {
  text = nameAddCardInput.value;
  const newText = text[0].toUpperCase() + text.toLowerCase().slice(1);
  nameAddCardInput.value = newText;
}

const addCard = (item) => cards.prepend(createCard(item));

const resetFormAddCardInput = () => {
  nameAddCardInput.value = null;
  linkAddCardInput.value = null;
};

initialCards.forEach(addCard);


formEditProfileElement.addEventListener('submit', function(e) {
  e.preventDefault();
  profileName.textContent = nameEditProfileInput.value;
  profileAbout.textContent = aboutEditProfileInput.value;
  closePopup(popupEditProfile);
});

formAddCardElement.addEventListener('submit', function(e) {
  e.preventDefault();
  convertNameAddCardInput();
  
  const newDataCard = {
    name: nameAddCardInput.value,
    link: linkAddCardInput.value
  };

  if (linkAddCardInput.value.startsWith('http')) {
    addCard(newDataCard);
    resetFormAddCardInput();
    closePopup(popupAddCard);
  } else {
    resetFormAddCardInput();
  }
});

addCardButton.addEventListener('click', e => openPopup(popupAddCard));

closePopupAddCard.addEventListener('click', e => {
  resetFormAddCardInput();
  closePopup(popupAddCard);
});

editProfileButton.addEventListener('click', e => {
  openPopup(popupEditProfile);
  nameEditProfileInput.value = profileName.textContent;
  aboutEditProfileInput.value = profileAbout.textContent;
});

closePopupEditProfile.addEventListener('click', e => closePopup(popupEditProfile));

closePopupFullImage.addEventListener('click', e => closePopup(popupFullImage));

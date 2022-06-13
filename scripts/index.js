const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const formEditProfileElement = document.querySelector('.form_type_edit-profile');
const nameEditProfileInput = formEditProfileElement.querySelector('.form__input_type_name');
const aboutEditProfileInput = formEditProfileElement.querySelector('.form__input_type_about');

const formAddCardElement = document.querySelector('.form_type_add-card');
const nameAddCardInput = formAddCardElement.querySelector('.form__input_type_name');
const linkAddCardInput = formAddCardElement.querySelector('.form__input_type_link');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.profile__button-edit');
const popupEditProfileClose = document.querySelector('.popup__button-close_type_edit-profile');

const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.profile__button-add');
const popupAddCardClose = document.querySelector('.popup__button-close_type_add-card');

const popupFullImage = document.querySelector('.popup_type_full-image');
const fullImageElement = popupFullImage.querySelector('.popup__image');
const fullImageCaption = popupFullImage.querySelector('.popup__image-caption');
const popupFullImageClose = popupFullImage.querySelector('.popup__button-close');

const cardTemplate = document.querySelector('.card-template').content;
const cardSection = document.querySelector('.cards');

const openPopup = popupElement => popupElement.classList.add('popup_opened');

const closePopup = popupElement => popupElement.classList.remove('popup_opened');

const likeButtonHandler = e => e.target.classList.toggle('card__button-like_active'); 

const deleteButtonHandler = e => {
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
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');

  cardTitleElement.textContent = item.name;
  cardImageElement.alt = item.name;
  cardImageElement.src = item.link;
  
  cardElement.querySelector('.card__button-delete').addEventListener('click', deleteButtonHandler);
  cardElement.querySelector('.card__button-like').addEventListener('click', likeButtonHandler);
  cardImageElement.addEventListener('click', handleFullImagePopup);

  return cardElement;
}

function convertNameAddCardInput(text) {
  text = nameAddCardInput.value;
  const newText = text[0].toUpperCase() + text.toLowerCase().slice(1);
  nameAddCardInput.value = newText;
}

const addCard = (item) => cardSection.prepend(createCard(item));

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

  addCard(newDataCard);
  formAddCardElement.reset();
  closePopup(popupAddCard);
});

buttonAddCard.addEventListener('click', e => openPopup(popupAddCard));

popupAddCardClose.addEventListener('click', e => {
  formAddCardElement.reset();
  closePopup(popupAddCard)
});

buttonEditProfile.addEventListener('click', e => {
  openPopup(popupEditProfile);
  nameEditProfileInput.value = profileName.textContent;
  aboutEditProfileInput.value = profileAbout.textContent;
});

popupEditProfileClose.addEventListener('click', e => closePopup(popupEditProfile));

popupFullImageClose.addEventListener('click', e => closePopup(popupFullImage));

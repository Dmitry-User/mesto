const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const aboutInput = formElement.querySelector('.popup__input_type_about');
const editButton = document.querySelector('.profile__button-edit');
const closePopupButton = document.querySelector('.popup__button-close');
const popup = document.querySelector('.popup');
const cards = document.querySelector('.cards');
const initialCards = [
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


function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup();
}

function addCard(i) {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = initialCards[i].link;
  cardElement.querySelector('.card__title').textContent = initialCards[i].name;
  console.log(initialCards);

  cards.prepend(cardElement);
}

addCard(1);
addCard(0);

editButton.addEventListener('click', openPopup);

formElement.addEventListener('submit', formSubmit);

closePopupButton.addEventListener('click', closePopup);


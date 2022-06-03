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

const fullImageCaption = fullImagePopup.querySelector('.popup__image-caption');
const popup = document.querySelector('.popup');
const cards = document.querySelector('.cards');


// const content = document.querySelector('.content');

// const closePopupButton = document.querySelector('.popup__button-close');

const openPopup = popupElement => popupElement.classList.add('popup_opened');

const closePopup = popupElement => popupElement.classList.remove('popup_opened');

const cardLike = (e) => e.target.classList.toggle('card__button-like_active'); 

const cardDelete = (e) => {
  const elementCard = e.target.closest('.card');
  elementCard.remove();
};


function createCard(item) {
  const cardTemplate = document.querySelector('.card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImageElement = cardElement.querySelector('.card__image');
  const cardTitleElement = cardElement.querySelector('.card__title');

  cardTitleElement.textContent = item.name;
  cardImageElement.alt = `Фото ${item.name}.`;
  cardImageElement.src = item.link;
  
  cardElement.querySelector('.card__button-delete').addEventListener('click', cardDelete);
  cardElement.querySelector('.card__button-like').addEventListener('click', cardLike);
  // cardElement.querySelector('.card__image').addEventListener('click', openPopup(fullImagePopup));

  return cardElement;
}

const addCard = (item) => cards.prepend(createCard(item));

initialCards.forEach(addCard);


// cards.addEventListener('click', (e) => {
//   const elem = e.target;
//   const cardLike = () => elem.classList.toggle('card__button-like_active');
//   const cardDelete = () => {
//     const elementCard = elem.closest('.card');
//     elementCard.remove();
//   };

//   if (elem.classList.contains('card__button-like')) {
//     cardLike();
//   } else if (elem.classList.contains('card__button-delete')) {
//     cardDelete();
//   } else if (elem.classList.contains('card__image')) {
//     const fullImage = fullImagePopup.querySelector('.popup__image');
//     const imageCaption = fullImagePopup.querySelector('.popup__image-caption');
//     const titleCard = document.querySelector('.card__title');

//     fullImage.src = elem.src;
//     imageCaption.textContent = titleCard.textContent;

//     openPopup(fullImagePopup);
//   }
// });


// cardElement.querySelector('.card__button-like').addEventListener('click', function(evt) {
  //   evt.target.classList.toggle('card__button-like_active');
  // })

const formSubmit = e => {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  closePopup(editProfilePopup);
}

formElement.addEventListener('submit', formSubmit);



editProfileButton.addEventListener('click', e => {
  openPopup(editProfilePopup);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
});

closeEditProfilePopup.addEventListener('click', e => closePopup(editProfilePopup));

addCardButton.addEventListener('click', e => openPopup(addCardPopup));

closeAddCardPopup.addEventListener('click', e => closePopup(addCardPopup));

closefullImagePopup.addEventListener('click', e => closePopup(fullImagePopup));

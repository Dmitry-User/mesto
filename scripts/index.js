const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_name');
const aboutInput = formElement.querySelector('.popup__input_about');
const editButton = document.querySelector('.profile__button-edit');
const closePopupButton = document.querySelector('.popup__button-close');
const popup = document.querySelector('.popup');


function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

function formSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
}

editButton.addEventListener('click', function() {
  openPopup(popup);
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
})

formElement.addEventListener('submit', formSubmit);

closePopupButton.addEventListener('click', function() {
  closePopup(popup);
})


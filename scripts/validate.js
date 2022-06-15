const showInputError = (formElement, inputElement, errorMessage, dataElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(dataElements.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(dataElements.errorClass);
};

const hideInputError = (formElement, inputElement, dataElements) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(dataElements.inputErrorClass);
  errorElement.classList.remove(dataElements.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, dataElements) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, dataElements);
  } else {
    hideInputError(formElement, inputElement, dataElements);
  }
};

const setEventListeners = (formElement, dataElements) => {
  const inputList = Array.from(formElement.querySelectorAll(dataElements.inputSelector));
  const buttonElement = formElement.querySelector(dataElements.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, dataElements);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, dataElements);
      toggleButtonState(inputList, buttonElement, dataElements);
    });
  });
};

const enableValidation = dataElements => {
  const formList = Array.from(document.querySelectorAll(dataElements.formSelector));
  formList.forEach(formElement => setEventListeners(formElement, dataElements));
};

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  }); 
};

const toggleButtonState = (inputList, buttonElement, dataElements) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(dataElements.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(dataElements.inactiveButtonClass);
  }
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disable',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
});
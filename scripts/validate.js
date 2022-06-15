const showInputError = (formElement, inputElement, errorMessage, elementsForFormValidate) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(elementsForFormValidate.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(elementsForFormValidate.errorClass);
};

const hideInputError = (formElement, inputElement, elementsForFormValidate) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(elementsForFormValidate.inputErrorClass);
  errorElement.classList.remove(elementsForFormValidate.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, elementsForFormValidate) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, elementsForFormValidate);
  } else {
    hideInputError(formElement, inputElement, elementsForFormValidate);
  }
};

const setEventListeners = (formElement, elementsForFormValidate) => {
  const inputList = Array.from(formElement.querySelectorAll(elementsForFormValidate.inputSelector));
  const buttonElement = formElement.querySelector(elementsForFormValidate.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, elementsForFormValidate);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, elementsForFormValidate);
      toggleButtonState(inputList, buttonElement, elementsForFormValidate);
    });
  });
};

const enableValidation = elementsForFormValidate => {
  const formList = Array.from(document.querySelectorAll(elementsForFormValidate.formSelector));
  formList.forEach(formElement => setEventListeners(formElement, elementsForFormValidate));
};

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  }); 
};

const toggleButtonState = (inputList, buttonElement, elementsForFormValidate) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(elementsForFormValidate.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(elementsForFormValidate.inactiveButtonClass);
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
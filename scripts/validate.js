const showInputError = (formElement, inputElement, errorMessage, settinigs) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settinigs.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settinigs.errorClass);
};

const hideInputError = (formElement, inputElement, settinigs) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settinigs.inputErrorClass);
  errorElement.classList.remove(settinigs.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settinigs) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settinigs);
  } else {
    hideInputError(formElement, inputElement, settinigs);
  }
};

const setEventListeners = (formElement, settinigs) => {
  const inputList = Array.from(formElement.querySelectorAll(settinigs.inputSelector));
  const buttonElement = formElement.querySelector(settinigs.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, settinigs);
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settinigs);
      toggleButtonState(inputList, buttonElement, settinigs);
    });
  });
};

const enableValidation = settinigs => {
  const formList = Array.from(document.querySelectorAll(settinigs.formSelector));
  formList.forEach(formElement => setEventListeners(formElement, settinigs));
};

const hasInvalidInput = inputList => {
  return inputList.some(inputElement => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settinigs) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add(settinigs.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled')
    buttonElement.classList.remove(settinigs.inactiveButtonClass);
  }
};

import { settingValidations as settinigs } from './data.js';

enableValidation(settinigs);
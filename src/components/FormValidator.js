export default class FormValidator {

  constructor (selectors, formElement) {
    this._formElement = formElement;
    this._inputSelector = selectors.input;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButtonSelector = selectors.submitButton;
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;
  }

  _showInputError (inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError (inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  };
  
  _checkInputValidity(inputElement) {
    !inputElement.validity.valid
      ? this._showInputError(inputElement)
      : this._hideInputError(inputElement);
    }

  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    });
  }

  _disableSubmitBotton() {
    this._submitButton.setAttribute('disabled', '');
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  _enableSubmitButton() {
    this._submitButton.removeAttribute('disabled')
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  _toggleSubmitButtonState() {
    if (this._hasInvalidInput()) {
      this._disableSubmitBotton();
    } else {
      this._enableSubmitButton();
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButtonState();
      });
    });
  }

  resetValidation() {
    this._disableSubmitBotton();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
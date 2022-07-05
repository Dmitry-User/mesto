export default class FormValidator {

  constructor (settings, formElement) {
    
    this._formElement = formElement;
    this._inputSelector = settings.inputSelector;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._submitButtonSelector = settings.submitButtonSelector;
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError (inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  };
  
  _hideInputError (inputElement) {
    this._errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
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

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.setAttribute('disabled', '');
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute('disabled')
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation() {
    this._formElement.addEventListener('submit', evt => evt.preventDefault());
    this._setEventListeners();
  }

}
// reset.js
'use strict';

const adForm = document.querySelector(`.ad-form`);
const inputPrice = adForm.elements.price;
const resetButton = adForm.querySelector(`.ad-form__reset`);
const mapFilters = document.querySelector(`.map__filters`);

const DEFAULT_PRICE = 1000;

// Сброс минимального значения и плейсхолдера
const resetPrice = () => {
  inputPrice.min = DEFAULT_PRICE;
  inputPrice.placeholder = DEFAULT_PRICE;
};


const resetPage = () => {
  window.disable.disablePage(true);
  // все заполненные поля возвращаются в изначальное состояние, в том числе фильтры;
  adForm.reset();
  resetPrice();
  mapFilters.reset();
  // метка адреса возвращается в исходное положение;
  window.pin.moveToStartPosition();
  // значение поля адреса корректируется соответственно положению метки.
  window.disable.getCoordMainPin();
  window.form.onFormChange(false);
  window.filter.resetCurrentFilter();
  window.preview.resetPreview();
};


const onResetButtonClick = () => {
  resetPage();
  window.pin.addEventListenersOnPin();
};

const onResetButtonPress = (evt) => {
  window.util.isEnterEvent(evt, resetPage);
};

const onResetButton = () => {
  resetButton.addEventListener(`click`, onResetButtonClick);
  resetButton.addEventListener(`click`, onResetButtonPress);
};


window.reset = {
  resetPage,
  onResetButton
};

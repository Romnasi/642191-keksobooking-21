// reset.js
'use strict';

(() => {

  const adForm = document.querySelector(`.ad-form`);
  const resetButton = adForm.querySelector(`.ad-form__reset`);
  const mapFilters = document.querySelector(`.map__filters`);


  const resetPage = () => {
    window.disable.disablePage(true);
    // все заполненные поля возвращаются в изначальное состояние, в том числе фильтры;
    adForm.reset();
    mapFilters.reset();
    // метка адреса возвращается в исходное положение;
    window.pin.moveToStartPosition();
    // значение поля адреса корректируется соответственно положению метки.
    window.disable.getCoordMainPin();
    window.form.onFormChange(false);
    window.filter.resetCurrentFilter();
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


})();

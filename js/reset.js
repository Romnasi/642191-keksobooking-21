// reset.js
'use strict';

(() => {

  const mainPin = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const resetButton = adForm.querySelector(`.ad-form__reset`);
  const mapFilters = document.querySelector(`.map__filters`);

  const MainPinStartCoord = {
    Y: 375,
    X: 570
  };

  const moveToStartPosition = () => {
    mainPin.style.left = `${MainPinStartCoord.X}px`;
    mainPin.style.top = `${MainPinStartCoord.Y}px`;
  };

  const resetPage = () => {
    window.disable.disablePage(true);
    // все заполненные поля возвращаются в изначальное состояние, в том числе фильтры;
    adForm.reset();
    mapFilters.reset();
    // метка адреса возвращается в исходное положение;
    moveToStartPosition();
    // значение поля адреса корректируется соответственно положению метки.
    window.disable.getCoordMainPin();
    window.form.onFormChange(false);
  };


  const onResetButtonClick = () => {
    resetPage();
    mainPin.addEventListener(`mousedown`, window.activate.onMainPinClick);
    mainPin.addEventListener(`keydown`, window.activate.onMainPinPress);
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

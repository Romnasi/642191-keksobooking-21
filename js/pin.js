// pin.js
"use strict";
(() => {

  const mainPin = document.querySelector(`.map__pin--main`);

  // Обработчик на пин активации при клике ЛКМ
  const onMainPinClick = (evt) => {
    window.util.isMainMouseButtonEvent(evt, window.activate.activatePage);
  };

  // Обработчик на пин активации при нажатии Enter
  const onMainPinPress = (evt) => {
    window.util.isEnterEvent(evt, window.activate.activatePage);
  };

  const addEventListenersOnPin = () => {
    mainPin.addEventListener(`mousedown`, onMainPinClick);
    mainPin.addEventListener(`keydown`, onMainPinPress);
  };


  const removeEventListenersOnPin = () => {
    // Удаляем обработчики с главного пина
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinPress);
  };


  window.pin = {
    removeEventListenersOnPin,
    addEventListenersOnPin
  };

})();

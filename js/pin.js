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

  const deactivate = () => {
    mainPin.addEventListener(`mousedown`, onMainPinClick);
    mainPin.addEventListener(`keydown`, onMainPinPress);
    // При загрузку неактивное состояние страницы
    window.disable.disablePage(true);
  };


  const activate = () => {
    // Удаляем обработчики с главного пина
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinPress);
    // Делаем пин активным
    mainPin.disabled = false;
  };


  window.pin = {
    activate,
    deactivate
  };

})();

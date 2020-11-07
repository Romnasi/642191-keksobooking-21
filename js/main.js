// main.js
'use strict';

(function () {

  const map = document.querySelector(`.map`);
  const mapAds = map.querySelector(`.map__pins`);
  const mainPin = map.querySelector(`.map__pin--main`);


  const errorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);


  window.disable.disablePage(true);


  const successHandler = function (ads) {
    window.util.renderChildren(mapAds, ads, window.map.renderPinOnMap, window.remove.removePins);

    window.disable.disablePage(false);
    window.form.onFormChange(true);

    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinPress);
  };


  const errorHandler = function (errorMessage) {
    const errorPopup = errorTemplate.cloneNode(true);
    const errorMessageContainer = errorPopup.querySelector(`.error__message`);
    errorPopup.style.position = `absolute`;
    errorPopup.style.left = 0;
    errorPopup.style.right = 0;
    errorMessageContainer.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, errorPopup);
  };


  // Активация страницы
  const activatePage = function () {
    // Запрос данных с сервера и отрисовка меток в случае успеха
    window.sync.getData(successHandler, errorHandler);
  };

  // Обработчик на пин активации при клике ЛКМ
  const onMainPinClick = function (evt) {
    window.util.isMainMouseButtonEvent(evt, activatePage);
  };

  // Обработчик на пин активации при нажатии Enter
  const onMainPinPress = function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  };

  mainPin.addEventListener(`mousedown`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinPress);

})();

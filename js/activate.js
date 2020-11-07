// activate.js
'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapAds = map.querySelector(`.map__pins`);
  const mainPin = map.querySelector(`.map__pin--main`);


  const errorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);


  const successHandler = function (ads) {
    window.util.renderChildren(mapAds, ads, window.map.renderPinOnMap, window.remove.removePins);

    window.disable.disablePage(false);
    window.form.onFormChange(true);
    mainPin.disabled = false;

    // Удаляем обработчики с главного пина
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinPress);
  };


  // Удаляем попап с ошибкой
  const removeErrorPopup = function () {
    const errorPopup = document.querySelector(`.error`);
    if (errorPopup) {
      errorPopup.remove();
    }
  };


  const onErrorButtonClick = function (evt) {
    removeErrorPopup();
    onMainPinClick(evt);
  };

  const onErrorButtonPress = function (evt) {
    removeErrorPopup();
    onMainPinPress(evt);
  };


  const errorHandler = function (errorMessage) {
    const errorPopup = errorTemplate.cloneNode(true);
    const errorMessageContainer = errorPopup.querySelector(`.error__message`);
    const errorButton = errorPopup.querySelector(`.error__button`);


    errorPopup.style.position = `absolute`;
    errorPopup.style.left = 0;
    errorPopup.style.right = 0;
    errorMessageContainer.textContent = errorMessage;

    // Удаляем обработчики с главного пина
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinPress);
    mainPin.disabled = true;

    // Устанавливаем обработчики на кнопку в попапе ошибки
    errorButton.addEventListener(`mousedown`, onErrorButtonClick);
    // errorButton.addEventListener(`mousedown`, window.activate.onMainPinClick);
    errorButton.addEventListener(`keydown`, onErrorButtonPress);

    document.body.insertAdjacentElement(`afterbegin`, errorPopup);
  };

  // Активация страницы
  const activatePage = function () {
    // Запрос данных с сервера и отрисовка меток в случае успеха
    // В случае ошибки вывод попапа с причиной ошибки
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


  window.activate = {
    onMainPinClick,
    onMainPinPress
  };

})();

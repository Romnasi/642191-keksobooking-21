// activate.js
'use strict';

(() => {

  const mainPin = document.querySelector(`.map__pin--main`);

  const errorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);


  const onErrorButtonClick = (evt) => {
    removeErrorPopup();
    window.activate.onMainPinClick(evt);
  };

  const onErrorButtonPress = (evt) => {
    removeErrorPopup();
    window.activate.onMainPinPress(evt);
  };


  // Удаляем попап с ошибкой
  const removeErrorPopup = () => {
    const errorPopup = document.querySelector(`.error`);
    if (errorPopup) {
      errorPopup.remove();
    }
  };


  const onError = (errorMessage) => {
    const errorPopup = errorTemplate.cloneNode(true);
    const errorMessageContainer = errorPopup.querySelector(`.error__message`);
    const errorButton = errorPopup.querySelector(`.error__button`);

    errorMessageContainer.textContent = errorMessage;

    // Удаляем обработчики с главного пина
    mainPin.removeEventListener(`mousedown`, window.activate.onMainPinClick);
    mainPin.removeEventListener(`keydown`, window.activate.onMainPinPress);
    mainPin.disabled = true;

    // Устанавливаем обработчики на кнопку в попапе ошибки
    errorButton.addEventListener(`mousedown`, onErrorButtonClick);
    // errorButton.addEventListener(`mousedown`, window.activate.onMainPinClick);
    errorButton.addEventListener(`keydown`, onErrorButtonPress);

    document.body.insertAdjacentElement(`afterbegin`, errorPopup);
  };

  window.error = {
    onError
  };


})();

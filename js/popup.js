// popup.js
'use strict';

(() => {

  const main = document.querySelector(`main`);
  const mainPin = main.querySelector(`.map__pin--main`);

  const errorTemplate = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);

  const successTemplate = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);


  // Колбек обработчика при клике
  const onClick = (popup) => {
    window.util.isClickEvent(removePopup.bind(null, popup));
  };

  // Колбек обработчика при нажатии Esc
  const onEscPress = (popup, evt) => {
    window.util.isEscEvent(evt, removePopup.bind(null, popup));
  };

  // Колбек обработчика при нажатии Enter
  const onPopupButtonPress = (popup, evt) => {
    window.util.isEnterEvent(evt, removePopup.bind(null, popup));
  };


  // Удаляем попап, добавляем обработчики на главный пин
  const removePopup = (popup) => {
    if (popup) {
      popup.remove();
    }
    window.pin.addEventListenersOnPin();
    mainPin.disabled = false;
  };


  const renderPopup = (message, template, messageContainerSelector, buttonSelector) => {
    const popup = template.cloneNode(true);

    if (message) {
      const messageContainer = popup.querySelector(messageContainerSelector);
      messageContainer.textContent = message;
    }

    // Удаляем обработчики с главного пина
    window.pin.removeEventListenersOnPin();
    mainPin.disabled = true;


    // Если передан селектор кнопки - вешаем обработчик
    if (buttonSelector) {
      const button = popup.querySelector(buttonSelector);
      button.addEventListener(`keydown`, onPopupButtonPress.bind(null, popup));
    }

    // Устанавливаем обработчики на кнопку или весь документ
    // Пробрасываем блок попапа, чтобы потом его удалить
    document.addEventListener(`mousedown`, onClick.bind(null, popup));
    document.addEventListener(`keydown`, onEscPress.bind(null, popup));

    main.insertAdjacentElement(`afterbegin`, popup);
  };


  const onError = (errorMessage) => {
    renderPopup(errorMessage, errorTemplate, `.error__message`, `.error__button`);
  };

  const showSuccesPopup = () => {
    renderPopup(null, successTemplate, null, null);
  };

  window.popup = {
    onError,
    showSuccesPopup
  };


})();

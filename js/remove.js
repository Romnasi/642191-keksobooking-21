// remove.js
'use strict';

(function () {

  const map = document.querySelector(`.map`);
  // Метка активации
  const mainPin = map.querySelector(`.map__pin--main`);


  // Удаляем карточку
  const removeCard = function () {
    const card = document.querySelector(`.popup`);
    if (card) {
      card.remove();
    }
  };

  // Удаляем потомков у элемента
  const removeChildren = function (element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  };

  // Удаляем пины кроме главного
  const removePins = function () {
    const pins = document.querySelectorAll(`.map__pin`);
    pins.forEach(function (pin) {
      if (pin !== mainPin) {
        pin.remove();
      }
    });
  };


  window.remove = {
    removeCard,
    removeChildren,
    removePins
  };

})();

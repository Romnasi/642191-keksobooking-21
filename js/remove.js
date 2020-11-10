// remove.js
'use strict';

(() => {

  const map = document.querySelector(`.map`);
  // Метка активации
  const mainPin = map.querySelector(`.map__pin--main`);


  // Удаляем карточку
  const removeCard = () => {
    const card = document.querySelector(`.popup`);
    if (card) {
      card.remove();
    }
  };

  // Удаляем потомков у элемента
  const removeChildren = (element) => {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  };

  // Удаляем пины кроме главного
  const removePins = () => {
    const pins = document.querySelectorAll(`.map__pin`);
    pins.forEach((pin) => {
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

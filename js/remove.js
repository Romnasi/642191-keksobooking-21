// remove.js
'use strict';

(function () {

  const map = document.querySelector(`.map`);
  // Метка активации
  const mainPin = map.querySelector(`.map__pin--main`);

  window.remove = {
    // Удаляем карточку
    removeCard() {
      const card = document.querySelector(`.popup`);
      if (card) {
        card.remove();
      }
    },

    // Удаляем потомков у элемента
    removeChildren(element) {
      while (element.firstChild) {
        element.firstChild.remove();
      }
    },

    // Удаляем пины кроме главного
    removePins() {
      const pins = document.querySelectorAll(`.map__pin`);
      pins.forEach(function (pin) {
        if (pin !== mainPin) {
          pin.remove();
        }
      });
    }

  };

})();

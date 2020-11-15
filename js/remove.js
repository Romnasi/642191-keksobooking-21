// remove.js
'use strict';

(() => {

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


  window.remove = {
    removeCard,
    removeChildren
  };

})();

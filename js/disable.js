// disable.js
'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mainPin = map.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const inputAddress = adForm.elements.address;
  const mapFilters = document.querySelector(`.map__filters`);

  const DisabledMainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    PROPORTION: 2
  };


  // Получаем координаты главной метки
  const getLocationMainPin = function (width, height, proportion) {
    const pinX = parseInt(mainPin.style.left, 10);
    const pinY = parseInt(mainPin.style.top, 10);
    const locationX = pinX + Math.ceil(width / proportion);
    const locationY = pinY + Math.ceil(height / proportion);

    return `${locationX}, ${locationY}`;
  };


  // Изменить состояние элементов в форме
  const changeFormState = function (form, isDisabled) {
    window.util.forEach(form.elements, function (formElement) {
      formElement.disabled = isDisabled;
    });
  };


  // Неактивное состояние страницы
  const disablePage = function (isDisabled) {
    if (isDisabled) {
      map.classList.add(`map--faded`);
      adForm.classList.add(`ad-form--disabled`);
      window.remove.removePins();
      window.remove.removeCard();
    } else {
      // Активное состояние
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
    }

    changeFormState(adForm, isDisabled);
    changeFormState(mapFilters, isDisabled);

    inputAddress.value = getLocationMainPin(DisabledMainPin.WIDTH, DisabledMainPin.HEIGHT, DisabledMainPin.PROPORTION);
  };

  window.disable = {
    disablePage
  };

})();

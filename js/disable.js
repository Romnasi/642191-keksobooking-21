// disable.js
'use strict';

(() => {
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
  const getLocationMainPin = (width, height, proportion) => {
    const pinX = parseInt(mainPin.style.left, 10);
    const pinY = parseInt(mainPin.style.top, 10);
    const locationX = pinX + Math.ceil(width / proportion);
    const locationY = pinY + Math.ceil(height / proportion);

    return `${locationX}, ${locationY}`;
  };


  // Изменить состояние элементов в форме
  const changeFormState = (form, isDisabled) => {
    window.util.forEach(form.elements, (formElement) => {
      formElement.disabled = isDisabled;
    });
  };


  const getCoordMainPin = () => {
    inputAddress.value = getLocationMainPin(DisabledMainPin.WIDTH, DisabledMainPin.HEIGHT, DisabledMainPin.PROPORTION);
  };


  // Неактивное состояние страницы
  const disablePage = (isDisabled) => {
    if (isDisabled) {
      map.classList.add(`map--faded`);
      adForm.classList.add(`ad-form--disabled`);
      // метки похожих объявлений и карточка активного объявления удаляются;
      window.pin.removePins();
      window.remove.removeCard();
    } else {
      // Активное состояние
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
    }

    changeFormState(adForm, isDisabled);
    changeFormState(mapFilters, isDisabled);


    getCoordMainPin();
  };

  window.disable = {
    disablePage,
    getCoordMainPin
  };

})();

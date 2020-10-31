// main.js
'use strict';

(function () {

  const map = document.querySelector(`.map`);
  // X = 62 , где 62 - ширина метки, 2 - пропорция: по ТЗ - нужна координата середины метки
  // Y = 62 + 22 - 6 = 78, где 62 - высота метки, 22 - высота основания метки, 6 - смещение вверх основания метки
  const ActiveMainPin = {
    WIDTH: 62,
    HEIGHT: 78,
    PROPORTION: 2
  };

  const DisabledMainPin = {
    WIDTH: 65,
    HEIGHT: 65,
    PROPORTION: 2
  };


  const mapAds = map.querySelector(`.map__pins`);
  const adForm = document.querySelector(`.ad-form`);
  const inputAddress = adForm.elements.address;
  const mapFilters = document.querySelector(`.map__filters`);
  const mainPin = map.querySelector(`.map__pin--main`);


  // Изменить состояние элементов в форме
  const changeFormState = function (form, isDisabled) {
    window.util.forEach(form.elements, function (formElement) {
      formElement.disabled = isDisabled;
    });
  };

  // Получаем координаты главной метки
  const getLocationMainPin = function (width, height, proportion) {
    const pinX = parseInt(mainPin.style.left, 10);
    const pinY = parseInt(mainPin.style.top, 10);
    const locationX = pinX + Math.ceil(width / proportion);
    const locationY = pinY + Math.ceil(height / proportion);

    return `${locationX}, ${locationY}`;
  };

  // Неактивное состояние страницы
  const disablePage = function (isDisabled) {
    if (isDisabled) {
      map.classList.add(`map--faded`);
      adForm.classList.add(`ad-form--disabled`);
    } else {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
    }

    changeFormState(adForm, isDisabled);
    changeFormState(mapFilters, isDisabled);

    inputAddress.value = getLocationMainPin(DisabledMainPin.WIDTH, DisabledMainPin.HEIGHT, DisabledMainPin.PROPORTION);
  };

  disablePage(true);


  // Все операции при активации страницы
  const activatePage = function () {
    disablePage(false);
    inputAddress.value = getLocationMainPin(ActiveMainPin.WIDTH, ActiveMainPin.HEIGHT, ActiveMainPin.PROPORTION);

    window.form.onFormChange(true);

    // Вызываем функцию создания массива объявлений
    const ads = window.data.getAds();

    // Вызываем функцию создания объявлений на карте
    window.util.renderChildren(mapAds, ads, window.map.renderPinOnMap, window.remove.removePins);
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

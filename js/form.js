// form.js
'use strict';

(function () {

  // Валидация формы

  const Form = {
    MIN_LENGTH_TITLE: 30,
    MAX_LENGTH_TITLE: 100
  };

  const MinPriceByType = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Поля ввода
  const adForm = document.querySelector(`.ad-form`);
  const roomsNumber = adForm.elements.room_number;
  const roomsCapacity = adForm.elements.capacity;
  const inputTitle = adForm.elements.title;
  const selectType = adForm.elements.type;
  const inputPrice = adForm.elements.price;
  const selectTimeIn = adForm.elements.timein;
  const selectTimeOut = adForm.elements.timeout;

  // Поле "Заголовок объявления"
  const validateTitle = function () {
    const valueLength = inputTitle.value.length;

    if (valueLength < Form.MIN_LENGTH_TITLE) {
      inputTitle.setCustomValidity(`Минимальная длина заголовка - 30 символов. Осталось еще ${Form.MIN_LENGTH_TITLE - valueLength} симв.`);
    } else if (valueLength > Form.MAX_LENGTH_TITLE) {
      inputTitle.setCustomValidity(`Максимальная длина заголовка - 100 символов. Удалите лишние ${valueLength - Form.MAX_LENGTH_TITLE} симв.`);
    } else {
      inputTitle.setCustomValidity(``);
    }

    inputTitle.reportValidity();
  };


  // Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь
  const validatePriceByType = function () {
    let type = selectType.value;

    if (type) {
      inputPrice.min = MinPriceByType[type];
      inputPrice.placeholder = MinPriceByType[type];
    }
  };


  const validateTimeInOut = function (isTimeIn) {
    if (isTimeIn) {
      selectTimeOut.value = selectTimeIn.value;
    } else {
      selectTimeIn.value = selectTimeOut.value;
    }
  };


  // Поля "Количество комнат" - "Количество мест"
  // Синхронизация полей Количество комнат - количество мест
  const validateRoomsCapacity = function (element) {
    const currentRooms = parseInt(roomsNumber.value, 10);
    const currentCapacity = parseInt(roomsCapacity.value, 10);

    if (currentRooms < currentCapacity) {
      element.setCustomValidity(`Для ${currentCapacity} гостей нужно минимум ${currentCapacity} комнаты`);
    } else if (currentRooms === 100 && currentCapacity !== 0) {
      element.setCustomValidity(`Для "100 комнат" нужно выбрать "не для гостей"`);
    } else if (currentRooms !== 100 && currentCapacity === 0) {
      element.setCustomValidity(`Не для гостей нужно выбрать 100 комнат`);
    } else {
      element.setCustomValidity(``);
    }

    element.reportValidity();
  };


  const onInputTitleInput = function () {
    validateTitle();
  };

  const onSelectTypeChange = function () {
    validatePriceByType();
  };

  const onSelectTimeInChange = function () {
    validateTimeInOut(true);
  };

  const onSelectTimeOutChange = function () {
    validateTimeInOut(false);
  };

  //  Обработчик на изменение опции в селекте комнаты
  const onSelectRoomsChange = function () {
    validateRoomsCapacity(roomsNumber);
  };
  // Обработчик на изменение опции в селекте количество мест
  const onSelectCapacityChange = function () {
    validateRoomsCapacity(roomsCapacity);
  };


  window.form = {
    // Состояние обработчиков на форме
    onFormChange(on) {
      if (on) {
        selectTimeIn.addEventListener(`change`, onSelectTimeInChange);
        selectTimeOut.addEventListener(`change`, onSelectTimeOutChange);
        selectType.addEventListener(`change`, onSelectTypeChange);
        inputTitle.addEventListener(`input`, onInputTitleInput);
        roomsNumber.addEventListener(`change`, onSelectRoomsChange);
        roomsCapacity.addEventListener(`change`, onSelectCapacityChange);
      } else {
        selectTimeIn.removeEventListener(`change`, onSelectTimeInChange);
        selectTimeOut.removeEventListener(`change`, onSelectTimeOutChange);
        selectType.removeEventListener(`change`, onSelectTypeChange);
        inputTitle.removeEventListener(`input`, onInputTitleInput);
        roomsNumber.removeEventListener(`change`, onSelectRoomsChange);
        roomsCapacity.removeEventListener(`change`, onSelectCapacityChange);
      }
    }
  };

})();

// form.js
'use strict';

(() => {

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

  const mainPin = document.querySelector(`.map__pin--main`);

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
  const validateTitle = () => {
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


  // Поле «Тип жилья» изменяет минимальное значение поля «Цена за ночь»
  const validatePriceByType = () => {
    const type = selectType.value;
    const minPrice = MinPriceByType[type];

    if (type) {
      inputPrice.min = minPrice;
      inputPrice.placeholder = minPrice;
    }
  };

  // Поле «Цена за ночь» - валидация минимального значения
  const validateMinPriceByType = () => {
    const type = selectType.value;
    const minPrice = MinPriceByType[type];
    const currentPrice = inputPrice.value;

    if (currentPrice < minPrice) {
      inputPrice.setCustomValidity(`Минимальная цена для типа жилья  ${selectType.options[selectType.selectedIndex].text} - ${minPrice} руб. за ночь. Увеличьте цену на ${minPrice - currentPrice} руб.`);
    } else {
      inputPrice.setCustomValidity(``);
    }

    inputPrice.reportValidity();
  };


  // Поля «Время заезда» и «Время выезда» синхронизированы
  const validateTimeInOut = (isTimeIn) => {
    if (isTimeIn) {
      selectTimeOut.value = selectTimeIn.value;
    } else {
      selectTimeIn.value = selectTimeOut.value;
    }
  };


  // Поля "Количество комнат" - "Количество мест"
  // Синхронизация полей Количество комнат - количество мест
  const validateRoomsCapacity = (element) => {
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


  const onInputTitleInput = () => {
    validateTitle();
  };

  const onSelectTypeChange = () => {
    validatePriceByType();
  };

  const onInputPriceInput = () => {
    validateMinPriceByType();
  };

  const onSelectTimeInChange = () => {
    validateTimeInOut(true);
  };

  const onSelectTimeOutChange = () => {
    validateTimeInOut(false);
  };

  //  Обработчик на изменение опции в селекте комнаты
  const onSelectRoomsChange = () => {
    validateRoomsCapacity(roomsNumber);
  };
  // Обработчик на изменение опции в селекте количество мест
  const onSelectCapacityChange = () => {
    validateRoomsCapacity(roomsCapacity);
  };


  const onFormChange = (on) => {
    if (on) {
      selectTimeIn.addEventListener(`change`, onSelectTimeInChange);
      selectTimeOut.addEventListener(`change`, onSelectTimeOutChange);
      selectType.addEventListener(`change`, onSelectTypeChange);
      selectType.addEventListener(`change`, onInputPriceInput);
      inputPrice.addEventListener(`input`, onInputPriceInput);
      inputTitle.addEventListener(`input`, onInputTitleInput);
      roomsNumber.addEventListener(`change`, onSelectRoomsChange);
      roomsCapacity.addEventListener(`change`, onSelectCapacityChange);
    } else {
      selectTimeIn.removeEventListener(`change`, onSelectTimeInChange);
      selectTimeOut.removeEventListener(`change`, onSelectTimeOutChange);
      selectType.removeEventListener(`change`, onSelectTypeChange);
      selectType.removeEventListener(`change`, onInputPriceInput);
      inputPrice.removeEventListener(`input`, onInputPriceInput);
      inputTitle.removeEventListener(`input`, onInputTitleInput);
      roomsNumber.removeEventListener(`change`, onSelectRoomsChange);
      roomsCapacity.removeEventListener(`change`, onSelectCapacityChange);
    }
  };

  const successSendDataHandler = () => {
    window.sync.sendData(new FormData(adForm), () => {
      window.disable.disablePage(true);

      mainPin.addEventListener(`mousedown`, window.activate.onMainPinClick);
      mainPin.addEventListener(`keydown`, window.activate.onMainPinPress);
    });
  };

  adForm.addEventListener(`submit`, (evt) => {
    successSendDataHandler();
    evt.preventDefault();
  });


  window.form = {
    onFormChange
  };

})();

'use strict';

const Offer = {
  TITLE: [
    `Изящество классики,  уют прованса`,
    `Надежный приют`,
    `Залог покоя и надежности`,
    `Уголок киномана`,
    `Симфония стиля`,
    `Семейные традиции`,
    `Симбиоз авангарда и классики`,
    `Гармония, построенная на принципах свободы`
  ],
  TYPE: [`palace`, `flat`, `house`, `bungalow`],
  CHECKIN: [`12:00`, `13:00`, `14:00`],
  CHECKOUT: [`12:00`, `13:00`, `14:00`],
  FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  DESCRIPTION: [
    `Рядом с домом парк отличное место для отдыха и пеших прогулок`,
    `Улучшенная планировка и большая площадь. 44 кв.м. общей площади и 9 метровая кухня это гораздо больше, чем в стандартной 1-комнатной квартире.`,
    `Дополнительная площадь к жилому пространству в виде двух лоджий 5 кв.м.`,
    `Удобная геометрия квартиры. Благодаря алькову расположенному в комнате можно выделить спальную зону или установить большой шкаф-купе без ущерба функционалу жилого пространства.`,
    `Все плюсы и удобства раздельного санузла.`,
    `Можно дышать свежим воздухом не вдыхая смог проезжающего автотранспорта благодаря тому, что окна квартиры выходят на парк.`,
    `Отсутствует проблема с парковкой. Всегда свободные парковочные места, можно удобно припарковаться рядом с домом.`,
    `Возможность въехать в квартиру на следующий день после сделки.`
  ],
  MIN_FEATURES: 0,
  PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
  MIN_PHOTOS: 1,
  MIN_PRICE: 500,
  MAX_PRICE: 5000,
  MIN_ROOMS: 1,
  MAX_ROOMS: 12,
  PERSON_PER_ROOM: 2,
  PHOTO_WIDTH: 45,
  PHOTO_HEIGHT: 40,
  PHOTO_ALT: `Фотография жилья`
};

const MapSize = {
  MIN_WIDTH: 0,
  MAX_WIDTH: 1200,
  MIN_HEIGHT: 130,
  MAX_HEIGHT: 630,
};

const Pin = {
  WIDTH: 50,
  HEIGHT: 70,
};

const EventTrigger = {
  MAIN_MOUSE_BUTTON: 0,
  KEY_ENTER: `Enter`
};

const Form = {
  MIN_LENGTH_TITLE: 30,
  MAX_LENGTH_TITLE: 100
};

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

const NUMBER_OF_ADS = 8;

const Types = {
  bungalow: `Бунгало`,
  flat: `Квартира`,
  house: `Дом`,
  palace: `Дворец`
};

const MinPriceByType = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const map = document.querySelector(`.map`);
const mapAds = map.querySelector(`.map__pins`);
const filtersContainer = map.querySelector(`.map__filters-container`);

// Метка активации
const mainPin = map.querySelector(`.map__pin--main`);

// Формы
const adForm = document.querySelector(`.ad-form`);
const roomsNumber = adForm.elements.room_number;
const roomsCapacity = adForm.elements.capacity;
const inputAdress = adForm.elements.address;
const inputTitle = adForm.elements.title;
const selectType = adForm.elements.type;
const inputPrice = adForm.elements.price;
const selectTimeIn = adForm.elements.timein;
const selectTimeOut = adForm.elements.timeout;


// Фильтры
const mapFilters = document.querySelector(`.map__filters`);

// Используем шаблоны
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);

let rooms = Offer.MIN_ROOMS;


// Получить рандомное число в указанных границах
const getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
};


// Значения для author
const getAvatarUrl = function (i) {
  let urlId = String(i + 1).padStart(2, `0`); // ТЗ: число от 1 до 8 с ведущим нулём
  return `img/avatars/user${urlId}.png`;
};

const getAdAuthor = function (i) {
  let author = {
    avatar: getAvatarUrl(i)
  };
  return author;
};


// Получаем рандомный элемент из массива
const getRandomElement = function (elements) {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};


// Генерирует количество комнат
const getOfferRooms = function (minElement, maxElement) {
  rooms = getRandomIntInclusive(minElement, maxElement);
  return rooms;
};

// Генерирует количество гостей
const getOfferGuests = function () {
  return rooms * Offer.PERSON_PER_ROOM;
};


// Генерирует координаты
const getAdLocation = function () {
  const adLocation = {
    x: getRandomIntInclusive(MapSize.MIN_WIDTH, MapSize.MAX_WIDTH),
    y: getRandomIntInclusive(MapSize.MIN_HEIGHT, MapSize.MAX_HEIGHT)
  };
  return adLocation;
};


// Генерирует массив случайной длины
const getRandomLengthArray = function (minimumQuantity, elements) {
  const tailIndex = getRandomIntInclusive(minimumQuantity, elements.length);
  return elements.slice(0, tailIndex);
};


// Генерирует содержание предложения
const getAdOffer = function (location) {
  let adOffer = {
    title: getRandomElement(Offer.TITLE),
    address: location,
    price: getRandomIntInclusive(Offer.MIN_PRICE, Offer.MAX_PRICE),
    type: getRandomElement(Offer.TYPE),
    rooms: getOfferRooms(Offer.MIN_ROOMS, Offer.MAX_ROOMS),
    guests: getOfferGuests(),
    checkin: getRandomElement(Offer.CHECKIN),
    checkout: getRandomElement(Offer.CHECKOUT),
    features: getRandomLengthArray(Offer.MIN_FEATURES, Offer.FEATURES),
    description: getRandomElement(Offer.DESCRIPTION),
    photos: getRandomLengthArray(Offer.MIN_PHOTOS, Offer.PHOTOS)
  };
  return adOffer;
};


// Генерирует массив с данными объявлений
const getAds = function () {
  const ads = [];

  for (let i = 0; i < NUMBER_OF_ADS; i++) {
    const location = getAdLocation();
    const similarAd = {
      author: getAdAuthor(i),
      offer: getAdOffer(location),
      location
    };
    ads.push(similarAd);
  }
  return ads;
};


const removeCard = function () {
  const card = document.querySelector(`.popup`);
  if (card) {
    card.remove();
  }
};

// Создаем пин объявления
const renderAdOnMap = function (ad) {
  const pinElement = pinTemplate.cloneNode(true);
  const pinX = ad.location.x - Pin.WIDTH / 2;
  const pinY = ad.location.y - Pin.HEIGHT;
  pinElement.style.left = `${pinX}px`;
  pinElement.style.top = `${pinY}px`;
  const avatarElement = pinElement.querySelector(`img`);
  avatarElement.src = ad.author.avatar;
  avatarElement.alt = ad.offer.title;

  pinElement.addEventListener(`click`, function () {
    removeCard();
    renderCardOnMap(ad);
  });

  pinElement.addEventListener(`keydown`, function (evt) {
    if (evt.key === EventTrigger.KEY_ENTER) {
      removeCard();
      renderCardOnMap(ad);
    }
  });

  return pinElement;
};


// Удаляем потомков у элемента
const removeChildren = function (element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
};

// Удаляем пины
const removePins = function () {
  const pins = document.querySelectorAll(`.map__pin`);
  pins.forEach(function(pin) {
    if (pin !== mainPin) {
      pin.remove();
    }
  });
};


const createOfferFeature = function (element) {
  const childElement = document.createElement(`li`);
  childElement.classList.add(`popup__feature`, `popup__feature--${element}`);
  return childElement;
};

const createOfferImg = function (element) {
  const childElement = document.createElement(`img`);
  childElement.src = element;
  childElement.classList.add(`popup__photo`);
  childElement.width = Offer.PHOTO_WIDTH;
  childElement.height = Offer.PHOTO_HEIGHT;
  childElement.alt = Offer.PHOTO_ALT;

  return childElement;
};


// 1. Получить в функции список элементов которые хотим отрисовать
const renderChildren = function (parentNode, elements, renderChild, clear = removeChildren) {
  clear(parentNode);
  // 2. Создать фрагмент
  const fragment = document.createDocumentFragment();
  // 3. Перебрать элементы
  elements.forEach(function (element) {
    // 4. Создать DOM ноду, для каждого элемента
    const childNode = renderChild(element);
    // 5. Добавить ноду во фрагмент
    fragment.appendChild(childNode);
  });
  // 6. После цикла, добавить фрагмент в родительскую ноду
  parentNode.appendChild(fragment);
};


const onCloseButtonClick = function () {
  removeCard();
};

const onCloseButtonPress = function (evt) {
  if (evt.key === EventTrigger.KEY_ENTER) {
    removeCard();
  }
};

// Создаем карточку объявления
const renderCard = function (ad) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(`.popup__title`);
  const cardPrice = cardElement.querySelector(`.popup__text--price`);
  const cardType = cardElement.querySelector(`.popup__type`);
  const cardCapacity = cardElement.querySelector(`.popup__text--capacity`);
  const cardTime = cardElement.querySelector(`.popup__text--time`);
  const cardDescription = cardElement.querySelector(`.popup__description`);
  const cardAvatar = cardElement.querySelector(`.popup__avatar`);

  if (ad.offer.title) {
    cardTitle.textContent = ad.offer.title;
  }
  if (ad.offer.price) {
    cardPrice.textContent = `${ad.offer.price}₽/ночь`;
  }
  if (ad.offer.type) {
    cardType.textContent = Types[ad.offer.type];
  }
  if (ad.offer.rooms) {
    cardCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  }
  if (ad.offer.checkin && ad.offer.checkout) {
    cardTime.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  }

  // Cоздаем преимущества
  renderChildren(
      cardElement.querySelector(`.popup__features`),
      ad.offer.features,
      createOfferFeature
  );

  cardDescription.textContent = ad.offer.description;


  // Cоздаем фотографии
  renderChildren(
      cardElement.querySelector(`.popup__photos`),
      ad.offer.photos,
      createOfferImg
  );

  cardAvatar.src = ad.author.avatar;

  // Обработчики на кнопку закрытия
  const closeButton = cardElement.querySelector(`.popup__close`);

  closeButton.addEventListener(`click`, onCloseButtonClick);
  closeButton.addEventListener(`keydown`, onCloseButtonPress);

  return cardElement;
};


// Добавляем карточку на карту
const renderCardOnMap = function (ad) {
  map.insertBefore(renderCard(ad), filtersContainer);
};

// Воруем метод forEach у массива с помощью call
const forEach = function (elements, cb) {
  return Array.prototype.forEach.call(elements, cb);
};

// Изменить состояние элементов в форме
const changeFormState = function (form, isDisabled) {
  forEach(form.elements, function (formElement) {
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

  inputAdress.value = getLocationMainPin(DisabledMainPin.WIDTH, DisabledMainPin.HEIGHT, DisabledMainPin.PROPORTION);
};

disablePage(true);


// Валидация формы

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


// Состояние обработчиков на форме
const onFormChange = function (on) {
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
};


// Все операции при активации страницы
const activatePage = function () {
  disablePage(false);
  inputAdress.value = getLocationMainPin(ActiveMainPin.WIDTH, ActiveMainPin.HEIGHT, ActiveMainPin.PROPORTION);

  onFormChange(true);

  // Вызываем функцию создания массива объявлений
  const ads = getAds();

  // Вызываем функцию создания объявлений на карте
  renderChildren(mapAds, ads, renderAdOnMap, removePins);
};


// Обработчик на пин активации при клике ЛКМ
mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === EventTrigger.MAIN_MOUSE_BUTTON) {
    activatePage();
  }
});

// Обработчик на пин активации при нажатии Enter
mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === EventTrigger.KEY_ENTER) {
    activatePage();
  }
});

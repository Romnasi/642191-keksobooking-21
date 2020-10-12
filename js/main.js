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
  PERSON_PER_ROOM: 2
};

const MapSize = {
  MIN_WIDTH: 0,
  MAX_WIDTH: 1200,
  MIN_HEIGHT: 130,
  MAX_HEIGHT: 630,
};

const Pin = {
  WIDTH: 50,
  HEIGHT: 70
};

const NUMBER_OF_ADS = 8;

const types = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  palace: `Дворец`,
  house: `Дом`
};

const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const filtersContainer = map.querySelector(`.map__filters-container`);

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

  return pinElement;
};


// Удаляем потомков у элемента
const removeChildren = function (element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
};


// Создаем потомков из  массива
const renderChildElements = function (
    parentNode,
    elements,
    tagName,
    basicClass,
    startOfCompositeClass,
    isImg
) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < elements.length; i++) {
    let element = elements[i];
    const childElement = document.createElement(tagName);

    // Создается составной класс если есть
    if (startOfCompositeClass) {
      const сompositeClass = startOfCompositeClass + element;
      childElement.classList.add(basicClass, сompositeClass);
    } else {
      childElement.classList.add(basicClass);
    }

    if (isImg) {
      childElement.src = element;
      childElement.width = 45;
      childElement.height = 40;
      childElement.alt = `Фотография жилья`;
    }

    fragment.appendChild(childElement);
  }
  parentNode.appendChild(fragment);
};


// Создаем преимущества у карточки
const renderCardElements = function (
    parentSelector,
    childTagName,
    card,
    elementsArray,
    basicClass,
    startOfCompositeClass,
    isImg
) {
  const parentNode = card.querySelector(parentSelector);

  removeChildren(parentNode);
  renderChildElements(
      parentNode,
      elementsArray,
      childTagName,
      basicClass,
      startOfCompositeClass,
      isImg
  );
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

  cardTitle.textContent = ad.offer.title;
  cardPrice.textContent = `${ad.offer.price}₽/ночь`;
  cardType.textContent = types[ad.offer.type];
  cardCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  cardTime.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;

  // Cоздаем преимущества
  renderCardElements(
      `.popup__features`,
      `li`,
      cardElement,
      ad.offer.features,
      `popup__feature`,
      `popup__feature--`,
      false
  );

  cardDescription.textContent = ad.offer.description;

  // Cоздаем фотографии
  renderCardElements(
      `.popup__photos`,
      `img`,
      cardElement,
      ad.offer.photos,
      `popup__photo`,
      false,
      true
  );

  cardAvatar.src = ad.author.avatar;

  return cardElement;
};


// Добавляем все карточки на карту
const renderCardOnMap = function (adsData) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(renderCard(adsData[0]));
  map.insertBefore(fragment, filtersContainer);
};


// Добавляем все объявления на карту
const renderAdsOnMap = function (adsData) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < adsData.length; i++) {
    fragment.appendChild(renderAdOnMap(adsData[i]));
  }
  mapPins.appendChild(fragment);
};


// Вызываем функцию создания массива объявлений
const ads = getAds();
// Вызываем функцию создания объявлений на карте
renderAdsOnMap(ads);
// Вызываем функцию создания карточки
renderCardOnMap(ads);


map.classList.remove(`map--faded`);

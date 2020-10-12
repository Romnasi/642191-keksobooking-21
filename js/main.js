'use strict';

const Offer = {
  TYPE: [`palace`, `flat`, `house`, `bungalow`],
  CHECKIN: [`12:00`, `13:00`, `14:00`],
  CHECKOUT: [`12:00`, `13:00`, `14:00`],
  FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  MIN_FEATURES: 0,
  PHOTOS: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
  MIN_PHOTOS: 1,
  MIN_PRICE: 100,
  MAX_PRICE: 1000,
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

const map = document.querySelector(`.map`);
const mapPins = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

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


// Значения для offer
const getOfferPrice = function () {
  return getRandomIntInclusive(Offer.MIN_PRICE, Offer.MAX_PRICE);
};

// Получаем рандомный элемент из массива
const getRandomElement = function (elements) {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

// Генерирует тип жилья
const getOfferType = function () {
  return getRandomElement(Offer.TYPE);
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

// Генерирует время заезда
const getCheckin = function () {
  return getRandomElement(Offer.CHECKIN);
};

// Генерирует время выезда
const getCheckout = function () {
  return getRandomElement(Offer.CHECKOUT);
};


// Генерирует координаты
const getAdLocation = function () {
  let adLocation = {
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
    title: `Заголовок предложения`,
    address: location,
    price: getOfferPrice(),
    type: getOfferType(),
    rooms: getOfferRooms(Offer.MIN_ROOMS, Offer.MAX_ROOMS),
    guests: getOfferGuests(),
    checkin: getCheckin(),
    checkout: getCheckout(),
    features: getRandomLengthArray(Offer.MIN_FEATURES, Offer.FEATURES),
    description: `Описание локации`,
    photos: getRandomLengthArray(Offer.MIN_PHOTOS, Offer.PHOTOS)
  };
  return adOffer;
};


// Генерирует массив с данными объявлений
const getAds = function () {
  const ads = [];

  for (let i = 0; i < NUMBER_OF_ADS; i++) {
    const location = getAdLocation();
    let similarAd = {
      author: getAdAuthor(i),
      offer: getAdOffer(location),
      location
    };
    ads.push(similarAd);
  }
  return ads;
};


// Создаем объявление
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


map.classList.remove(`map--faded`);

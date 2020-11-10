// data.js
'use strict';

(() => {

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

  const NUMBER_OF_ADS = 8;


  let rooms = Offer.MIN_ROOMS;

  // Значения для author
  const getAvatarUrl = (i) => {
    let urlId = String(i + 1).padStart(2, `0`); // ТЗ: число от 1 до 8 с ведущим нулём
    return `img/avatars/user${urlId}.png`;
  };

  const getAdAuthor = (i) => {
    let author = {
      avatar: getAvatarUrl(i)
    };
    return author;
  };


  // Генерирует количество комнат
  const getOfferRooms = (minElement, maxElement) => {
    rooms = window.util.getRandomIntInclusive(minElement, maxElement);
    return rooms;
  };

  // Генерирует количество гостей
  const getOfferGuests = () => {
    return rooms * Offer.PERSON_PER_ROOM;
  };


  // Генерирует координаты
  const getAdLocation = () => {
    const adLocation = {
      x: window.util.getRandomIntInclusive(MapSize.MIN_WIDTH, MapSize.MAX_WIDTH),
      y: window.util.getRandomIntInclusive(MapSize.MIN_HEIGHT, MapSize.MAX_HEIGHT)
    };
    return adLocation;
  };


  // Генерирует массив случайной длины
  const getRandomLengthArray = (minimumQuantity, elements) => {
    const tailIndex = window.util.getRandomIntInclusive(minimumQuantity, elements.length);
    return elements.slice(0, tailIndex);
  };


  // Генерирует содержание предложения
  const getAdOffer = (location) => {
    let adOffer = {
      title: window.util.getRandomElement(Offer.TITLE),
      address: location,
      price: window.util.getRandomIntInclusive(Offer.MIN_PRICE, Offer.MAX_PRICE),
      type: window.util.getRandomElement(Offer.TYPE),
      rooms: getOfferRooms(Offer.MIN_ROOMS, Offer.MAX_ROOMS),
      guests: getOfferGuests(),
      checkin: window.util.getRandomElement(Offer.CHECKIN),
      checkout: window.util.getRandomElement(Offer.CHECKOUT),
      features: getRandomLengthArray(Offer.MIN_FEATURES, Offer.FEATURES),
      description: window.util.getRandomElement(Offer.DESCRIPTION),
      photos: getRandomLengthArray(Offer.MIN_PHOTOS, Offer.PHOTOS)
    };
    return adOffer;
  };


  // Генерирует массив с данными объявлений
  const getAds = () => {
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

  const createOfferFeature = (element) => {
    const childElement = document.createElement(`li`);
    childElement.classList.add(`popup__feature`, `popup__feature--${element}`);
    return childElement;
  };

  const createOfferImg = (element) => {
    const childElement = document.createElement(`img`);
    childElement.src = element;
    childElement.classList.add(`popup__photo`);
    childElement.width = Offer.PHOTO_WIDTH;
    childElement.height = Offer.PHOTO_HEIGHT;
    childElement.alt = Offer.PHOTO_ALT;

    return childElement;
  };


  window.data = {
    getAds,
    createOfferFeature,
    createOfferImg
  };

})();

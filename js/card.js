// card.js
'use strict';

// Словарь типов жилья
const type = {
  bungalow: `Бунгало`,
  flat: `Квартира`,
  house: `Дом`,
  palace: `Дворец`
};

const cardTemplate = document.querySelector(`#card`)
.content
.querySelector(`.map__card`);


const onEscPress = (evt) => {
  window.util.isEscEvent(evt, window.remove.removeCard);
  document.removeEventListener(`keydown`, onEscPress);
};

const onCloseButtonClick = () => {
  window.remove.removeCard();
  document.removeEventListener(`keydown`, onEscPress);
};

const onCloseButtonPress = (evt) => {
  window.util.isEnterEvent(evt, window.remove.removeCard);
  document.removeEventListener(`keydown`, onEscPress);
};

// Создаем карточку объявления
const renderCard = (ad) => {
  const cardElement = cardTemplate.cloneNode(true);

  const cardTitle = cardElement.querySelector(`.popup__title`);
  const cardAddress = cardElement.querySelector(`.popup__text--address`);
  const cardPrice = cardElement.querySelector(`.popup__text--price`);
  const cardType = cardElement.querySelector(`.popup__type`);
  const cardCapacity = cardElement.querySelector(`.popup__text--capacity`);
  const cardTime = cardElement.querySelector(`.popup__text--time`);
  const cardDescription = cardElement.querySelector(`.popup__description`);
  const cardAvatar = cardElement.querySelector(`.popup__avatar`);

  if (ad.offer.title) {
    cardTitle.textContent = ad.offer.title;
  }
  if (ad.offer.address) {
    cardAddress.textContent = ad.offer.address;
  }
  if (ad.offer.price) {
    cardPrice.textContent = `${ad.offer.price}₽/ночь`;
  }
  if (ad.offer.type) {
    cardType.textContent = type[ad.offer.type];
  }
  if (ad.offer.rooms) {
    cardCapacity.textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  }
  if (ad.offer.checkin && ad.offer.checkout) {
    cardTime.textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  }

  // Cоздаем преимущества
  window.util.renderChildren(
      cardElement.querySelector(`.popup__features`),
      ad.offer.features,
      window.data.createOfferFeature
  );

  cardDescription.textContent = ad.offer.description;


  // Cоздаем фотографии
  window.util.renderChildren(
      cardElement.querySelector(`.popup__photos`),
      ad.offer.photos,
      window.data.createOfferImg
  );

  cardAvatar.src = ad.author.avatar;

  // Обработчики на кнопку закрытия
  const closeButton = cardElement.querySelector(`.popup__close`);

  document.addEventListener(`keydown`, onEscPress);
  closeButton.addEventListener(`click`, onCloseButtonClick);
  closeButton.addEventListener(`keydown`, onCloseButtonPress);

  return cardElement;
};


window.card = {
  renderCard
};

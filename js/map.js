// map.js
'use strict';
// Создаем пин объявления

(() => {

  const Pin = {
    WIDTH: 50,
    HEIGHT: 70,
  };

  const map = document.querySelector(`.map`);
  const filtersContainer = map.querySelector(`.map__filters-container`);


  const pinTemplate = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);


  const renderPinOnMap = (ad) => {
    // Если в объекте с описанием объявления отсутствует поле offer, то метка объявления не должна отображаться на карте.
    if (ad.offer) {
      const pinElement = pinTemplate.cloneNode(true);
      const pinX = ad.location.x - Pin.WIDTH / 2;
      const pinY = ad.location.y - Pin.HEIGHT;
      pinElement.style.left = `${pinX}px`;
      pinElement.style.top = `${pinY}px`;
      const avatarElement = pinElement.querySelector(`img`);
      avatarElement.src = ad.author.avatar;
      avatarElement.alt = ad.offer.title;

      const showCard = () => {
        window.remove.removeCard();
        window.map.renderCardOnMap(ad);
      };

      const onPinElementClick = () => {
        showCard();
      };

      const onPinElementPress = (evt) => {
        window.util.isEnterEvent(evt, showCard);
      };

      pinElement.addEventListener(`click`, onPinElementClick);

      pinElement.addEventListener(`keydown`, onPinElementPress);

      return pinElement;
    }
  };

  // Добавляем карточку на карту
  const renderCardOnMap = (ad) => {
    map.insertBefore(window.card.renderCard(ad), filtersContainer);
  };


  window.map = {
    renderPinOnMap,
    renderCardOnMap
  };

})();

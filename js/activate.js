// activate.js
'use strict';

(() => {
  const mapAds = document.querySelector(`.map__pins`);
  const mainPin = document.querySelector(`.map__pin--main`);

  const onSuccess = (ads) => {
    // Если в объекте с описанием объявления отсутствует поле offer, то метка объявления не должна отображаться на карте.
    const adsWithOffer = ads.filter((ad) => {
      return ad.offer;
    });

    window.adsData.set(adsWithOffer);

    const filteredAds = window.filter.getFilteredAds();
    window.util.renderChildren(mapAds, filteredAds, window.map.renderPinOnMap, window.pin.removePins);

    window.disable.disablePage(false);
    window.form.onFormChange(true);

    window.reset.onResetButton();
    window.pin.removeEventListenersOnPin();
    // Делаем пин активным
    mainPin.disabled = false;
  };


  // Активация страницы
  const activatePage = () => {
    // Запрос данных с сервера и отрисовка меток в случае успеха
    // В случае ошибки вывод попапа с причиной ошибки
    window.sync.load(onSuccess);
  };


  window.pin.addEventListenersOnPin();

  // При загрузку неактивное состояние страницы
  window.disable.disablePage(true);

  window.activate = {
    activatePage
  };

})();

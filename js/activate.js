// activate.js
'use strict';

(() => {
  const mapAds = document.querySelector(`.map__pins`);

  const onSuccess = (ads) => {
    window.similarAds = ads;
    let filteredAds = window.filter.getFilteredAds();
    window.util.renderChildren(mapAds, filteredAds, window.map.renderPinOnMap, window.remove.removePins);


    window.disable.disablePage(false);
    window.form.onFormChange(true);

    window.reset.onResetButton();
    window.pin.activate();
  };


  // Активация страницы
  const activatePage = () => {
    // Запрос данных с сервера и отрисовка меток в случае успеха
    // В случае ошибки вывод попапа с причиной ошибки
    window.sync.load(onSuccess);
  };


  window.pin.deactivate();


  window.activate = {
    activatePage
  };

})();

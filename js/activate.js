// activate.js
'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapAds = map.querySelector(`.map__pins`);
  const mainPin = map.querySelector(`.map__pin--main`);


  const onSuccess = (ads) => {
    window.util.renderChildren(mapAds, ads, window.map.renderPinOnMap, window.remove.removePins);

    window.disable.disablePage(false);
    window.form.onFormChange(true);
    mainPin.disabled = false;

    window.reset.onResetButton();

    // Удаляем обработчики с главного пина
    mainPin.removeEventListener(`mousedown`, onMainPinClick);
    mainPin.removeEventListener(`keydown`, onMainPinPress);
  };


  // Активация страницы
  const activatePage = () => {
    // Запрос данных с сервера и отрисовка меток в случае успеха
    // В случае ошибки вывод попапа с причиной ошибки
    window.sync.load(onSuccess);
  };

  // Обработчик на пин активации при клике ЛКМ
  const onMainPinClick = (evt) => {
    window.util.isMainMouseButtonEvent(evt, activatePage);
  };

  // Обработчик на пин активации при нажатии Enter
  const onMainPinPress = (evt) => {
    window.util.isEnterEvent(evt, activatePage);
  };


  window.activate = {
    onMainPinClick,
    onMainPinPress
  };

})();

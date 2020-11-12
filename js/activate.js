// activate.js
'use strict';

(() => {
  const map = document.querySelector(`.map`);
  const mapAds = map.querySelector(`.map__pins`);
  const mainPin = map.querySelector(`.map__pin--main`);

  const mapFilters = document.querySelector(`.map__filters`);
  const selectHousingType = mapFilters.querySelector(`#housing-type`);

  let similarAds = [];
  let housingType = `any`;

  selectHousingType.addEventListener(`change`, () => {
    housingType = selectHousingType.value;
    updateAds();
  });

  const updateAds = () => {

    const someTypeAds = similarAds.filter(function (similarAd) {
      if (housingType === `any`) {
        return true;
      } else {
        return similarAd.offer.type === housingType;
      }
    });

    window.util.renderChildren(mapAds, someTypeAds, window.map.renderPinOnMap, window.remove.removePins);
    console.log(`тест в updateAds`);
  };


  const onSuccess = (ads) => {
    similarAds = ads;
    console.log(`тест в onSuccess`);
    updateAds();


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


  mainPin.addEventListener(`mousedown`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinPress);


  // При загрузку неактивное состояние страницы
  window.disable.disablePage(true);


  window.activate = {
    onMainPinClick,
    onMainPinPress
  };

})();

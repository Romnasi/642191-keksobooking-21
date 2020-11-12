// filter.js
'use strict';

(() => {

  const MAX_SIMILAR_AD_COUNT = 5;

  const map = document.querySelector(`.map`);
  const mapAds = map.querySelector(`.map__pins`);
  const mapFilters = document.querySelector(`.map__filters`);
  const selectHousingType = mapFilters.querySelector(`#housing-type`);


  const currentFilter = {
    'housing-type': `any`
  };

  // Проверяем выбран ли option "любые"
  const isAny = function (filterValue) {
    return filterValue === `any`;
  };


  // Сравниваем значения объявлений и фильтра
  const is = function (elementValue, filterValue) {
    return isAny(filterValue) || elementValue === filterValue;
  };


  // Получаем отфильтрованные объявления
  const getFilteredAds = () => {
    const outElements = [];
    for (let i = 0; i < window.similarAds.length && outElements.length !== MAX_SIMILAR_AD_COUNT; i++) {
      const similarAd = window.similarAds[i];
      if (!is(similarAd.offer.type, currentFilter[`housing-type`])) {
        continue;
      }
      outElements.push(similarAd);
    }

    return outElements;
  };


  const onSelectFilterChange = (evt) => {
    // Перезаписываем значение текущего селекта
    currentFilter[evt.target.name] = evt.target.value;
    let filteredAds = getFilteredAds();
    window.remove.removeCard();
    window.util.renderChildren(mapAds, filteredAds, window.map.renderPinOnMap, window.remove.removePins);
  };

  selectHousingType.addEventListener(`change`, onSelectFilterChange);


  window.filter = {
    getFilteredAds
  };


})();

// filter.js
'use strict';

(() => {

  const MAX_SIMILAR_AD_COUNT = 5;

  const map = document.querySelector(`.map`);
  const mapAds = map.querySelector(`.map__pins`);
  const mapFilters = document.querySelector(`.map__filters`);
  const selectHousingType = mapFilters.querySelector(`#housing-type`);
  const selectHousingPrice = mapFilters.querySelector(`#housing-price`);
  const selectHousingRooms = mapFilters.querySelector(`#housing-rooms`);


  const currentFilter = {
    'housing-type': `any`,
    'housing-price': `any`,
    'housing-rooms': `any`
  };

  const rentalPrice = {
    'any': {
      MIN: 0,
      MAX: Infinity},
    'low': {
      MIN: 0,
      MAX: 9999},
    'middle': {
      MIN: 10000,
      MAX: 49999},
    'high': {
      MIN: 50000,
      MAX: Infinity}
  };

  // Проверяем выбран ли option "любые"
  const isAny = function (filterValue) {
    return filterValue === `any`;
  };


  // Сравниваем значения объявлений и фильтра
  const is = (elementValue, filterValue) => {
    return isAny(filterValue) || elementValue === filterValue;
  };


  // Сравниваем объявления по цене
  const checkPrice = (elementValue, filterValue) => {
    let minPrice = rentalPrice[filterValue].MIN;
    let maxPrice = rentalPrice[filterValue].MAX;
    return isAny(filterValue) || (minPrice <= elementValue && elementValue <= maxPrice);
  };

  // Сравниваем значения объявлений и фильтра по комнатам
  const checkRooms = (elementValue, filterValue) => {
    if (filterValue !== `any`) {
      filterValue = parseInt(filterValue, 10);
    }
    return isAny(filterValue) || elementValue === filterValue;
  };


  const isSimilarAds = (element) => {
    return is(element.offer.type, currentFilter[`housing-type`])
      && checkPrice(element.offer.price, currentFilter[`housing-price`])
      && checkRooms(element.offer.rooms, currentFilter[`housing-rooms`]);
  };


  const filter = (elements, cb, count) => {
    const outElements = [];
    for (let i = 0; i < elements.length && outElements.length !== count; i++) {
      const element = elements[i];
      if (!cb(element, i, elements)) {
        continue;
      }
      outElements.push(element);
    }
    return outElements;
  };


  const getFilteredAds = function () {
    const ads = window.similarAds;

    return filter(ads, isSimilarAds, MAX_SIMILAR_AD_COUNT);
  };


  const onSelectFilterChange = (evt) => {
    // Перезаписываем значение текущего селекта
    currentFilter[evt.target.name] = evt.target.value;
    let filteredAds = getFilteredAds();
    window.remove.removeCard();
    window.util.renderChildren(mapAds, filteredAds, window.map.renderPinOnMap, window.remove.removePins);
  };

  selectHousingType.addEventListener(`change`, onSelectFilterChange);
  selectHousingPrice.addEventListener(`change`, onSelectFilterChange);
  selectHousingRooms.addEventListener(`change`, onSelectFilterChange);


  window.filter = {
    getFilteredAds
  };


})();

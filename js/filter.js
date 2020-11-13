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
  const selectHousingGuests = mapFilters.querySelector(`#housing-guests`);
  const featureFieldset = mapFilters.querySelector(`.map__features`);


  // Словарь состояний фильтров для маппинга
  const currentFilter = {
    'housing-type': `any`,
    'housing-price': `any`,
    'housing-rooms': `any`,
    'housing-guests': `any`,
    'filter-wifi': `any`,
    'filter-dishwasher': `any`,
    'filter-parking': `any`,
    'filter-washer': `any`,
    'filter-elevator': `any`,
    'filter-conditioner': `any`
  };


  // Словарь цен для маппинга
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
  const checkType = (elementValue, filterValue) => {
    return isAny(filterValue) || elementValue === filterValue;
  };


  // Сравниваем объявления по цене
  const checkPrice = (elementValue, filterValue) => {
    let minPrice = rentalPrice[filterValue].MIN;
    let maxPrice = rentalPrice[filterValue].MAX;
    return isAny(filterValue) || (minPrice <= elementValue && elementValue <= maxPrice);
  };


  // Сравниваем значения объявлений и фильтра по комнатам
  const checkNumbers = (elementValue, filterValue) => {
    if (filterValue !== `any`) {
      filterValue = parseInt(filterValue, 10);
    }
    return isAny(filterValue) || elementValue === filterValue;
  };


  // Сравниваем значения объявлений и фильтра
  const checkFeatures = (elementValue, filterValue) => {
    return isAny(filterValue) || elementValue.includes(filterValue);
  };


  const isSimilarAds = (element) => {
    return checkType(element.offer.type, currentFilter[`housing-type`])
      && checkPrice(element.offer.price, currentFilter[`housing-price`])
      && checkNumbers(element.offer.rooms, currentFilter[`housing-rooms`])
      && checkNumbers(element.offer.guests, currentFilter[`housing-guests`])
      && checkFeatures(element.offer.features, currentFilter[`filter-wifi`])
      && checkFeatures(element.offer.features, currentFilter[`filter-dishwasher`])
      && checkFeatures(element.offer.features, currentFilter[`filter-parking`])
      && checkFeatures(element.offer.features, currentFilter[`filter-washer`])
      && checkFeatures(element.offer.features, currentFilter[`filter-elevator`])
      && checkFeatures(element.offer.features, currentFilter[`filter-conditioner`]);
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


  // Перезаписываем значение текущего чекбокса
  const changeCheckbox = (evt) => {
    if (currentFilter[evt.target.id] !== evt.target.value) {
      currentFilter[evt.target.id] = evt.target.value;
    } else {
      currentFilter[evt.target.id] = `any`;
    }
  };


  const onSelectFilterChange = (evt) => {
    if (evt.target.type === `checkbox`) {
      changeCheckbox(evt);
    } else {
      // Перезаписываем значение текущего селекта
      currentFilter[evt.target.name] = evt.target.value;
    }
    let filteredAds = getFilteredAds();
    window.remove.removeCard();
    window.util.renderChildren(mapAds, filteredAds, window.map.renderPinOnMap, window.remove.removePins);
  };


  selectHousingType.addEventListener(`change`, onSelectFilterChange);
  selectHousingPrice.addEventListener(`change`, onSelectFilterChange);
  selectHousingRooms.addEventListener(`change`, onSelectFilterChange);
  selectHousingGuests.addEventListener(`change`, onSelectFilterChange);
  // Делегирование, получаем события чекбоксов через филдсет
  featureFieldset.addEventListener(`change`, onSelectFilterChange);


  window.filter = {
    getFilteredAds
  };


})();

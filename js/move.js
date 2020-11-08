// move.js

"use strict";

(() => {

  // X = 62 , где 62 - ширина метки, 2 - пропорция: по ТЗ - нужна координата середины метки
  // Y = 62 + 22 - 6 = 78, где 62 - высота метки, 22 - высота основания метки, 6 - смещение вверх основания метки
  const ActiveMainPin = {
    WIDTH: 62,
    HEIGHT: 78,
    PROPORTION: 2
  };

  const MapSize = {
    MIN_WIDTH: 0,
    MAX_WIDTH: 1200,
    MIN_HEIGHT: 130,
    MAX_HEIGHT: 630,
  };


  const mainPin = document.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const inputAddress = adForm.elements.address;


  // Ограничения координат по горизонтали
  const coordinateBorderMinX = MapSize.MIN_WIDTH - (ActiveMainPin.WIDTH / ActiveMainPin.PROPORTION);
  const coordinateBorderMaxX = MapSize.MAX_WIDTH - (ActiveMainPin.WIDTH / ActiveMainPin.PROPORTION);


  // Получаем координат острого края активной метки
  const getLocationActiveMainPin = (coordX, coordY, widthPin, heightPin, proportion) => {
    const locationX = coordX + Math.ceil(widthPin / proportion);
    const locationY = coordY + heightPin;

    return `${locationX}, ${locationY}`;
  };

  // Записываем координаты в стили и в поле Адрес
  const writeCoord = (currentCoordX, currentCoordY) => {
    mainPin.style.left = currentCoordX + `px`;
    mainPin.style.top = currentCoordY + `px`;

    // Вызов функции получения координат острого края активной метки
    inputAddress.value = getLocationActiveMainPin(
        currentCoordX,
        currentCoordY,
        ActiveMainPin.WIDTH,
        ActiveMainPin.HEIGHT,
        ActiveMainPin.PROPORTION
    );
  };


  // Добавляем обработчик на главный пин
  mainPin.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    // Получаем координаты
    const getCoords = (typeEvt) => {

      const shift = {
        x: startCoords.x - typeEvt.clientX,
        y: startCoords.y - typeEvt.clientY
      };

      startCoords = {
        x: typeEvt.clientX,
        y: typeEvt.clientY
      };

      // Координаты главной метки по горизонтали
      let currentCoordX = mainPin.offsetLeft - shift.x;

      if (currentCoordX < coordinateBorderMinX) {
        currentCoordX = coordinateBorderMinX;
      } else if (currentCoordX > coordinateBorderMaxX) {
        currentCoordX = coordinateBorderMaxX;
      }

      // Координаты главной метки по по вертикали
      let currentCoordY = mainPin.offsetTop - shift.y;

      if (currentCoordY < MapSize.MIN_HEIGHT - ActiveMainPin.HEIGHT) {
        currentCoordY = MapSize.MIN_HEIGHT - ActiveMainPin.HEIGHT;
      } else if (currentCoordY > MapSize.MAX_HEIGHT - ActiveMainPin.HEIGHT) {
        currentCoordY = MapSize.MAX_HEIGHT - ActiveMainPin.HEIGHT;
      }

      writeCoord(currentCoordX, currentCoordY);
    };


    // Добавляем обработчик передвижения мыши на главный пин
    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      getCoords(moveEvt);
    };


    // Добавляем обработчик отпускания мыши на главный пин
    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      getCoords(upEvt);

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };


    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();

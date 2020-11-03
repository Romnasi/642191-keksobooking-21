// move.js

"use strict";

(function () {

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
  const getLocationActiveMainPin = function (coordX, coordY, widthPin, heightPin, proportion) {
    const locationX = coordX + Math.ceil(widthPin / proportion);
    const locationY = coordY + heightPin;

    return `${locationX}, ${locationY}`;
  };


  const calculationOfCoord = function (currentCoordX, currentCoordY) {
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

  mainPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;


    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
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

      if (currentCoordY < MapSize.MIN_HEIGHT) {
        currentCoordY = MapSize.MIN_HEIGHT;
      } else if (currentCoordY > MapSize.MAX_HEIGHT) {
        currentCoordY = MapSize.MAX_HEIGHT;
      }

      calculationOfCoord(currentCoordX, currentCoordY);
    };


    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      const shift = {
        x: startCoords.x - upEvt.clientX,
        y: startCoords.y - upEvt.clientY
      };

      startCoords = {
        x: upEvt.clientX,
        y: upEvt.clientY
      };

      const currentCoordX = mainPin.offsetLeft - shift.x;
      const currentCoordY = mainPin.offsetTop - shift.y;

      calculationOfCoord(currentCoordX, currentCoordY);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          mainPin.removeEventListener(`click`, onClickPreventDefault);
        };
        mainPin.addEventListener(`click`, onClickPreventDefault);
      }

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };


    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);

  });

})();

// pin.js
"use strict";

const mainPin = document.querySelector(`.map__pin--main`);

const MainPinStartCoord = {
  Y: 375,
  X: 570
};

const moveToStartPosition = () => {
  mainPin.style.left = `${MainPinStartCoord.X}px`;
  mainPin.style.top = `${MainPinStartCoord.Y}px`;
};

// Обработчик на пин активации при клике ЛКМ
const onMainPinClick = (evt) => {
  window.util.isMainMouseButtonEvent(evt, window.activate.activatePage);
};

// Обработчик на пин активации при нажатии Enter
const onMainPinPress = (evt) => {
  window.util.isEnterEvent(evt, window.activate.activatePage);
};

const addEventListenersOnPin = () => {
  mainPin.addEventListener(`mousedown`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinPress);
};


const removeEventListenersOnPin = () => {
  // Удаляем обработчики с главного пина
  mainPin.removeEventListener(`mousedown`, onMainPinClick);
  mainPin.removeEventListener(`keydown`, onMainPinPress);
};


// Удаляем пины кроме главного
const removePins = () => {
  const pins = document.querySelectorAll(`.map__pin`);
  pins.forEach((pin) => {
    if (pin !== mainPin) {
      pin.remove();
    }
  });
};


window.pin = {
  moveToStartPosition,
  removeEventListenersOnPin,
  addEventListenersOnPin,
  removePins
};

// util.js
'use strict';

const DEBOUNCE_INTERVAL = 500; // ms

const Keycode = {
  ESC: 27,
  ENTER: 13,
  MAIN_MOUSE_BUTTON: 0
};

const isEscEvent = (evt, action) => {
  if (evt.keyCode === Keycode.ESC) {
    action();
  }
};

const isClickEvent = (action) => {
  action();
};

const isEnterEvent = (evt, action) => {
  if (evt.keyCode === Keycode.ENTER) {
    action();
  }
};

const isMainMouseButtonEvent = (evt, action) => {
  if (evt.button === Keycode.MAIN_MOUSE_BUTTON) {
    action();
  }
};

// 1. Получить в функции список элементов которые хотим отрисовать
const renderChildren = (parentNode, elements, renderChild, clear = window.remove.removeChildren) => {
  clear(parentNode);
  // 2. Создать фрагмент
  const fragment = document.createDocumentFragment();
  // 3. Перебрать элементы
  elements.forEach((element) => {
    // 4. Создать DOM ноду, для каждого элемента
    const childNode = renderChild(element);
    // 5. Добавить ноду во фрагмент
    fragment.appendChild(childNode);
  });
  // 6. После цикла, добавить фрагмент в родительскую ноду
  parentNode.appendChild(fragment);
};

// Воруем метод forEach у массива с помощью call
const forEach = (elements, cb) => {
  return Array.prototype.forEach.call(elements, cb);
};


const debounce = (cb) => {
  let lastTimeout;

  return (...parameters) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      cb(...parameters);
    }, DEBOUNCE_INTERVAL);
  };
};


window.util = {
  isEscEvent,
  isClickEvent,
  isEnterEvent,
  isMainMouseButtonEvent,
  renderChildren,
  forEach,
  debounce
};

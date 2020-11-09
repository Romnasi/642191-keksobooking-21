// remove.js
'use strict';

(() => {

  const TIMEOUT_IN_MS = 10000;

  const Urls = {
    ONLOAD: `https://21.javascript.pages.academy/keksobooking`,
    LOAD: `https://21.javascript.pages.academy/keksobooking/data`
  };

  const statusCode = {
    OK: 200
  };

  const Methods = {
    GET: `GET`,
    POST: `POST`
  };


  // Проверяем статус ответа сервера
  const checkStatusCode = (xhr, onSuccess, onError) => {
    if (xhr.status === statusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  };


  // Обработчик на ошибку соединения
  const checkConnectError = (xhr, onError) => {
    xhr.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });
  };


  // Обработчик на ошибку таймаута
  const checkTimeoutError = (xhr, onError) => {
    xhr.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
  };


  const request = (URL, onSuccess, onError, method = Methods.GET, data) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      checkStatusCode(xhr, onSuccess, onError);
      onSuccess(xhr.response);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    checkConnectError(xhr, onError);
    checkTimeoutError(xhr, onError);

    xhr.open(method, URL);
    xhr.send(data);
  };


  // Отправляем на сервер
  const onload = (data, onSuccess) => {
    request(Urls.ONLOAD, onSuccess, window.error.onError, Methods.POST, data);
  };

  // Загружаем с сервера
  const load = (onSuccess) => {
    request(Urls.LOAD, onSuccess, window.error.onError, Methods.GET, null);
  };


  window.sync = {
    onload,
    load
  };


})();
// remove.js
'use strict';

(function () {

  const sendURL = `https://21.javascript.pages.academy/keksobooking`;
  const getURL = `https://21.javascript.pages.academy/keksobooking/data`;
  const statusCode = {
    OK: 200
  };

  const TIMEOUT_IN_MS = 1000;

  const Methods = {
    GET: `GET`,
    POST: `POST`
  };


  // Проверяем статус ответа сервера
  const checkStatusCode = function (xhr, onSuccess, onError) {
    if (xhr.status === statusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  };


  // Обработчик на ошибку соединения
  const checkConnectError = function (xhr, onError) {
    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
  };


  // Обработчик на ошибку таймаута
  const checkTimeoutError = function (xhr, onError) {
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });
  };


  const request = function (data, onSuccess, URL, method = Methods.GET, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (method === Methods.GET) {
        checkStatusCode(xhr, onSuccess, onError);
      } else {
        onSuccess(xhr.response);
      }
    });

    if (method === Methods.GET) {
      xhr.timeout = TIMEOUT_IN_MS;

      checkConnectError(xhr, onError);
      checkTimeoutError(xhr, onError);
    }

    xhr.open(method, URL);
    xhr.send(data);
  };


  // Отправляем на сервер
  const sendData = function (data, onSuccess) {
    request(data, onSuccess, sendURL, Methods.POST);
  };


  // Загружаем с сервера
  const getData = function (onSuccess, onError) {
    request(null, onSuccess, getURL, Methods.GET, onError);
  };


  window.sync = {
    sendData,
    getData
  };


})();

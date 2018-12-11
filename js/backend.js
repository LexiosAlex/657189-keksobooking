'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Превышено время выполнения запроса ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 5000;
    return xhr;
  };

  window.backend = {
    upload: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', SERVER_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', SERVER_URL + '/data');
      xhr.send();
    },
    error: function (errMessage) {
      var errNode = document.createElement('div');
      errNode.classList.add('error-message');
      errNode.textContent = errMessage;
      if (!errMessage) {
        errNode.textContent = 'Произошла ошибка';
      }
      document.body.insertAdjacentElement('afterbegin', errNode);
    }
  };
})();

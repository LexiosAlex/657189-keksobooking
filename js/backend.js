'use strict';

(function () {
  var SERVER_URL = 'https://js.dump.academy/keksobooking';
  var SUCCESS_RESPOND = 200;
  var SERVER_TIMEOUT = 5000;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_RESPOND) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    if (onError) {
      xhr.addEventListener('error', function () {
        onError('Ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Превышено время выполнения запроса ' + xhr.timeout + 'мс');
      });
      xhr.timeout = SERVER_TIMEOUT;
    }
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
      var errTemplate = document.querySelector('#error').content.querySelector('.error');
      var errElement = errTemplate.cloneNode(true);
      var errText = errElement.querySelector('.error__message');
      errText.textContent = errMessage;
      if (!errMessage) {
        errText.textContent = 'Произошла ошибка, попробуйте заполнить поля формы заново';
      }
      window.utils.adForm.insertAdjacentElement('afterend', errElement);
      var notice = window.utils.notice;

      var removeElement = function () {
        notice.removeChild(errElement);
        document.removeEventListener('keydown', onPopupEscPress);
      };
      var onPopupEscPress = function (evt) {
        window.utils.callIfIsEscEvent(evt, removeElement);
        document.removeEventListener('keydown', onPopupEscPress);
      };
      errElement.addEventListener('click', function () {
        removeElement();
      });
      document.addEventListener('keydown', onPopupEscPress);
    }
  };
})();

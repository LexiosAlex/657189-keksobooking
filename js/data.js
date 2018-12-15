'use strict';

(function () {
  var PIN_SIZE_X = 65;
  var PIN_SIZE_Y = 65;
  var ESC_KEYCODE = 27;
  var MAIN_PIN_TOP = 375;
  var MAIN_PIN_LEFT = 570;
  var userMapDialog = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var notice = document.querySelector('.notice');
  var mainPin = document.querySelector('.map__pin--main');

  window.data = {
    ESC_KEYCODE: ESC_KEYCODE,
    PIN_SIZE_X: PIN_SIZE_X,
    PIN_SIZE_Y: PIN_SIZE_Y,
    MAIN_PIN_TOP: MAIN_PIN_TOP,
    MAIN_PIN_LEFT: MAIN_PIN_LEFT,
    adForm: adForm,
    userMapDialog: userMapDialog,
    notice: notice,
    mainPin: mainPin,
    disableInputs: function (inputs, disable) {
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = disable;
      }
    },
    callIfIsEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    mapDisable: function () {
      userMapDialog.classList.add('map--faded');
      adForm.classList.add('ad-form--disabled');
    }
  };
})();

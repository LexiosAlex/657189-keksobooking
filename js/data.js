'use strict';

(function () {
  var PIN_SIZE_X = 65;
  var PIN_SIZE_Y = 65;
  var ESC_KEYCODE = 27;
  var userMapDialog = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var notice = document.querySelector('.notice');

  window.data = {
    ESC_KEYCODE: ESC_KEYCODE,
    PIN_SIZE_X: PIN_SIZE_X,
    PIN_SIZE_Y: PIN_SIZE_Y,
    adForm: adForm,
    userMapDialog: userMapDialog,
    notice: notice,
    disableInputs: function (inputs, disable) {
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = disable;
      }
    }
  };
})();

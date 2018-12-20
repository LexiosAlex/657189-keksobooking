'use strict';

(function () {
  var userMapDialog = window.utils.userMapDialog;
  var adForm = window.utils.adForm;
  var adFormInputs = adForm.querySelectorAll('fieldset');
  var adressInput = document.querySelector('#address');
  var pinMain = window.utils.mainPin;
  var disableInputs = window.utils.disableInputs;
  disableInputs(adFormInputs, true);

  var onMainPinMouseMove = function (evt) {
    disableInputs(adFormInputs, false);
    userMapDialog.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    if (!userMapDialog.classList.contains('map--filtered')) {
      window.backend.load(function (data) {
        window.pin.renderPins(data.slice(0, 5));
      });
    }

    window.backend.load(function (data) {
      window.filters.filterFunction(data);
    });

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var clickOffset = {
      x: startCoords.x - pinMain.offsetLeft - userMapDialog.offsetLeft,
      y: startCoords.y - pinMain.offsetTop - userMapDialog.offsetTop
    };

    var limits = {
      top: 130,
      right: userMapDialog.offsetWidth - window.utils.PIN_SIZE_X + userMapDialog.offsetLeft,
      bottom: 630,
      left: userMapDialog.offsetLeft
    };

    var onPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var relocate = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };

      if (moveEvt.clientX > limits.right + clickOffset.x) {
        relocate.x = userMapDialog.offsetWidt;
      } else if (moveEvt.clientX < limits.left + clickOffset.x) {
        relocate.x = 0;
      }
      if (moveEvt.clientY > limits.bottom + clickOffset.y) {
        relocate.y = limits.bottom;
      } else if (moveEvt.clientY < limits.top + clickOffset.y) {
        relocate.y = limits.top;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = relocate.y + 'px';
      pinMain.style.left = relocate.x + 'px';
    };

    var onMainPinMouseUp = function () {
      adressInput.value = parseInt(pinMain.style.left, 10) + ' , ' + parseInt(pinMain.style.top, 10);

      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onMainPinMouseUp);
    };

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  };

  pinMain.addEventListener('mousedown', onMainPinMouseMove);
})();


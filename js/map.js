'use strict';

(function () {
  var offerMapData = window.data.dataObjs;
  var userMapDialog = document.querySelector('.map');
  var similarPinElement = userMapDialog.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('fieldset');
  var disableInputs = window.data.isInputsDisabled;
  disableInputs(adFormInputs, true);
  var adressInput = document.querySelector('#address');
  var pinMain = userMapDialog.querySelector('.map__pin--main');

  var cardClose = function () {
    var mapCard = userMapDialog.querySelector('.map__card');
    if (mapCard) {
      userMapDialog.removeChild(mapCard);
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      cardClose();
    }
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offerMapData.length; i++) {
      var pin = fragment.appendChild(window.pin(offerMapData[i]));
      pin.dataset.pinId = i;

      pin.addEventListener('click', function (evt) {
        cardClose();
        var pinId = evt.currentTarget.dataset.pinId;
        userMapDialog.insertBefore(window.card(offerMapData[pinId]), userMapDialog.querySelector('.map__filters-container'));
        var closeCard = userMapDialog.querySelector('.map__card .popup__close');
        closeCard.addEventListener('click', function () {
          cardClose();
        });

        document.addEventListener('keydown', onCardEscPress);
      });
    }
    similarPinElement.appendChild(fragment);
  };

  var moveMainPin = function (evt) {
    disableInputs(adFormInputs, false);
    userMapDialog.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var clickOfffset = {
      x: startCoords.x - pinMain.offsetLeft - userMapDialog.offsetLeft,
      y: startCoords.y - pinMain.offsetTop - userMapDialog.offsetTop
    };

    var limits = {
      top: 130,
      right: userMapDialog.offsetWidth - window.data.PIN_SIZE_X + userMapDialog.offsetLeft,
      bottom: 630,
      left: userMapDialog.offsetLeft
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      var relocate = {
        x: pinMain.offsetLeft - shift.x,
        y: pinMain.offsetTop - shift.y
      };

      if (moveEvt.clientX > limits.right + clickOfffset.x) {
        relocate.x = userMapDialog.offsetWidt;
      } else if (moveEvt.clientX < limits.left + clickOfffset.x) {
        relocate.x = 0;
      }
      if (moveEvt.clientY > limits.bottom + clickOfffset.y) {
        relocate.y = limits.bottom;
      } else if (moveEvt.clientY < limits.top + clickOfffset.y) {
        relocate.y = limits.top;
      }

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = relocate.y + 'px';
      pinMain.style.left = relocate.x + 'px';
    };

    var onMouseUp = function () {
      adressInput.value = parseInt(pinMain.style.left, 10) + ' , ' + parseInt(pinMain.style.top, 10);
      renderPins();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pinMain.addEventListener('mousedown', moveMainPin);
})();

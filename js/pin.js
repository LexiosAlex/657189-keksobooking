'use strict';

(function () {
  var userMapDialog = window.utils.userMapDialog;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarPinElement = userMapDialog.querySelector('.map__pins');
  var mainPin = window.utils.mainPin;

  var mainPinDefPos = function () {
    mainPin.style.left = window.utils.MAIN_PIN_LEFT + 'px';
    mainPin.style.top = window.utils.MAIN_PIN_TOP + 'px';
  };

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  };

  var removeAdditionalPins = function () {
    var pins = document.querySelectorAll('.map__pin');
    pins.forEach(function (el) {
      if (el !== mainPin) {
        similarPinElement.removeChild(el);
      }
    });
  };

  var renderPins = function (offerMapData) {
    var fragment = document.createDocumentFragment();
    offerMapData.forEach(function callback(currentValue, index) {
      var render = true;

      if (offerMapData.length < 1) {
        render = false;
      }

      if (!currentValue.offer) {
        render = false;
      }

      if (render === true) {
        var pin = fragment.appendChild(renderPin(currentValue));
        pin.dataset.pinId = index;

        pin.addEventListener('click', function (evt) {
          window.card.cardClose();

          var pinId = evt.currentTarget.dataset.pinId;
          userMapDialog.insertBefore(window.card.renderCard(offerMapData[pinId]), userMapDialog.querySelector('.map__filters-container'));

          var closeCard = userMapDialog.querySelector('.map__card .popup__close');
          closeCard.addEventListener('click', function () {
            window.card.cardClose();
          });

          document.addEventListener('keydown', window.card.onCardEscPress);
        });
      }
    });
    similarPinElement.appendChild(fragment);
  };

  window.pin = {
    renderPins: renderPins,
    removePins: removeAdditionalPins,
    mainPinDefPos: mainPinDefPos
  };

})();

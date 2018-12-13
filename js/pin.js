'use strict';

(function () {
  var userMapDialog = window.data.userMapDialog;
  var offerMapData = window.data.dataObjs;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var similarPinElement = userMapDialog.querySelector('.map__pins');

  var renderPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = pin.location.x + 'px';
    pinElement.style.top = pin.location.y + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;

    return pinElement;
  };

  var renderPins = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offerMapData.length; i++) {
      var pin = fragment.appendChild(renderPin(offerMapData[i]));
      pin.dataset.pinId = i;

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
    similarPinElement.appendChild(fragment);
  };

  window.pin = {
    renderPin: renderPin,
    renderPins: renderPins
  };
})();

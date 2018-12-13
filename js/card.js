'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var cardClose = function () {
    var mapCard = window.data.userMapDialog.querySelector('.map__card');
    if (mapCard) {
      window.data.userMapDialog.removeChild(mapCard);
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.data.ESC_KEYCODE) {
      cardClose();
    }
  };

  var renderCard = function (cardData) {
    var cardElement = cardTemplate.cloneNode(true);
    var featuresNode = cardElement.querySelector('.popup__features');
    var popupPhoto = cardElement.querySelector('.popup__photo');

    while (featuresNode.firstChild) {
      featuresNode.removeChild(featuresNode.firstChild);
    }

    var createFeatureFragment = function (objData) {
      var dataLength = objData.offer.features.length;
      var popupFeaturesList = featuresNode;
      for (var j = 0; j < dataLength; j++) {
        var featureItem = document.createElement('li');
        featureItem.className = 'popup__feature popup__feature--' + cardData.offer.features[j];
        popupFeaturesList.appendChild(featureItem);
      }
      return popupFeaturesList;
    };

    var createPhotosFragment = function (photoData) {
      var photosFragment = document.createDocumentFragment();
      photoData.offer.photos.forEach(function (el) {
        var popupPhotoItem = popupPhoto.cloneNode(true);
        popupPhotoItem.src = el;
        photosFragment.appendChild(popupPhotoItem);
      });
      return photosFragment;
    };

    cardElement.querySelector('img').src = cardData.author.avatar;
    cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = cardData.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    cardElement.replaceChild(createFeatureFragment(cardData), featuresNode);
    cardElement.querySelector('.popup__description').textContent = cardData.offer.description;
    cardElement.querySelector('.popup__photos').removeChild(popupPhoto);
    cardElement.querySelector('.popup__photos').appendChild(createPhotosFragment(cardData));

    return cardElement;
  };

  window.card = {
    renderCard: renderCard,
    cardClose: cardClose,
    onCardEscPress: onCardEscPress
  };
})();

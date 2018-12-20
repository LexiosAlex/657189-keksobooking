'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var cardClose = function () {
    var mapCard = window.utils.userMapDialog.querySelector('.map__card');
    if (mapCard) {
      window.utils.userMapDialog.removeChild(mapCard);
      document.removeEventListener('keydown', onCardEscPress);
    }
  };

  var onCardEscPress = function (evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE) {
      cardClose();
    }
  };

  var createPhotosFragment = function (photoData) {
    var photosFragment = document.createDocumentFragment();
    photoData.offer.photos.forEach(function (el) {
      var popupPhotoItem = document.createElement('img');
      popupPhotoItem.src = el;
      popupPhotoItem.classList.add('popup__photo');
      popupPhotoItem.width = 45;
      popupPhotoItem.height = 40;
      popupPhotoItem.alt = 'Фотография жилья';
      photosFragment.appendChild(popupPhotoItem);
    });
    return photosFragment;
  };

  var createFeatureFragment = function (objData) {
    var dataLength = objData.offer.features.length;
    var featuresFragment = document.createDocumentFragment();
    for (var j = 0; j < dataLength; j++) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + objData.offer.features[j];
      featuresFragment.appendChild(featureItem);
    }
    return featuresFragment;
  };

  var renderCard = function (cardData) {
    var cardElement = cardTemplate.cloneNode(true);
    var featuresNode = cardElement.querySelector('.popup__features');
    var popupPhoto = cardElement.querySelector('.popup__photo');
    var features = createFeatureFragment(cardData);
    while (featuresNode.firstChild) {
      featuresNode.removeChild(featuresNode.firstChild);
    }

    var offerType = null;
    if (cardData.offer.type === 'bungalo') {
      offerType = 'Бунгало';
    } else if (cardData.offer.type === 'house') {
      offerType = 'Дом';
    } else if (cardData.offer.type === 'flat') {
      offerType = 'Квартира';
    } else if (cardData.offer.type === 'palace') {
      offerType = 'Дворец';
    }

    cardElement.querySelector('img').src = cardData.author.avatar;
    cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = cardData.offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = offerType;
    cardElement.querySelector('.popup__text--capacity').textContent = cardData.offer.rooms + ' комнаты для ' + cardData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardData.offer.checkin + ', выезд до ' + cardData.offer.checkout;
    if (cardData.offer.features.length > 0) {
      featuresNode.appendChild(features);
    } else {
      cardElement.removeChild(featuresNode);
    }
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

'use strict';

var PIN_SIZE_X = 65;
var PIN_SIZE_Y = 65;

function compareRandom() {
  return Math.random() - 0.5;
}

var getAvatarNumbers = function (avatarsAmount) {
  var avatarsArr = [];
  for (var i = 0; i < avatarsAmount; i++) {
    avatarsArr[i] = '0' + (i + 1);
  }
  return avatarsArr;
};

var avatars = getAvatarNumbers(8);
var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var getRandomArrayValues = function (arr) {
  arr.sort(compareRandom);
  return arr;
};

var getRandomAmount = function (minValue, maxValue) {
  var randomAmount = Math.floor(Math.random() * (maxValue - minValue) + minValue);
  return randomAmount;
};

var roomTypes = ['palace', 'flat', 'house', 'bungalo'];

var checkTimes = ['12:00', '13:00', '14:00'];
var getRandomArrayValue = function (arr) {
  var randomValue = Math.floor(Math.random() * arr.length);
  randomValue = arr[randomValue];
  return randomValue;
};

var features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var getFeaturesArr = function (featuresArr) {
  var randomedFeaturesArr = getRandomArrayValues(featuresArr);
  var arrLength = getRandomAmount(1, randomedFeaturesArr.length);
  var soretedArr = [];
  for (i = 0; i < arrLength; i++) {
    soretedArr[i] = randomedFeaturesArr[i];
  }
  return soretedArr;
};

var homePhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var getDataObjs = function (dataAmount) {
  var dataObjs = [];
  for (var i = 0; i < dataAmount; i++) {

    var randomedTitles = getRandomArrayValues(titles);
    var randomedPrice = getRandomAmount(1000, 1000000);
    var randomedRoomTypes = getRandomArrayValues(roomTypes);
    var rommsAmount = getRandomAmount(1, 5);
    var guestsAmount = getRandomAmount(1, 10);
    var checkinTime = getRandomArrayValue(checkTimes);
    var checkoutTime = getRandomArrayValue(checkTimes);
    var sortedFeatures = getFeaturesArr(features);
    var homePhotosSort = getRandomArrayValues(homePhotos);
    var locY = getRandomAmount(PIN_SIZE_Y, 630 - PIN_SIZE_Y / 2);
    var locX = getRandomAmount(PIN_SIZE_X, 1200 - PIN_SIZE_X);
    var adressLine = locY + ', ' + locX;

    var dataObj = {
      author: {
        avatar: 'img/avatars/user' + avatars[i] + '.png'
      },

      offer: {
        title: randomedTitles[1],
        address: adressLine,
        price: randomedPrice,
        type: randomedRoomTypes[1],
        rooms: rommsAmount,
        guests: guestsAmount,
        checkin: checkinTime,
        checkout: checkoutTime,
        features: sortedFeatures,
        description: null,
        photos: homePhotosSort
      },

      location: {
        locationX: locX,
        locationY: locY
      }
    };
    dataObjs[i] = dataObj;
  }
  return dataObjs;
};

var offerMapData = getDataObjs(8);

var userMapDialog = document.querySelector('.map');
userMapDialog.classList.remove('map--faded');
var similarPinElement = userMapDialog.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = pin.location.locationX + 'px';
  pinElement.style.top = pin.location.locationY + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < offerMapData.length; i++) {
  fragment.appendChild(renderPin(offerMapData[i]));
}
similarPinElement.appendChild(fragment);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var renderCard = function (cardData) {
  var cardElement = cardTemplate.cloneNode(true);
  var featuresNode = cardElement.querySelector('.popup__features');
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

  var popupPhoto = cardElement.querySelector('.popup__photo');
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
  cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photo'));
  cardElement.querySelector('.popup__photos').appendChild(createPhotosFragment(cardData));

  return cardElement;
};

var fragmentCard = document.createDocumentFragment();
fragmentCard.appendChild(renderCard(offerMapData[0]));
userMapDialog.insertBefore(fragmentCard, userMapDialog.querySelector('map__filters-container'));

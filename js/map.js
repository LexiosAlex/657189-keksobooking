'use strict';

var PIN_SIZE_X = 65;
var PIN_SIZE_Y = 65;

function compareRandom () {
  return Math.random() - 0.5;
}

var getAvatarNumbers = function (avatarsAmount) {
  var avatarsArr = [];
  for (var i = 0; i < avatarsAmount; i++) {
    avatarsArr[i] = '0' + (i + 1);
  }
  return avatarsArr
}

var avatars = getAvatarNumbers(8);
var titles = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
]

var getRandomArrayValues = function (arr) {
  arr.sort(compareRandom);
  return arr;
}

var randomedTitles = getRandomArrayValues(titles);

function getRandomAmount (minValue, maxValue) {
  var randomAmount = Math.floor(Math.random() * (maxValue - minValue) + minValue);
  return randomAmount;
}

var randomedPrice = getRandomAmount(1000, 1000000);

var roomTypes = ['palace', 'flat', 'house', 'bungalo'];
var randomedRoomTypes = getRandomArrayValues(roomTypes);

var rommsAmount = getRandomAmount(1, 5);

var guestsAmount = getRandomAmount(0, 10);

var checkTimes = ['12:00', '13:00', '14:00'];
var getRandomArrayValue = function(arr) {
  var RandomValue = Math.floor(Math.random() * arr.length);
  return RandomValue  = arr[RandomValue];
}
var checkinTime = getRandomArrayValue(checkTimes);
var checkoutTime = getRandomArrayValue(checkTimes);

var featuresArr = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
]

var getFeaturesArr = function(featuresArr) {
  var featuresArr = getRandomArrayValues(featuresArr);
  var arrLength = getRandomAmount(1, featuresArr.length);
  var soretedArr = [];
  for (i = 0; i < arrLength; i++){
    soretedArr = featuresArr[i];
  }
  return soretedArr
}

var sortedFeatures = getFeaturesArr;

var homePhotos = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

var homePhotosSort = getRandomArrayValues(homePhotos);

var getDataObjs = function (dataAmount) {
  var dataObjs = [];
  for (var i = 0; i < dataAmount; i++) {
  var randomedTitles = getRandomArrayValues(titles);

  var locY = getRandomAmount(PIN_SIZE_Y, 630 - PIN_SIZE_Y/2);

  var locX = getRandomAmount(PIN_SIZE_X, 1200 - PIN_SIZE_X);

  var adressLine = locY + ', ' + locX;
  var dataObj = {
    author: {
      avatar: 'img/avatars/user' + avatars[i] + '.png'
    },

    offer: {
      title: randomedTitles[1],
    // строка, заголовок предложения, одно из фиксированных значений . Значения не должны повторяться.
    address: adressLine, //toString
    // строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
    price: randomedPrice,
    // число, случайная цена от 1000 до 1 000 000
    type: randomedRoomTypes[i],
    // строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
    rooms: rommsAmount,
    // число, случайное количество комнат от 1 до 5
    guests: guestsAmount,
    // число, случайное количество гостей, которое можно разместить
    checkin: checkinTime,
     // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
    checkout: checkoutTime,
     // строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
    features: sortedFeatures,
     // массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
    description: null,
     // пустая строка,
    photos: homePhotosSort
    //  // массив из строк "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg" и "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    //  // расположенных в произвольном порядке
    },
    mapLocation: {
    locationX: locX,
     // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    locationY: locY
     // случайное число, координата y метки на карте от 130 до 630.
  }
  }
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

  pinElement.style.left = pin.mapLocation.locationX + 'px';
  pinElement.style.top = pin.mapLocation.locationY + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
  }

var fragment = document.createDocumentFragment();
for (var i = 0; i < offerMapData.length; i++) {
  fragment.appendChild(renderPin(offerMapData[i]));
}
similarPinElement.appendChild(fragment);
























// for (var i = 0; i < 4; i++) {
//   var pinElement = pinTemplate.cloneNode(true);

//   similarPinElement.appendChild(pinElement);
// }

// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card')

// var renderPopup = function (author, offer) {
//   var cardElement = cardTemplate.cloneNode(true);

//     cardElement.querySelector('img').src = author.avatar;
//     cardElement.querySelector('.popup__title').textContent = offer.title;
//     cardElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
//     cardElement.querySelector('.popup__type').textContent = offer.type;
//     cardElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
//     cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
//     // cardElement.querySelector('.popup__features')
//     cardElement.querySelector('.popup__description').textContent = offer.description;
//     // cardElement.querySelector('.popup__photos')

// }


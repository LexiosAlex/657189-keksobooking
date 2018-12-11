'use strict';

(function () {

  var PIN_SIZE_X = 65;
  var PIN_SIZE_Y = 65;
  var ESC_KEYCODE = 27;
  var userMapDialog = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

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
    for (var i = 0; i < arrLength; i++) {
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
          x: locX,
          y: locY
        }
      };
      dataObjs[i] = dataObj;
    }

    return dataObjs;
  };

  var randomize = function () {
    return Math.random() - 0.5;
  };

window.data =  {
    ESC_KEYCODE: ESC_KEYCODE,
    PIN_SIZE_X: PIN_SIZE_X,
    PIN_SIZE_Y: PIN_SIZE_Y,
    adForm: adForm,
    userMapDialog: userMapDialog,
    disableInputs: function (inputs, disable) {
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = disable;
      }
    },
    compareRandom: function () {
      return randomize();
    },
    getRandomArrValues: function (arr) {
      return arr.sort(randomize);
    },
    getRandomArrValue: function (arrName) {
      var length = arrName.length;
      return arrName[Math.floor(Math.random() * length)];
    },
    dataObjs: getDataObjs(8),
  };
})();

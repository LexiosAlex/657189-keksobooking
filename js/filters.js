'use strict';

(function () {
  var userMapDialog = window.utils.userMapDialog;
  var filtersForm = document.querySelector('.map__filters');
  var houseType = filtersForm.querySelector('#housing-type');
  var housePrice = filtersForm.querySelector('#housing-price');
  var houseRooms = filtersForm.querySelector('#housing-rooms');
  var houseGuests = filtersForm.querySelector('#housing-guests');
  var featuresHouse = filtersForm.querySelector('#housing-features');
  var OFFER_MIN_PRICE = 10000;
  var OFFER_MAX_PRICE = 50000;
  var ANY_TYPE = 'any';
  var LOW = 'low';
  var HIGHT = 'high';
  var MIDDLE = 'middle';

  var filterByStrSelect = function (element, data, objKey) {
    var selectedElement = element.options[element.selectedIndex].value;
    if (selectedElement === ANY_TYPE) {
      return data;
    } else {
      var filterArray = data.filter(function (pin) {
        return pin.offer[objKey].toString() === selectedElement;
      });
      return filterArray;
    }
  };

  var filerByPrice = function (element, data) {
    var selectedElement = element.options[element.selectedIndex].value;
    var filterArray;
    if (selectedElement === ANY_TYPE) {
      return data;
    } else if (selectedElement === LOW) {
      filterArray = data.filter(function (pin) {
        return pin.offer.price < OFFER_MIN_PRICE;
      });
    } else if (selectedElement === HIGHT) {
      filterArray = data.filter(function (pin) {
        return pin.offer.price > OFFER_MAX_PRICE;
      });
    } else if (selectedElement === MIDDLE) {
      filterArray = data.filter(function (pin) {
        return (pin.offer.price > OFFER_MIN_PRICE && pin.offer.price < OFFER_MAX_PRICE);
      });
    }
    return filterArray;
  };

  var filterByFeatures = function (data) {
    var checkedElements = featuresHouse.querySelectorAll('input:checked');
    var checkedFeatures = [];
    for (var i = 0; i < checkedElements.length; i++) {
      checkedFeatures[i] = checkedElements[i].value;
    }

    var filterArray = data.filter(function (pin) {
      return checkedFeatures.every(function (cf) {
        return pin.offer.features.indexOf(cf) !== -1;
      });
    });
    return filterArray;
  };

  var filterFunction = function (data) {

    var renderData = data.slice();
    var updatePins = window.debounce(function () {
      userMapDialog.classList.remove('map--filtered');
      userMapDialog.classList.add('map--filtered');
      window.card.cardClose();
      window.pin.removePins();
      renderData = data.slice();
      renderData = filterByStrSelect(houseType, renderData, 'type');
      renderData = filterByStrSelect(houseRooms, renderData, 'rooms');
      renderData = filerByPrice(housePrice, renderData);
      renderData = filterByStrSelect(houseGuests, renderData, 'guests');
      renderData = filterByFeatures(renderData);
      if (renderData.length > 4) {
        renderData = renderData.slice(0, 5);
      }
      window.pin.renderPins(renderData);
    });

    filtersForm.addEventListener('change', function () {
      updatePins();
    });
  };
  window.filters = {
    filterFunction: filterFunction
  };
})();

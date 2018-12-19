'use strict';

(function () {
  var userMapDialog = window.utils.userMapDialog;
  var filtersForm = document.querySelector('.map__filters');
  var houseType = filtersForm.querySelector('#housing-type');
  var housePrice = filtersForm.querySelector('#housing-price');
  var houseRooms = filtersForm.querySelector('#housing-rooms');
  var houseGuests = filtersForm.querySelector('#housing-guests');
  var featuresHouse = filtersForm.querySelector('#housing-features');
  var anyType = 'any';
  var low = 'low';
  var hight = 'high';
  var middle = 'middle';

  var filterByStrSelect = function (element, data, objKey) {
    var selectedElement = element.options[element.selectedIndex].value;
    if (selectedElement === anyType) {
      return data;
    } else {
      var filterArray = data.filter(function (pin) {
        return (pin.offer[objKey] === selectedElement);
      });
      return filterArray;
    }
  };

  var filterByIntSelect = function (element, data, objKey) {
    var selectedElement = element.options[element.selectedIndex].value;
    if (selectedElement === anyType) {
      return data;
    } else {
      var filterArray = data.filter(function (pin) {
        return (pin.offer[objKey] === parseInt(selectedElement, 10));
      });
      return filterArray;
    }
  };

  var filerByPrice = function (element, data) {
    var selectedElement = element.options[element.selectedIndex].value;
    var filterArray;
    if (selectedElement === anyType) {
      return data;
    } else if (selectedElement === low) {
      filterArray = data.filter(function (pin) {
        return (pin.offer.price < 10000);
      });
      return filterArray;
    } else if (selectedElement === hight) {
      filterArray = data.filter(function (pin) {
        return (pin.offer.price > 50000);
      });
      return filterArray;
    } else if (selectedElement === middle) {
      filterArray = data.filter(function (pin) {
        return (pin.offer.price > 10000 && pin.offer.price < 50000);
      });
      return filterArray;
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

  window.backend.load(function (data) {

    var renderData = data.slice();
    var updatePins = function () {
      userMapDialog.classList.remove('map--filtered');
      userMapDialog.classList.add('map--filtered');
      window.card.cardClose();
      window.pin.removePins();
      renderData = data.slice();
      renderData = filterByStrSelect(houseType, renderData, 'type');
      renderData = filterByIntSelect(houseRooms, renderData, 'rooms');
      renderData = filerByPrice(housePrice, renderData);
      renderData = filterByIntSelect(houseGuests, renderData, 'guests');
      renderData = filterByFeatures(renderData);
      if (renderData.length > 4) {
        renderData = renderData.slice(0, 5);
      }
      window.pin.renderPins(renderData);
    };

    filtersForm.addEventListener('change', function () {
      setTimeout(function () {
        updatePins();
      }, 500);
    });
  });
})();

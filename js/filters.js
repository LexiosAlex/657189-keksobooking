'use strict';

(function () {
  var mainPin = window.data.mainPin;
  var userMapDialog = window.data.userMapDialog;
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

  var filterSort = function(element, data, objKey) {
    var selectedElement = element.options[element.selectedIndex].value;
    var getArray = function(){
      if (selectedElement == 'any') {
        return data;
      } else if(objKey == 'type') {
        var sorted = data.filter(function (pin) {
          return (pin.offer[objKey] === selectedElement);
        });
        return sorted;
      } else if(objKey == 'rooms') {
        var sorted = data.filter(function (pin) {
          return (pin.offer[objKey]  == selectedElement);
        });
        return sorted;
      } else if (objKey == 'guests') {
        var sorted = data.filter(function (pin) {
          return (pin.offer[objKey]  == selectedElement);
        });
        return sorted;
      }
    }
    return getArray();
  };

  var priceSort = function(element, data) {
    var selectedElement = element.options[element.selectedIndex].value;

    var getArray = function(){
    if (selectedElement == 'any') {
      return data;
    } else if(selectedElement == low) {
      var sorted = data.filter(function (pin) {
        return (pin.offer.price < 10000);
      });
      return sorted;
    } else if(selectedElement == hight) {
      var sorted = data.filter(function (pin) {
        return (pin.offer.price > 50000);
      });
      return sorted;
    } else if (selectedElement == middle) {
      var sorted = data.filter(function (pin) {
        return (pin.offer.price > 10000 && pin.offer.price < 50000);
      });
      return sorted;
    }
  }
  return getArray();
  };



  var featuresSort = function(data) {
    var checkedElements = featuresHouse.querySelectorAll('input:checked');
    var checkedFeatures = [];
    for (var i= 0; i < checkedElements.length; i++){
      checkedFeatures[i] = checkedElements[i].value;
    }

     var sorted = data.filter(function (pin) {
        return checkedFeatures.every(function (cf) {
          return pin.offer.features.indexOf(cf) !== -1
        })
      });
     return sorted;
  }


    window.backend.load(function(data){
      var renderData = data.slice();
      var uniqueArray = function(){
        renderData = renderData.filter(function (it, i) {
          return renderData.indexOf(it) === i;
        });
      };

      filtersForm.addEventListener('change', function() {
        window.card.cardClose();
        window.pin.removePins();
        var renderData = data.slice();
        renderData = filterSort(houseType, renderData, 'type');
        renderData = filterSort(houseRooms, renderData, 'rooms');
        renderData = priceSort(housePrice, renderData);
        renderData = filterSort(houseGuests, renderData, 'guests');
        renderData = featuresSort(renderData);
        uniqueArray();
        window.pin.renderPins(renderData);
      });

  });


})();

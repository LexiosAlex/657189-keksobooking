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
    // var pins = document.querySelectorAll('.map__pin');
  // for (var i = 0; i < pins.length; i++) {
  //   var objKeys = Object.keys(data[i].offer);
  //     if (objKeys[i].type !== selectedElement) {
  //       if (pins[i] !== mainPin) {
  //         console.log(pins[i].dataset.pinId);
  //         similarPinElement.removeChild(pins[i]);
  //       }
  //     }
  //   }
  var getArray = function(){
    if (selectedElement == 'any') {
      return [];
    } else if(objKey == 'type') {
      var sorted = data.filter(function (pin) {
        return (pin.offer.type === selectedElement);
      });
      return sorted;
    } else if(objKey == 'rooms') {
      var sorted = data.filter(function (pin) {
        return (pin.offer.rooms == selectedElement);
      });
      return sorted;
    } else if (objKey == 'guests') {
      var sorted = data.filter(function (pin) {
        return (pin.offer.guests == selectedElement);
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
      return [];
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
    // features = featuresHouse.querySelectorAll('input');
     var sorted = data.filter(function (pin) {
        return pin.offer.features == checkedFeatures
      });

  }


    window.backend.load(function(data){
      var renderData = [];

      houseType.addEventListener('change', function () {
        console.log(filterSort(houseType, data, 'type'));
        renderData.push(filterSort(houseType, data, 'type'));
        console.log(renderData);

      });

      houseRooms.addEventListener('change', function () {
        console.log(filterSort(houseRooms, data, 'rooms'));
        renderData.push(filterSort(houseRooms, data, 'rooms'));
        console.log(renderData);
      });

      housePrice.addEventListener('change', function(){
        console.log(priceSort(housePrice, data));
        renderData.push(priceSort(housePrice, data));
        console.log(renderData);
      });

      houseGuests.addEventListener('change', function () {
        console.log(filterSort(houseGuests, data, 'guests'));
        renderData.push(filterSort(houseGuests, data, 'guests'));
        console.log(renderData);
      });


      // console.log(renderData);

      // var uniqueArray =
      //   renderData.filter(function (it, i) {
      // return renderData.indexOf(it) === i;
      // });

      // console.log(uniqueArray);
  });


})();

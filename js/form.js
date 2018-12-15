'use strict';

(function () {
  var houseType = document.querySelector('#type');
  var housePrice = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var roomOptions = roomCapacity.querySelectorAll('option');
  var adForm = window.data.adForm;
  var adFormInputs = adForm.querySelectorAll('fieldset');
  var disableInputs = window.data.disableInputs;
  var houseTypePrice = {
    flat: 1000,
    bungalo: 0,
    house: 5000,
    palace: 10000
  };

  var capacityOfRooms = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  disableInputs(roomOptions, true);
  var getSelectedElement = function (element, syncObj) {
    var objKeys = Object.keys(syncObj);
    var selectedElement = element.options[element.selectedIndex].value;
    for (var i = 0; i < objKeys.length; i++) {
      if (selectedElement === objKeys[i]) {
        var returnObj = objKeys[i];
      }
    }
    return returnObj;
  };

  houseType.addEventListener('change', function () {
    var selectValue = getSelectedElement(houseType, houseTypePrice);
    housePrice.placeholder = houseTypePrice[selectValue];
    housePrice.min = houseTypePrice[selectValue];
  });

  var syncSelects = function (select1, select2) {
    var val = select1.value;
    var options = select2.querySelectorAll('option');
    for (var i = 0; i < options.length; i++) {
      if (options[i].value === val) {
        options[i].selected = true;
      }
    }
  };

  timeInSelect.addEventListener('change', function () {
    syncSelects(timeInSelect, timeOutSelect);
  });

  timeOutSelect.addEventListener('change', function () {
    syncSelects(timeOutSelect, timeInSelect);
  });

  roomNumber.addEventListener('change', function () {
    disableInputs(roomOptions, true);
    var selectValue = getSelectedElement(roomNumber, capacityOfRooms);
    var trueValues = capacityOfRooms[selectValue];
    trueValues.forEach(function (e) {
      var roomOption = roomCapacity.querySelector('option[value="' + [e] + '"]');
      roomOption.disabled = false;
    });
  });

  roomCapacity.options[roomCapacity.selectedIndex].disabled = false;

  var formSucess = function () {
    var notice = window.data.notice;
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    var text = successElement.querySelector('.success__message');
    text.textContent = 'Данные отправлены успешно';
    window.data.adForm.insertAdjacentElement('afterend', successElement);

    var removeElement = function () {
      notice.removeChild(successElement);
    };
    var onPopupEscPress = function (evt) {
      window.data.callIfIsEscEvent(evt, removeElement);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    successElement.addEventListener('click', removeElement);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var whenSucessRespond = function () {
    formSucess();
    window.data.mapDisable();
    disableInputs(adFormInputs, true);
    window.pin.removePins();
    window.pin.mainPinDefPos();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), function () {
      whenSucessRespond();
    }, window.backend.error);
    adForm.reset();
  });
})();

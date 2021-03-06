'use strict';

(function () {
  var houseType = document.querySelector('#type');
  var housePrice = document.querySelector('#price');
  var timeInSelect = document.querySelector('#timein');
  var timeOutSelect = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var roomCapacity = document.querySelector('#capacity');
  var roomOptions = roomCapacity.querySelectorAll('option');
  var avatarChooser = document.querySelector('#avatar');
  var avatarImgContainer = document.querySelector('.ad-form-header__preview');
  var previewAvatar = avatarImgContainer.querySelector('img');
  var roomChooser = document.querySelector('#images');
  var roomImgContainer = document.querySelector('.ad-form__photo-container');
  var adForm = window.utils.adForm;
  var adFormInputs = adForm.querySelectorAll('fieldset');
  var disableInputs = window.utils.disableInputs;
  var resetBtn = adForm.querySelector('.ad-form__reset');
  var houseTypePrice = {
    FLAT: 1000,
    BUNGALO: 0,
    HOUSE: 5000,
    PALACE: 10000
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
    var returnObj;
    objKeys.forEach(function (el) {
      if (selectedElement === el.toLowerCase()) {
        returnObj = el;
      }
    });
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
    options.forEach(function (el) {
      if (el.value === val) {
        el.selected = true;
      }
    });
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
    var roomOption = roomCapacity.querySelector('option[value="' + trueValues[0] + '"]');
    roomOption.selected = true;
    trueValues.forEach(function (e) {
      roomOption = roomCapacity.querySelector('option[value="' + [e] + '"]');
      roomOption.disabled = false;
    });
  });

  window.uploadFiles.choosePhotoFile(avatarChooser, previewAvatar);
  window.uploadFiles.choosePhotoFiles(roomChooser, roomImgContainer);

  roomCapacity.options[roomCapacity.selectedIndex].disabled = false;

  var formSucess = function () {
    var notice = window.utils.notice;
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    var text = successElement.querySelector('.success__message');
    text.textContent = 'Данные отправлены успешно';
    window.utils.adForm.insertAdjacentElement('afterend', successElement);

    var removeElement = function () {
      notice.removeChild(successElement);
      document.removeEventListener('keydown', onPopupEscPress);
    };
    var onPopupEscPress = function (evt) {
      window.utils.callIfIsEscEvent(evt, removeElement);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    successElement.addEventListener('click', removeElement);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var uploadFilesReset = function () {
    previewAvatar.src = 'img/muffin-grey.svg';
    var allRoomImgs = roomImgContainer.querySelectorAll('.ad-form__photo');
    allRoomImgs.forEach(function (el) {
      roomImgContainer.removeChild(el);
    });
  };

  var resetPage = function () {
    window.utils.userMapDialog.classList.remove('map--filtered');
    window.utils.mapDisable();
    window.utils.disableInputs(window.utils.filtersFormFieldsets, true);
    window.utils.disableInputs(window.utils.filtersFormSelects, true);
    disableInputs(adFormInputs, true);
    window.pin.removePins();
    window.pin.mainPinDefPos();
    window.card.cardClose();
    window.utils.filtersForm.reset();
    uploadFilesReset();
    adForm.reset();
  };

  resetBtn.addEventListener('click', function () {
    resetPage();
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(adForm), function () {
      formSucess();
    }, window.backend.error);
    resetPage();
  });
})();

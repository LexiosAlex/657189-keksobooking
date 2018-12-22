'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var choosePhotoFile = function (fileChooser, preview) {
    fileChooser.addEventListener('change', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  var choosePhotoFiles = function (fileChooser, previewContainer) {
    fileChooser.addEventListener('input', function () {
      var file = fileChooser.files[0];
      var fileName = file.name.toLowerCase();
      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var photosFragment = document.createDocumentFragment();
          var photoContainer = document.createElement('div');
          photoContainer.classList.add('ad-form__photo');
          var photoItem = document.createElement('img');
          photoItem.width = 70;
          photoItem.height = 70;
          photoItem.alt = 'Фотография жилья';
          photoItem.src = reader.result;
          photoContainer.appendChild(photoItem);
          photosFragment.appendChild(photoContainer);
          previewContainer.appendChild(photosFragment);
        });
        reader.readAsDataURL(file);
      }
    });
  };

  window.uploadFiles = {
    choosePhotoFile: choosePhotoFile,
    choosePhotoFiles: choosePhotoFiles
  };

})();

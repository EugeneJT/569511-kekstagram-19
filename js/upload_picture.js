'use strict';

(function () {
  var uploadFile = document.querySelector('#upload-file');
  var previewImg = document.querySelector('.img-upload__preview img');

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  uploadFile.addEventListener('change', function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();

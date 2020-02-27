'use strict';

(function () {
  var CONST = window.constants;
  var data = window.data;
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancelModal = document.querySelector('#upload-cancel');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');


  var openModal = function () {
    data.bodyWrap.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    imgUploadEffectLevel.classList.add('hidden');
  };

  var closeModal = function () {
    data.bodyWrap.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };


  uploadFile.addEventListener('change', function (evt) {
    evt.preventDefault();
    openModal();
  });

  uploadCancelModal.addEventListener('click', function () {
    closeModal();
  });

  var onPopupEscPress = document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === CONST.ESC_KEY) {
      closeModal();
    }
  });

  window.form = {
    imgUploadOverlay: imgUploadOverlay,
    imgUploadEffectLevel: imgUploadEffectLevel,
    onPopupEscPress: onPopupEscPress,
    effectLevelPin: effectLevelPin,
    effectLevelDepth: effectLevelDepth,
  };
})();

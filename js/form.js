'use strict';

(function () {
  var CONST = window.constants;
  var preview = window.preview;
  var uploadFile = document.querySelector('#upload-file');
  var uploadCancelModal = document.querySelector('#upload-cancel');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
  var effectLevelDepth = imgUploadOverlay.querySelector('.effect-level__depth');
  var uploadForm = document.querySelector('.img-upload__form');
  var fragment = document.createDocumentFragment();
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');


  var openModal = function () {
    preview.bodyWrap.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    imgUploadEffectLevel.classList.add('hidden');
  };

  var closeModal = function () {
    preview.bodyWrap.classList.remove('modal-open');
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

  var uploadSuccessHandler = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var newSuccess = successTemplate.cloneNode(true);
    fragment.appendChild(newSuccess);
    main.appendChild(fragment);
    closeModal();

    document.addEventListener('keydown', onSuccessModalEscPress);
    document.addEventListener('click', onSuccessModalClick);
  };

  var closeSuccessModal = function () {
    var success = document.querySelector('.success');
    document.removeEventListener('keydown', onSuccessModalEscPress);
    document.removeEventListener('click', onSuccessModalClick);
    success.parentNode.removeChild(success);
  };

  var onSuccessModalEscPress = function (evt) {
    if (evt.keyCode === CONST.ESC_KEY) {
      closeSuccessModal();
    }
  };

  var onSuccessModalClick = function (evt) {
    if (!evt.target.classList.contains('success__inner') && !evt.target.classList.contains('success__title')) {
      closeSuccessModal();
    }
  };

  var uploadErrorHandler = function (errorMessage) {
    var newError = errorTemplate.cloneNode(true);
    newError.querySelector('.error__title').textContent = errorMessage;
    fragment.appendChild(newError);
    main.appendChild(fragment);
    document.addEventListener('keydown', onErrorModalEscPress);
    document.addEventListener('click', onErrorModalClick);
    closeModal();
  };

  var closeErrorModal = function () {
    var error = document.querySelector('.error');
    document.removeEventListener('keydown', onErrorModalEscPress);
    document.removeEventListener('click', onErrorModalClick);
    error.parentNode.removeChild(error);
  };

  var onErrorModalEscPress = function (evt) {
    if (evt.key === CONST.ESC_KEY) {
      closeErrorModal();
    }
  };

  var onErrorModalClick = function (evt) {
    if (!evt.target.classList.contains('error__inner')
     && !evt.target.classList.contains('error__title')) {
      closeErrorModal();
    }
  };

  uploadForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(uploadForm), uploadSuccessHandler, uploadErrorHandler);
    evt.preventDefault();
  });

  window.form = {
    imgUploadOverlay: imgUploadOverlay,
    imgUploadEffectLevel: imgUploadEffectLevel,
    onPopupEscPress: onPopupEscPress,
    effectLevelPin: effectLevelPin,
    effectLevelDepth: effectLevelDepth,
  };
})();

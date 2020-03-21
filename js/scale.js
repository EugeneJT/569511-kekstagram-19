'use strict';

(function () {
  var CONST = window.constants;
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').querySelector('img');
  var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');

  scaleControlValue.value = CONST.Scale.DEFAULT + '%';

  var changeScaleDown = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    var newValue = scaleValue - CONST.Scale.STEP >= CONST.Scale.MIN ? scaleValue - CONST.Scale.STEP : CONST.Scale.MIN;
    imgUploadPreview.style.transform = 'scale(' + (newValue) / CONST.Scale.MAX + ')';
    scaleControlValue.value = (newValue) + '%';
  };

  var changeScaleUp = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    var newValue = scaleValue + CONST.Scale.STEP <= CONST.Scale.MAX ? scaleValue + CONST.Scale.STEP : CONST.Scale.MAX;
    imgUploadPreview.style.transform = 'scale(' + (newValue) / CONST.Scale.MAX + ')';
    scaleControlValue.value = (newValue) + '%';
  };

  scaleControlSmaller.addEventListener('click', changeScaleDown);
  scaleControlBigger.addEventListener('click', changeScaleUp);

  window.scale = {
    imgUploadPreview: imgUploadPreview,
  };
})();

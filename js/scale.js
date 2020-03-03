'use strict';

(function () {

  var Scale = {
    MIN: 25,
    MAX: 100,
    DEFAULT: 100,
    STEP: 25
  };

  var imgUploadScale = document.querySelector('.img-upload__scale');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');
  var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');

  scaleControlValue.value = Scale.DEFAULT + '%';

  var changeScaleDown = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    var newValue = scaleValue - Scale.STEP >= Scale.MIN ? scaleValue - Scale.STEP : Scale.MIN;
    imgUploadPreview.style.transform = 'scale(' + (newValue) / Scale.MAX + ')';
    scaleControlValue.value = (newValue) + '%';
  };

  var changeScaleUp = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    var newValue = scaleValue + Scale.STEP <= Scale.MAX ? scaleValue + Scale.STEP : Scale.MAX;
    imgUploadPreview.style.transform = 'scale(' + (newValue) / Scale.MAX + ')';
    scaleControlValue.value = (newValue) + '%';
  };

  scaleControlSmaller.addEventListener('click', changeScaleDown);
  scaleControlBigger.addEventListener('click', changeScaleUp);

  window.scale = {
    imgUploadPreview: imgUploadPreview,
  };

})();

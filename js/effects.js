'use strict';

(function () {
  var CONST = window.constants;
  var form = window.form;
  var scale = window.scale;

  var Effect = {
    CHROME: 'chrome',
    NONE: 'none',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat',
  };

  var currentEffect = Effect.NONE;
  var effectLevelPin = form.imgUploadOverlay.querySelector('.effect-level__pin');
  var effectsRadio = form.imgUploadOverlay.querySelectorAll('.effects__radio');
  var effectLevelLine = form.imgUploadOverlay.querySelector('.effect-level__line');

  var selectEffect = function (value) {
    switch (currentEffect) {
      case Effect.CHROME :
        form.imgUploadEffectLevel.classList.remove('hidden');
        return 'grayscale(' + value + ')';
      case Effect.SEPIA:
        form.imgUploadEffectLevel.classList.remove('hidden');
        return 'sepia(' + value + ')';
      case Effect.MARVIN:
        form.imgUploadEffectLevel.classList.remove('hidden');
        return 'invert(' + value * CONST.MARVIN_MAX + '%)';
      case Effect.PHOBOS:
        form.imgUploadEffectLevel.classList.remove('hidden');
        return 'blur(' + CONST.PHOBOS_MAX * value + 'px)';
      case Effect.HEAT:
        form.imgUploadEffectLevel.classList.remove('hidden');
        return 'brightness(' + CONST.HEAT_MAX * value + ')';
      default:
        form.imgUploadEffectLevel.classList.add('hidden');
        return '';
    }
  };

  var onEffectChange = function (evt) {
    currentEffect = evt.target.value;
    scale.imgUploadPreview.style.filter = selectEffect(1);
  };

  var getSaturationValue = function (evt) {
    return (evt.target.offsetLeft / effectLevelLine.offsetWidth).toFixed(2);
  };

  var onSaturationChange = function (evt) {
    var value = getSaturationValue(evt);
    scale.imgUploadPreview.style.filter = selectEffect(value);
  };

  for (var j = 0; j < effectsRadio.length; j++) {
    effectsRadio[j].addEventListener('change', onEffectChange);
  }

  effectLevelPin.addEventListener('mouseup', onSaturationChange);

})();

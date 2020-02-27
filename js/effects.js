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

  form.effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;

      var newCoordX = form.effectLevelPin.offsetLeft - shiftX;
      if (newCoordX >= 0 && newCoordX <= effectLevelLine.clientWidth) {
        form.effectLevelPin.style.left = newCoordX + 'px';
        form.effectLevelDepth.style.width = newCoordX + 'px';
        onSaturationChange(evt);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

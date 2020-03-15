'use strict';

(function () {
  var CONST = window.constants;
  var form = window.form;
  var textHashtags = form.imgUploadOverlay.querySelector('.text__hashtags');

  var validateHashtags = function (value) {
    var hashtags = value.toLowerCase().trim().split(CONST.REG_SPACE);
    if (hashtags.length > CONST.HASHTAGS_MAX_COUNT) {
      return 'Нельзя указать больше пяти хэш-тегов';
    }
    if (!value) {
      return '';
    }
    for (var z = 0; z < hashtags.length; z++) {
      if (hashtags[z][0] !== CONST.HASHTAG) {
        return 'Хэш-тег должен начинаться с #';
      }
      if (CONST.REG_SPECIAL_SYMBOLS.test(hashtags[z] + 1)) {
        return 'Строка после решётки должна состоять из букв и чисел, и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.';
      }
      if (hashtags.length === 1 && hashtags[z] === CONST.HASHTAG) {
        return 'Хеш-тег не может состоять только из одной #';
      }
      if (hashtags[z].length > CONST.HASHTAG_MAX_LENGTH) {
        return 'Максимальная длина одного хэш-тега 20 символов, включая #';
      }
      if (hashtags[z].split(CONST.HASHTAG).length > 2) {
        return 'Хэш-теги должны быть разделены пробелами';
      }
      var findDuplicateHashtags = hashtags.filter(function (item) {
        return item === hashtags[z];
      });
      if (findDuplicateHashtags.length > 1) {
        return 'Один и тот же хэш-тег не может быть использован дважды';
      }
    }
    return '';
  };

  textHashtags.addEventListener('input', function (evt) {
    textHashtags.setCustomValidity(validateHashtags(evt.target.value));
  });
})();

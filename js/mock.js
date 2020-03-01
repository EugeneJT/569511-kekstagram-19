'use strict';

(function () {
  var CONST = window.constants;
  var utils = window.utils;

  var createCommentsArray = function (countComments) {
    var array = [];

    for (var i = 0; i < countComments; i++) {
      array.push(
          {
            avatar: 'img/avatar-' + utils.getRandomNum(CONST.MIN_URL_VALUE, CONST.MAX_URL_VALUE) + '.svg',
            message: CONST.MESSAGES[utils.getRandomNum(0, CONST.MESSAGES.length - 1)],
            name: CONST.NAMES[utils.getRandomNum(0, CONST.NAMES.length - 1)],
          }
      );
    }
    return array;
  };

  var createPhotosArray = function (countPhotos) {
    var array = [];

    for (var i = 0; i < countPhotos; i++) {
      array.push(
          {
            url: 'photos/' + (i + 1) + '.jpg',
            description: '',
            likes: utils.getRandomNum(CONST.MIN_LIKES_VALUE, CONST.MAX_LIKES_VALUE),
            comments: createCommentsArray(utils.getRandomNum(CONST.MIN_COMMENTS_VALUE, CONST.MAX_COMMENTS_VALUE))
          }
      );
    }
    return array;
  };

  window.mock = {
    createPhotosArray: createPhotosArray,
    createCommentsArray: createCommentsArray,
  };

})();

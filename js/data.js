'use strict';

(function () {
  var CONST = window.constants;
  var utils = window.utils;

  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var createCommentsArray = function (countComments) {
    var array = [];

    for (var i = 0; i < countComments; i++) {
      array.push(
          {
            avatar: 'img/avatar-' + utils.getRandomNum(CONST.MIN_URL_VALUE, CONST.MAX_URL_VALUE) + '.svg',
            message: utils.getRandomNum(0, CONST.MESSAGES.length),
            name: utils.getRandomNum(0, CONST.NAMES.length)
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

  var photos = createPhotosArray(CONST.PICTURES_NUMBER);

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes + '';
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length + '';

    return pictureElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i]));
  }
  picturesContainer.appendChild(fragment);

})();

'use strict';

(function () {
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var imgFilters = document.querySelector('.img-filters');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes + '';
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length + '';

    return pictureElement;
  };

  var renderFragment = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i]));
    }
    picturesContainer.appendChild(fragment);
  };


  var loadedData = [];

  var successHandler = function (photos) {
    loadedData = photos;
    renderFragment(loadedData);
    imgFilters.classList.remove('img-filters--inactive');
  };

  var getLoadedData = function () {
    return loadedData;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '20px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  window.gallery = {
    getLoadedData: getLoadedData,
    renderFragment: renderFragment
  };
})();

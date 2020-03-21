'use strict';

(function () {
  var form = window.form;
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var imgFilters = document.querySelector('.img-filters');

  var renderPicture = function (picture, index) {
    var pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').dataset.id = index;

    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes + '';
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length + '';

    return pictureElement;
  };

  var renderFragment = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i], i));
    }
    picturesContainer.appendChild(fragment);
  };

  var onSuccess = function (photos) {
    window.dataPictures = photos.slice();
    renderFragment(window.dataPictures);
    imgFilters.classList.remove('img-filters--inactive');
  };

  var getLoadedData = function () {
    return window.dataPictures;
  };

  window.load(onSuccess, form.onError);

  window.gallery = {
    getLoadedData: getLoadedData,
    renderFragment: renderFragment,
  };
})();

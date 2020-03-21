'use strict';

(function () {
  var gallery = window.gallery;
  var CONST = window.constants;
  var utils = window.utils;
  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var filterButtons = document.querySelectorAll('.img-filters__button');

  var removePreview = function () {
    document.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
  };

  var removeActiveFilterButton = function () {
    filterButtons.forEach(function (button) {
      button.classList.remove('img-filters__button--active');
    });
  };

  filterDefault.addEventListener('click', utils.debounce(function () {
    removePreview();
    removeActiveFilterButton();
    filterDefault.classList.add('img-filters__button--active');
    window.dataPictures = gallery.getLoadedData();
    gallery.renderFragment(window.dataPictures);
  }));


  filterRandom.addEventListener('click', utils.debounce(function () {
    removePreview();
    removeActiveFilterButton();
    filterRandom.classList.add('img-filters__button--active');
    window.dataPictures = utils.shuffleArray(gallery.getLoadedData()).slice(0, CONST.PICTURES_RANDOM);
    gallery.renderFragment(window.dataPictures);
  }));

  filterDiscussed.addEventListener('click', utils.debounce(function () {
    removePreview();
    removeActiveFilterButton();
    filterDiscussed.classList.add('img-filters__button--active');
    window.dataPictures = utils.sortObjectsArrayByField(gallery.getLoadedData(), 'comments');
    gallery.renderFragment(window.dataPictures);
  }));
})();

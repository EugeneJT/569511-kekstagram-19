'use strict';

(function () {
  var gallery = window.gallery;
  var CONST = window.constants;
  var utils = window.utils;

  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var removePreview = function () {
    document.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
  };


  filterDefault.addEventListener('click', utils.debounce(function () {
    removePreview();

    /*
    var filterButtons = document.querySelectorAll('.img-filters__button');
    var setActiveFilterButton = function (activElement) {};
    */

    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    gallery.renderFragment(gallery.getLoadedData(), CONST.PICTURES_NUMBER);
  }));


  filterRandom.addEventListener('click', utils.debounce(function () {
    removePreview();
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    gallery.renderFragment(
        utils.shuffleArray(gallery.getLoadedData()).slice(0, CONST.PICTURES_RANDOM)
    );
  }));

  filterDiscussed.addEventListener('click', utils.debounce(function () {
    removePreview();
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
    gallery.renderFragment(
        utils.sortObjectsArrayByField(gallery.getLoadedData(), 'comments')
    );
  }));
})();

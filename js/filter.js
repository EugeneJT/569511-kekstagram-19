'use strict';

(function () {
  var gallery = window.gallery;
  var CONST = window.constants;
  var utils = window.utils;

  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, CONST.DEBOUNCE_INTERVAL);
    };
  };


  filterDefault.addEventListener('click', debounce(function () {
    document.querySelectorAll('.picture').forEach(function (item) {
      item.remove();
    });
    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    gallery.renderFragment(gallery.getLoadedData(), CONST.PICTURES_NUMBER);
  }));


  filterRandom.addEventListener('click', debounce(function () {
    document.querySelectorAll('.picture').forEach(function (item) {

      item.remove();
    });
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    gallery.renderFragment(
        utils.shuffleArray(gallery.getLoadedData()).slice(0, CONST.PICTURES_RANDOM)
    );
  }));

  filterDiscussed.addEventListener('click', debounce(function () {
    document.querySelectorAll('.picture').forEach(function (item) {

      item.remove();
    });
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
    gallery.renderFragment(
        utils.sortObjectsArrayByField(gallery.getLoadedData(), 'comments')
    );
  }));
})();

'use strict';

(function () {

  var shuffleArray = function (array) {
    var copy = array.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  };

  var sortObjectsArrayByField = function (array, field) {
    var clone = array.slice();
    clone.sort(function (first, second) {
      if (first[field] < second[field]) {
        return 1;
      } else if (first[field] > second[field]) {
        return -1;
      } else {
        return 0;
      }
    });
    return clone;
  };

  var getRandomNum = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.utils = {
    getRandomNum: getRandomNum,
    shuffleArray: shuffleArray,
    sortObjectsArrayByField: sortObjectsArrayByField
  };
})();

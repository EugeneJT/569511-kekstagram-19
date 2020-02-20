'use strict';

(function () {

  var getRandomNum = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.utils = {
    getRandomNum: getRandomNum,
  };
})();

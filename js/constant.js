'use strict';

(function () {
  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var MESSAGES = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var MIN_LIKES_VALUE = 15;
  var MAX_LIKES_VALUE = 200;
  var MIN_URL_VALUE = 1;
  var MAX_URL_VALUE = 6;
  var MIN_COMMENTS_VALUE = 1;
  var MAX_COMMENTS_VALUE = 5;
  var PICTURES_NUMBER = 25;

  window.constants = {
    NAMES: NAMES,
    MESSAGES: MESSAGES,
    MIN_LIKES_VALUE: MIN_LIKES_VALUE,
    MAX_LIKES_VALUE: MAX_LIKES_VALUE,
    MIN_URL_VALUE: MIN_URL_VALUE,
    MAX_URL_VALUE: MAX_URL_VALUE,
    MIN_COMMENTS_VALUE: MIN_COMMENTS_VALUE,
    MAX_COMMENTS_VALUE: MAX_COMMENTS_VALUE,
    PICTURES_NUMBER: PICTURES_NUMBER,
  };
})();

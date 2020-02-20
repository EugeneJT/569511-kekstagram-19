'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var MIN_LIKES_VALUE = 15;
var MAX_LIKES_VALUE = 200;
var MIN_URL_VALUE = 1;
var MAX_URL_VALUE = 6;
var MIN_COMMENTS_VALUE = 1;
var MAX_COMMENTS_VALUE = 5;
var PICTURES_NUMBER = 25;

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var bigPicture = document.querySelector('.big-picture');
var commentsCounter = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');
var bodyWrap = document.querySelector('body');
var bigPictureComment = bigPicture.querySelector('.social__comment');
var bigPictureComments = bigPicture.querySelector('.social__comments');

var getRandomNum = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var createCommentsArray = function (countComments) {
  var array = [];

  for (var i = 0; i < countComments; i++) {
    array.push(
        {
          avatar: 'img/avatar-' + getRandomNum(MIN_URL_VALUE, MAX_URL_VALUE) + '.svg',
          message: getRandomNum(0, MESSAGES.length),
          name: getRandomNum(0, NAMES.length)
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
          likes: getRandomNum(MIN_LIKES_VALUE, MAX_LIKES_VALUE),
          comments: createCommentsArray(getRandomNum(MIN_COMMENTS_VALUE, MAX_COMMENTS_VALUE))
        }
    );
  }
  return array;
};


var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes + '';
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length + '';

  return pictureElement;
};

var photos = createPhotosArray(PICTURES_NUMBER);

var openPopupPreview = function () {
  bigPicture.classList.remove('hidden');
  bodyWrap.classList.add('modal-open');

};


var makeFiledFragment = function (elements, render) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(render(elements[i]));
  }

  return fragment;
};


var renderComment = function (elem) {
  var newComment = bigPictureComment.cloneNode(true);
  newComment.querySelector('.social__picture').src = elem.avatar;
  newComment.querySelector('.social__picture').alt = elem.name;
  newComment.querySelector('.social__text').textContent = elem.message;
  bigPictureComments.textContent = '';
  var fragment = makeFiledFragment(photos, renderPicture);
  picturesContainer.appendChild(fragment);
  return newComment;
};


var renderBigPicture = function (photo) {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  var comments = photo.comments;
  var fragment = makeFiledFragment(comments, renderComment);
  bigPictureComments.appendChild(fragment);
};


renderBigPicture(photos[1]);

commentsCounter.classList.add('hidden');
commentsLoader.classList.add('hidden');
openPopupPreview();

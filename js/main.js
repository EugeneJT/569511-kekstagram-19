'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var getRandomNum = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var createCommentsArray = function (countComments) {
  var array = [];

  for (var i = 0; i < countComments; i++) {
    array.push(
        {
          avatar: 'img/avatar-' + getRandomNum(1, 6) + '.svg',
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
          url: 'photos/' + getRandomNum(1, 25) + '.jpg',
          description: '',
          likes: getRandomNum(15, 200),
          comments: createCommentsArray(getRandomNum(1, 5))
        }
    );
  }
  return array;
};

var photos = createPhotosArray(25);

var picturesContainer = document.querySelector('.pictures');

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture__likes').textContent = picture.likes + '';
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length + '';

  return pictureElement;
};


var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPicture(photos[i]));
}
picturesContainer.appendChild(fragment);


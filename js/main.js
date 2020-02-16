'use strict';

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

var HASHTAG_MAX_LENGTH = 20;
var HASHTAGS_MAX_COUNT = 5;
var HASHTAG = '#';

var ESC_KEY = 27;

var Scale = {
  MIN: 25,
  MAX: 100,
  DEFAULT: 100,
  STEP: 25
};

var Effect = {
  CHROME: 'chrome',
  NONE: 'none',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat',
};

var PHOBOS_MAX = 3;
var HEAT_MAX = 3;
var MARVIN_MAX = 100;

var REG_SPECIAL_SYMBOLS = /[^#a-zA-Z0-9]/;
var REG_SPACE = /\s+/;

var picturesContainer = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var bodyWrap = document.querySelector('body');

var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var textHashtags = imgUploadOverlay.querySelector('.text__hashtags');
var uploadFile = document.querySelector('#upload-file');
var uploadCancelModal = document.querySelector('#upload-cancel');

var imgUploadScale = document.querySelector('.img-upload__scale');
var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

var currentEffect = Effect.NONE;
var effectLevelPin = imgUploadOverlay.querySelector('.effect-level__pin');
var effectsRadio = imgUploadOverlay.querySelectorAll('.effects__radio');
var effectLevelLine = imgUploadOverlay.querySelector('.effect-level__line');
var imgUploadEffectLevel = imgUploadOverlay.querySelector('.img-upload__effect-level');


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

var photos = createPhotosArray(PICTURES_NUMBER);

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes + '';
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length + '';

  return pictureElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < photos.length; i++) {
  fragment.appendChild(renderPicture(photos[i]));
}
picturesContainer.appendChild(fragment);


// module4

var openModal = function () {
  bodyWrap.classList.add('modal-open');
  imgUploadOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  imgUploadEffectLevel.classList.add('hidden');
};

var closeModal = function () {
  bodyWrap.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
};


uploadFile.addEventListener('change', function (evt) {
  evt.preventDefault();
  openModal();
});

uploadCancelModal.addEventListener('click', function () {
  closeModal();
});

var onPopupEscPress = document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY) {
    closeModal();
  }
});

// Scale

scaleControlValue.value = Scale.DEFAULT + '%';

var changeScaleDown = function () {
  var scaleValue = parseInt(scaleControlValue.value, 10);
  var newValue = scaleValue - Scale.STEP >= Scale.MIN ? scaleValue - Scale.STEP : Scale.MIN;
  imgUploadPreview.style.transform = 'scale(' + (newValue) / Scale.MAX + ')';
  scaleControlValue.value = (newValue) + '%';
};

var changeScaleUp = function () {
  var scaleValue = parseInt(scaleControlValue.value, 10);
  var newValue = scaleValue + Scale.STEP <= Scale.MAX ? scaleValue + Scale.STEP : Scale.MAX;
  imgUploadPreview.style.transform = 'scale(' + (newValue) / Scale.MAX + ')';
  scaleControlValue.value = (newValue) + '%';
};

scaleControlSmaller.addEventListener('click', changeScaleDown);
scaleControlBigger.addEventListener('click', changeScaleUp);


var validateHashtags = function (value) {
  var hashtags = value.toLowerCase().trim().split(REG_SPACE);
  for (var z = 0; z < hashtags.length; z++) {
    if (hashtags[z][0] !== HASHTAG) {
      return 'Хэш-тег должен начинаться с #';
    }
    if (REG_SPECIAL_SYMBOLS.test(hashtags[z])) {
      return 'Строка после решётки должна состоять из букв и чисел, и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.';
    }
    if (hashtags.length === 1 && hashtags[z] === HASHTAG) {
      return 'Хеш-тег не может состоять только из одной #';
    }
    if (hashtags[z].length > HASHTAG_MAX_LENGTH) {
      return 'Максимальная длина одного хэш-тега 20 символов, включая #';
    }
    if (hashtags[z].lastIndexOf(HASHTAG) !== 0) {
      return 'Хэш-теги должны быть разделены пробелами';
    }
    var findDuplicateHashtags = hashtags.filter(function (item) {
      return item === hashtags[z];
    });
    if (findDuplicateHashtags.length > 1) {
      return 'Один и тот же хэш-тег не может быть использован дважды';
    }
  }
  if (hashtags.length > HASHTAGS_MAX_COUNT) {
    return 'Нельзя указать больше пяти хэш-тегов';
  }
  return '';
};

textHashtags.addEventListener('input', function (evt) {
  textHashtags.setCustomValidity(validateHashtags(evt.target.value));
});


var selectEffect = function (value) {
  switch (currentEffect) {
    case Effect.CHROME :
      imgUploadEffectLevel.classList.remove('hidden');
      return 'grayscale(' + value + ')';
    case Effect.SEPIA:
      imgUploadEffectLevel.classList.remove('hidden');
      return 'sepia(' + value + ')';
    case Effect.MARVIN:
      imgUploadEffectLevel.classList.remove('hidden');
      return 'invert(' + value * MARVIN_MAX + '%)';
    case Effect.PHOBOS:
      imgUploadEffectLevel.classList.remove('hidden');
      return 'blur(' + PHOBOS_MAX * value + 'px)';
    case Effect.HEAT:
      imgUploadEffectLevel.classList.remove('hidden');
      return 'brightness(' + HEAT_MAX * value + ')';
    default:
      imgUploadEffectLevel.classList.add('hidden');
      return '';
  }
};

var onEffectChange = function (evt) {
  currentEffect = evt.target.value;
  imgUploadPreview.style.filter = selectEffect(1);
};

var getSaturationValue = function (evt) {
  return (evt.target.offsetLeft / effectLevelLine.offsetWidth).toFixed(2);
};

var onSaturationChange = function (evt) {
  var value = getSaturationValue(evt);
  imgUploadPreview.style.filter = selectEffect(value);
};

for (var j = 0; j < effectsRadio.length; j++) {
  effectsRadio[j].addEventListener('change', onEffectChange);
}

effectLevelPin.addEventListener('mouseup', onSaturationChange);

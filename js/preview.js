'use strict';

(function () {
  var CONST = window.constants;
  var gallery = window.gallery;
  var comments = window.comments;
  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var bodyWrap = document.querySelector('body');

  var makeFiledFragment = function (elements, render) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(render(elements[i]));
    }

    return fragment;
  };

  var renderBigPicture = function (photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    comments.createComments(photo);
  };

  var onPopupEscPress = document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === CONST.ESC_KEY) {
      closePopupPreview();
    }
  });

  var openPopupPreview = function () {
    bigPicture.classList.remove('hidden');
    bodyWrap.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopupPreview = function () {
    bigPicture.classList.add('hidden');
    bodyWrap.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var showBigPhoto = function (src) {
    var photos = gallery.getLoadedData();
    for (var i = 0; i < photos.length; i++) {
      if (src === photos[i].url) {
        openPopupPreview();
        renderBigPicture(photos[i]);
        comments.showComments(photos[i].comments);
      }
    }
  };

  var onPictureClick = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var activePicture = evt.target.attributes.src.value;
      showBigPhoto(activePicture);
    }
  };

  var onPictureEnterPress = function (evt) {
    if (evt.key === CONST.ENTER_KEY) {
      var activePicture = evt.target.children[0].attributes.src.value;
      showBigPhoto(activePicture);
    }
  };

  picturesContainer.addEventListener('click', onPictureClick);
  picturesContainer.addEventListener('keydown', onPictureEnterPress);
  bigPictureCancel.addEventListener('click', function () {
    closePopupPreview();
  });

  window.preview = {
    picturesContainer: picturesContainer,
    pictureTemplate: pictureTemplate,
    bigPicture: bigPicture,
    bodyWrap: bodyWrap,
    makeFiledFragment: makeFiledFragment,
  };
})();

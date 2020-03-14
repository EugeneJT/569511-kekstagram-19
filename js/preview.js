'use strict';

(function () {
  var CONST = window.constants;
  var gallery = window.gallery;
  var form = window.form;

  var picturesContainer = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
  var bodyWrap = document.querySelector('body');
  var bigPictureComment = bigPicture.querySelector('.social__comment');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var commentsCounter = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

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
    return newComment;
  };


  var renderBigPicture = function (photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    createComments(photo);
  };

  var createComments = function (photo) {
    for (var i = 0; i < photo.comments.length; i++) {
      form.fragment.appendChild(renderComment(photo.comments[i]));
    }
    bigPictureComments.textContent = '';
    bigPictureComments.appendChild(form.fragment);
  };

  var bigPictureCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsCountTotal = bigPictureCommentCount.querySelector('.comments-count');
  var arrayComments = [];
  var countCommentsRender;

  var getComments = function (comments) {
    form.fragment = document.createDocumentFragment();
    var fragmentCommentsCount = document.createDocumentFragment();

    var countComments = comments.length > CONST.COUNT_COMMENTS ? CONST.COUNT_COMMENTS : comments.length;
    countCommentsRender = countCommentsRender + countComments;

    for (var i = 0; i < countComments; i++) {
      form.fragment.appendChild(renderComment(comments.shift()));
    }

    bigPictureCommentCount.textContent = '';

    fragmentCommentsCount.textContent = countCommentsRender + ' из ';
    fragmentCommentsCount.appendChild(commentsCountTotal);
    fragmentCommentsCount.innerHtml = fragmentCommentsCount.innerHtml + ' комментариев';

    bigPictureCommentCount.appendChild(fragmentCommentsCount);
    bigPictureComments.appendChild(form.fragment);

    if (!comments.length) {
      commentsLoader.classList.add('hidden');
    }
  };

  var onLoadMoreComments = function () {
    getComments(arrayComments);
  };

  var showComments = function (comments) {
    arrayComments = comments.slice();
    countCommentsRender = 0;
    bigPictureComments.textContent = '';
    commentsCountTotal.textContent = comments.length + ' комментариев';

    if (comments.length > CONST.COUNT_COMMENTS) {
      commentsLoader.classList.remove('hidden');
      bigPictureCommentCount.classList.remove('hidden');
    }

    getComments(arrayComments);
  };

  commentsLoader.addEventListener('click', onLoadMoreComments);


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

  /*
  var showBigPhoto = function (photoIndex) {
    var photos = gallery.getLoadedData();
    openPopupPreview();
    renderBigPicture(photos[photoIndex]);
  };

  var onPictureClick = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var activePicture = evt.target.dataset.id;
      showBigPhoto(activePicture);
    }
  };

  var onPictureEnterPress = function (evt) {
    if (evt.keyCode === CONST.ENTER_KEY) {
      var activePicture = evt.target.children[0].dataset.id;
      showBigPhoto(activePicture);
    }
  };
  */


  var showBigPhoto = function (src) {
    var photos = gallery.getLoadedData();
    for (var i = 0; i < photos.length; i++) {
      if (src === photos[i].url) {
        openPopupPreview();
        renderBigPicture(photos[i]);
        showComments(photos[i].comments);
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
    bigPictureComment: bigPictureComment,
    bigPictureComments: bigPictureComments,
    makeFiledFragment: makeFiledFragment,
  };
})();

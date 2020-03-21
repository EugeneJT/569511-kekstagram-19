'use strict';

(function () {
  var CONST = window.constants;
  var form = window.form;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComment = bigPicture.querySelector('.social__comment');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var commentsCounter = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var bigPictureCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsCountTotal = bigPictureCommentCount.querySelector('.comments-count');

  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  var renderComment = function (elem) {
    var newComment = bigPictureComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = elem.avatar;
    newComment.querySelector('.social__picture').alt = elem.name;
    newComment.querySelector('.social__text').textContent = elem.message;
    return newComment;
  };

  var createComments = function (photo) {
    for (var i = 0; i < photo.comments.length; i++) {
      form.fragment.appendChild(renderComment(photo.comments[i]));
    }
    bigPictureComments.textContent = '';
    bigPictureComments.appendChild(form.fragment);
  };

  var arrayComments = [];
  var countCommentsRender;

  var getComments = function (comments) {
    var fragment = document.createDocumentFragment();
    var fragmentCommentsCount = document.createDocumentFragment();

    var countComments = comments.length > CONST.COUNT_COMMENTS ? CONST.COUNT_COMMENTS : comments.length;
    countCommentsRender = countCommentsRender + countComments;

    for (var i = 0; i < countComments; i++) {
      fragment.appendChild(renderComment(comments.shift()));
    }

    bigPictureCommentCount.textContent = '';
    fragmentCommentsCount.textContent = 'Просмотрено ' + countCommentsRender + ' из ';
    fragmentCommentsCount.appendChild(commentsCountTotal);
    fragmentCommentsCount.innerHtml = fragmentCommentsCount.innerHtml + ' комментариев';

    bigPictureCommentCount.appendChild(fragmentCommentsCount);
    bigPictureComments.appendChild(fragment);

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

  window.comments = {
    createComments: createComments,
    showComments: showComments
  };
})();

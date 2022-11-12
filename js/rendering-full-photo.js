
import {isEscapeKey} from './util.js';

const bigPictureWindow = document.querySelector('.big-picture');
const commentsTemplate = bigPictureWindow.querySelector('#comment').content.querySelector('.social__comment');
const closedButtonElement = bigPictureWindow.querySelector('.big-picture__cancel');
const commentsContainer = bigPictureWindow.querySelector('.social__comments');
const loadingСommentsButtonElement = bigPictureWindow.querySelector('.comments-loader');
const shownCommentsCount = bigPictureWindow.querySelector('.shown-comments-count');
const MAX_COMMENTS_COUNT = 5;
let commentsCounter;
let allComments;

const buttonClickHandler = () => closeWindow();

function buttonKeydownHandler (evt) {
  if (isEscapeKey(evt)) {
    closeWindow();
  }
}

function closeWindow () {
  document.removeEventListener('keydown', buttonKeydownHandler);
  closedButtonElement.removeEventListener('click', buttonClickHandler);
  bigPictureWindow.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  loadingСommentsButtonElement.removeEventListener('click',  loadNewComments);
}

function appendNewComments({avatar, name, message}) {
  const newComment = commentsTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
}

function updateCommentsCount (value) {
  shownCommentsCount.textContent = value;
}

function loadNewComments () {
  let addingCounter = MAX_COMMENTS_COUNT;
  if (allComments.length > commentsCounter) {
    if ((allComments.length - commentsCounter) <= MAX_COMMENTS_COUNT) {
      addingCounter = allComments.length - commentsCounter;
      loadingСommentsButtonElement.classList.add('hidden');
    }
    const fragment = document.createDocumentFragment();
    allComments.slice(commentsCounter, commentsCounter + addingCounter).forEach((comment) => {
      fragment.appendChild(appendNewComments(comment));
    });
    commentsContainer.appendChild(fragment);
    commentsCounter += addingCounter;
    updateCommentsCount(commentsCounter);
  }
}

function openBigPictureWindow ({url, description, likes, comments}) {
  bigPictureWindow.querySelector('.big-picture__img').querySelector('img').setAttribute('src', url);
  bigPictureWindow.querySelector('.likes-count').textContent = likes;
  bigPictureWindow.querySelector('.comments-count').textContent = comments.length;
  bigPictureWindow.querySelector('.social__caption').textContent = description;
  loadingСommentsButtonElement.classList.remove('hidden');

  commentsContainer.innerHTML = '';
  allComments = comments;
  commentsCounter = 0;
  loadNewComments();

  bigPictureWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  closedButtonElement.addEventListener('click',  buttonClickHandler);
  document.addEventListener('keydown', buttonKeydownHandler);
  loadingСommentsButtonElement.addEventListener('click',  loadNewComments);
}


export {openBigPictureWindow};

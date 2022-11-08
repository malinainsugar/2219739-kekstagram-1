
import {isEscapeKey} from './util.js';

const bigPictureWindow = document.querySelector('.big-picture');
const commentsTemplate = bigPictureWindow.querySelector('#comment').content.querySelector('.social__comment');
const closedButtomElement = bigPictureWindow.querySelector('.big-picture__cancel');
bigPictureWindow.querySelector('.social__comment-count').classList.add('hidden');
bigPictureWindow.querySelector('.comments-loader').classList.add('hidden');

const buttonClickHandler = () => closeWindow();

function buttonKeydownHandler (evt) {
  if (isEscapeKey(evt)) {
    closeWindow();
  }
}

function closeWindow () {
  document.removeEventListener('keydown', buttonKeydownHandler);
  closedButtomElement.removeEventListener('click', buttonClickHandler);
  bigPictureWindow.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
}

function appendNewComments({avatar, name, message}) {
  const newComment = commentsTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;
  return newComment;
}


function openBigPictureWindow ({url, description, likes, comments}) {
  bigPictureWindow.querySelector('.big-picture__img').querySelector('img').setAttribute('src', url);
  bigPictureWindow.querySelector('.likes-count').textContent = likes;
  bigPictureWindow.querySelector('.comments-count').textContent = comments.length;
  bigPictureWindow.querySelector('.social__caption').textContent = description;

  bigPictureWindow.querySelector('.social__comments').innerHTML = '';

  const fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    fragment.appendChild(appendNewComments(comment));
  });
  bigPictureWindow.querySelector('.social__comments').appendChild(fragment);

  bigPictureWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  closedButtomElement.addEventListener('click',  buttonClickHandler);
  document.addEventListener('keydown', buttonKeydownHandler);
}

export {openBigPictureWindow};

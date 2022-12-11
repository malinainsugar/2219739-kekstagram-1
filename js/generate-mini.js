import {openBigPictureWindow} from './rendering-full-photo.js';

const picturesContainerElement = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('a');

function renderPhotosList (photosList) {
  const photosListFragment = document.createDocumentFragment();

  photosList.forEach(({url, likes, comments, description}) => {
    const photoElement = picturesTemplate.cloneNode(true);
    photoElement.querySelector('img').setAttribute('src', url);
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoElement.querySelector('img').addEventListener('click', () => {
      openBigPictureWindow({url, likes, comments, description});
    });
    photosListFragment.append(photoElement);
  });

  picturesContainerElement.append(photosListFragment);
}

export {renderPhotosList};

import {createPhotos} from './data.js';

const picturesContainerElement = document.querySelector('.pictures');
const picturesTemplate = document.querySelector('#picture').content.querySelector('a');

const similarPhotos = createPhotos();

const similarListFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, likes, comments}) => {
  const photosElement = picturesTemplate.cloneNode(true);
  photosElement.querySelector('img').setAttribute('src', url);
  photosElement.querySelector('.picture__likes').textContent = likes;
  photosElement.querySelector('.picture__comments').textContent = comments.length;
  similarListFragment.append(photosElement);
});

picturesContainerElement.append(similarListFragment);

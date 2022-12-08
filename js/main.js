
import { renderSimilarList } from './rendering-mini.js';
import { setUserFormSubmit, closeEditingWindow } from './form-script.js';
import { getDataFromServer } from './api.js';
import { showAlert } from './util.js';

getDataFromServer(
  (photos) => {
    renderSimilarList(photos);
  },
  (message) => {
    showAlert(message);
  },);

setUserFormSubmit(closeEditingWindow);

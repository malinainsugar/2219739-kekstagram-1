import { isEscapeKey, checkForRepeats } from './util.js';
import { form, addEventListenerImage, removeEventListenerImage, addFilter, removeFilters } from './editing-image.js';
import { sendDataToServer } from './api.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const MAX_LENGTH_COMMENT = 140;
const MAX_LENGTH_HASHTAG = 20;
const MAX_HASHTAGS_COUNT = 5;
let messageHashtagError = '';

const HashtagRules = {
  HASHTAG_SYMBOL: 'Хэш-тег начинается с символа # (решётка).',
  VALID_CHARACTERS: 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д..',
  ONLY_HASHTAG: 'Хеш-тег не может состоять только из одной решётки.',
  MAX_LENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку.',
  NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды.',
  MAX_COUNT: 'Нельзя указать больше пяти хэш-тегов.',
  OKAY: ''
};

const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

const body = document.querySelector('body');
const loadImgButtonElement = form.querySelector('#upload-file');
const editingWindow = form.querySelector('.img-upload__overlay');
const editingCloseButtonElement = editingWindow.querySelector('#upload-cancel');
const submitButtonElement = form.querySelector('.img-upload__submit');
const hashtagsInputElement = form.querySelector('input[name="hashtags"]');
const descriptionInputElement = form.querySelector('textarea[name="description"]');
const preview = document.querySelector('.img-upload__preview img');

const successFormTemplate = document.querySelector('#success').content.querySelector('.success');
const errorFormTemplate = document.querySelector('#error').content.querySelector('.error');

loadImgButtonElement.addEventListener('input', openEditingWindow);

const buttonClickHandler = () => closeEditingWindow();

function buttonKeydownHandler (evt) {
  if (isEscapeKey(evt) && (evt.target !== hashtagsInputElement && evt.target !== descriptionInputElement)) {
    closeEditingWindow();
  }
}

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__error'
}, true);

function validateHashtag (value) {
  messageHashtagError = HashtagRules.OKAY;
  value = value.trim().toLowerCase();
  const hashtags = value.split(' ');
  if (hashtags[0] !== '') {
    for (const hashtag of hashtags) {
      if (!re.test(hashtag)) {
        if (hashtag[0] !== '#') {
          messageHashtagError = HashtagRules.HASHTAG_SYMBOL;
          return false;
        }
        if (hashtag.length === 1 && hashtag[0]=== '#') {
          messageHashtagError = HashtagRules.ONLY_HASHTAG;
          return false;
        }
        if (hashtag.length > MAX_LENGTH_HASHTAG) {
          messageHashtagError = HashtagRules.MAX_LENGTH;
          return false;
        }
        messageHashtagError = HashtagRules.VALID_CHARACTERS;
        return false;
      }
    }
    if (hashtags.length > MAX_HASHTAGS_COUNT) {
      messageHashtagError = HashtagRules.MAX_COUNT;
      return false;
    }
    if (checkForRepeats(hashtags)) {
      messageHashtagError = HashtagRules.NO_REPEAT;
      return false;
    }
  }
  return true;
}

const generateMessageHashtags = () => messageHashtagError;

const validateDescription = (value) => value.length <= MAX_LENGTH_COMMENT;

pristine.addValidator(hashtagsInputElement, validateHashtag, generateMessageHashtags);
pristine.addValidator(descriptionInputElement, validateDescription, 'Длина комментария не может составлять больше 140 символов');

function validateForm () {
  if (pristine.validate()) {
    submitButtonElement.disabled = false;
  } else {
    submitButtonElement.disabled = true;
  }
}

function openEditingWindow () {
  const img = loadImgButtonElement.files[0];
  const imgName = img.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => imgName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(img);
  }

  editingWindow.classList.remove('hidden');
  body.classList.add('modal-open');

  editingCloseButtonElement.addEventListener('click', buttonClickHandler);
  document.addEventListener('keydown', buttonKeydownHandler);
  hashtagsInputElement.addEventListener('input', validateForm);
  descriptionInputElement.addEventListener('input', validateForm);

  addEventListenerImage();
  addFilter();
}

function closeEditingWindow () {
  editingWindow.classList.add('hidden');
  body.classList.remove('modal-open');

  editingCloseButtonElement.removeEventListener('click', buttonClickHandler);
  document.removeEventListener('keydown', buttonKeydownHandler);
  hashtagsInputElement.removeEventListener('input', validateForm);
  descriptionInputElement.removeEventListener('input', validateForm);

  removeEventListenerImage();
  removeFilters();

  editingWindow.querySelector('.scale__control--value').value = '100%';
  hashtagsInputElement.value = '';
  descriptionInputElement.value = '';
  loadImgButtonElement.value = '';
}

function blockSubmitButton () {
  submitButtonElement.disabled = true;
  submitButtonElement.textContent = 'Публикую...';
}

function unblockSubmitButton () {
  submitButtonElement.disabled = false;
  submitButtonElement.textContent = 'Опубликовать';
}

function onSuccessButtonHandler () {
  hideSuccessForm();
}

function onErrorButtonHandler () {
  hideErrorForm();
}

function onOutOfFormHandler (evt) {
  if (evt.target === successFormTemplate && evt.target !== successFormTemplate.querySelector('.success__inner')) {
    hideSuccessForm();
  }
  if (evt.target === errorFormTemplate && evt.target !== errorFormTemplate.querySelector('.error__inner')) {
    hideErrorForm();
  }
}

function onSuccessEscKeydownHandler (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideSuccessForm();
  }
}

function onErrorEscKeydownHandler (evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideErrorForm();
  }
}

function showSuccessForm() {
  body.appendChild(successFormTemplate);
  successFormTemplate.querySelector('.success__button').addEventListener('click', onSuccessButtonHandler);
  document.addEventListener('click', onOutOfFormHandler);
  document.addEventListener('keydown', onSuccessEscKeydownHandler);
}

function hideSuccessForm() {
  successFormTemplate.querySelector('.success__button').removeEventListener('click', onSuccessButtonHandler);
  document.removeEventListener('click', onOutOfFormHandler);
  document.removeEventListener('keydown', onSuccessEscKeydownHandler);
  body.removeChild(successFormTemplate);
}

function showErrorForm (message) {
  editingWindow.classList.add('hidden');
  errorFormTemplate.querySelector('.error__button').textContent = 'Попробовать ещё раз';
  body.appendChild(errorFormTemplate);
  errorFormTemplate.querySelector('.error__title').textContent = message;
  errorFormTemplate.querySelector('.error__button').addEventListener('click', onErrorButtonHandler);
  document.addEventListener('click', onOutOfFormHandler);
  document.addEventListener('keydown', onErrorEscKeydownHandler);
}

function hideErrorForm() {
  editingWindow.classList.remove('hidden');
  errorFormTemplate.querySelector('.error__button').removeEventListener('click', onErrorButtonHandler);
  document.removeEventListener('click', onOutOfFormHandler);
  document.removeEventListener('keydown', onErrorEscKeydownHandler);
  body.removeChild(errorFormTemplate);
}

function setUserFormSubmit(onSuccess) {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    blockSubmitButton();

    sendDataToServer(
      () => {
        onSuccess();
        unblockSubmitButton();
        showSuccessForm();
      },
      (message) => {
        showErrorForm(message);
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  });
}

export {setUserFormSubmit, closeEditingWindow};

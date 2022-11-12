import { isEscapeKey, checkForRepeats } from './util.js';

const MAX_LENGTH_COMMENT = 140;
const MAX_LENGTH_HASHTAG = 20;
const MAX_HASHTAGS_COUNT = 5;
let massageHashtagError = '';

const HASHTAG_RULES = {
  HASHTAG_SYMBOL: 'Хэш-тег начинается с символа # (решётка).',
  VALID_CHARACTERS: 'Cтрока после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д..',
  ONLY_HASHTAG: 'Хеш-тег не может состоять только из одной решётки.',
  MAX_LENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку.',
  NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды.',
  MAX_COUNT: 'Нельзя указать больше пяти хэш-тегов.',
  OKAY: ''
};

const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

const form = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const loadImgButtonElement = form.querySelector('#upload-file');
const editingWindow = form.querySelector('.img-upload__overlay');
const editingCloseButtonElement = editingWindow.querySelector('#upload-cancel');
const submitButtonElement = form.querySelector('.img-upload__submit');
const hashtagsInputElement = form.querySelector('input[name="hashtags"]');
const descriptionInputElement = form.querySelector('textarea[name="description"]');


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
  massageHashtagError = HASHTAG_RULES.OKAY;
  value = value.trim();
  value = value.toLowerCase();
  const hashtags = value.split(' ');
  if (hashtags[0] !== '') {
    for (const hashtag of hashtags) {
      if (!re.test(hashtag)){
        if (hashtag[0] !== '#') {
          massageHashtagError = HASHTAG_RULES.HASHTAG_SYMBOL;
          return false;
        }
        if (hashtag.length === 1 && hashtag[0]=== '#') {
          massageHashtagError = HASHTAG_RULES.ONLY_HASHTAG;
          return false;
        }
        if (hashtag.length > MAX_LENGTH_HASHTAG) {
          massageHashtagError = HASHTAG_RULES.MAX_LENGTH;
          return false;
        }
        massageHashtagError = HASHTAG_RULES.VALID_CHARACTERS;
        return false;
      }
    }
    if (hashtags.length > MAX_HASHTAGS_COUNT) {
      massageHashtagError = HASHTAG_RULES.MAX_COUNT;
      return false;
    }
    if (checkForRepeats(hashtags)) {
      massageHashtagError = HASHTAG_RULES.NO_REPEAT;
      return false;
    }
  }
  return true;
}

const generateMessageHashtags = () => massageHashtagError;

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
  editingWindow.classList.remove('hidden');
  body.classList.add('modal-open');

  editingCloseButtonElement.addEventListener('click', buttonClickHandler);
  document.addEventListener('keydown', buttonKeydownHandler);
  hashtagsInputElement.addEventListener('input', validateForm);
  descriptionInputElement.addEventListener('input', validateForm);
}

function closeEditingWindow () {
  editingWindow.classList.add('hidden');
  body.classList.remove('modal-open');

  editingCloseButtonElement.removeEventListener('click', buttonClickHandler);
  document.removeEventListener('keydown', buttonKeydownHandler);
  hashtagsInputElement.removeEventListener('input', validateForm);
  descriptionInputElement.removeEventListener('input', validateForm);

  hashtagsInputElement.value = '';
  descriptionInputElement.value = '';
  loadImgButtonElement.value = '';
}

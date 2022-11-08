import {checksForRepeats} from './util.js';

const form = document.querySelector('.img-upload__form');

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
}

const pristine = new Pristine(form, {
    classTo: 'img-upload__text',
    errorTextParent: 'img-upload__text', 
    errorTextTag: 'span', 
    errorTextClass: 'img-upload__error'
  }, true);

const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

function validateHashtag (value) {
    massageHashtagError = HASHTAG_RULES.OKAY;
    value = value.trim();
    value = value.toLowerCase();
    const hashtags = value.split(' ');
    if (hashtags[0] != '') {
        for (let hashtag of hashtags) {
            if (!re.test(hashtag)){
                if (hashtag[0] !== '#') {
                    massageHashtagError = HASHTAG_RULES.HASHTAG_SYMBOL;
                    return false;
                }
                if (hashtag.length === 1) {
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
        if (checksForRepeats(hashtags)) {
            massageHashtagError = HASHTAG_RULES.NO_REPEAT;
            return false;
        }
     return true;
    }
};

const generateMessageError = () => massageHashtagError;

const validateDescription = (value) => value.length <= MAX_LENGTH_COMMENT;


pristine.addValidator(form.querySelector('input[name="hashtags"]'), validateHashtag, generateMessageError);
pristine.addValidator(form.querySelector('textarea[name="description"]'), validateDescription, 'Длина комментария не может составлять больше 140 символов');


export {pristine};

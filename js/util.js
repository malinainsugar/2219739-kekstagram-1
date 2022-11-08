/* eslint-disable no-unused-vars */

function getRandomNumber (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}


function checkLengthString (line, maximum) {
  return line.length <= maximum;
}

const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

const isEscapeKey = (evt) => evt.keyCode === 27;

function checkForRepeats (list) {
  const containerForСomparison = {};
  for (const element of list) {
    if (containerForСomparison[element]) {
      return true;
    }
    containerForСomparison[element] = 1;
  }
  return false;
}

export {getRandomArrayElement, getRandomNumber, isEscapeKey, checkForRepeats};

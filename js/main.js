// eslint-disable-next-line no-unused-vars
function getRandomNumber (minimum, maximum) {
  if (maximum >= minimum && minimum >= 0) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
  } else {
    return -1;
  }
}
// eslint-disable-next-line no-unused-vars
function checkLengthString (line, maximum) {
  const stringLength = line.length;
  if (stringLength <= maximum) {
    return true;
  }
  return false;
}


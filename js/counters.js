let i = 1;
function createID () {
  return i++;
}

let j = 1;
function createURL () {
  return j++;
}

let k = 1;
function createIDComments () {
  return k++;
}

export {createID, createURL, createIDComments};

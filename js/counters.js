let idPhoto = 1;
function createIDPhoto () {
  return idPhoto++;
}

let url = 1;
function createURL () {
  return url++;
}

let idComments = 1;
function createIDComments () {
  return idComments++;
}

let idDescriptions = 0;
function createIDDescriptions () {
  return idDescriptions++;
}

export {createIDPhoto, createURL, createIDComments, createIDDescriptions};

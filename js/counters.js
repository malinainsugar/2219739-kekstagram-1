let idPhoto = 1;
function createID () {
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

let idDescpiptions = 0;
function createIDDescpiptions () {
  return idDescpiptions++;
}

export {createID, createURL, createIDComments, createIDDescpiptions};

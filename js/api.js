const getDataFromServer = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      onFail('При загрузке данных с сервера произошла ошибка');
    });
};

const sendDataToServer = (onSuccess, onFail, body) => {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    }
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось опубликовать');
    }
  })
    .catch(() => {
      onFail('Не удалось опубликовать');
    });
};

export {getDataFromServer, sendDataToServer};

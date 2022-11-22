let filterType = 'none';

const form = document.querySelector('.img-upload__form');

const zoomOutButtonElement = form.querySelector('.scale__control--smaller');
const zoomButtonElement = form.querySelector('.scale__control--bigger');
const scaleValueElement = form.querySelector('.scale__control--value');
const imageElement = form.querySelector('.img-upload__preview img');

const filterButtonsContainer = form.querySelector('.effects__list');
const sliderElement = form.querySelector('.effect-level__slider');
const filterValueElement = form.querySelector('.effect-level__value');


function zoomOutImage () {
  let scaleValue = Number(scaleValueElement.value.replace('%', ''));
  if (scaleValue > 25) {
    scaleValue -= 25;
    scaleValueElement.value = `${scaleValue}%`;
    imageElement.style.transform = `scale(0.${scaleValue})`;
  }
}

function zoomInImage () {
  let scaleValue = Number(scaleValueElement.value.replace('%', ''));
  if (scaleValue < 100) {
    scaleValue += 25;
    scaleValueElement.value = `${scaleValue}%`;
    if (scaleValue === 100) {
      imageElement.style.transform = 'scale(1)';
    } else {
      imageElement.style.transform = `scale(0.${scaleValue})`;
    }
  }
}

function addEventListenerImage () {
  zoomOutButtonElement.addEventListener('click', zoomOutImage);
  zoomButtonElement.addEventListener('click', zoomInImage);
}

function removeEventListenerImage () {
  zoomOutButtonElement.removeEventListener('click', zoomOutImage);
  zoomButtonElement.removeEventListener('click', zoomInImage);
}

const FILTERS = {
  NONE: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  CHROME: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  SEPIA: {
    range: {
      min: 0,
      max: 1
    },
    start: 1,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  MARVIN: {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    format: {
      to: function (value) {
        return `${value}%`;
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  PHOBOS: {
    range: {
      min: 0,
      max: 3
    },
    start: 3,
    step: 0.1,
    format: {
      to: function (value) {
        return `${value.toFixed(1)}px`;
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  },
  HEAT: {
    range: {
      min: 1,
      max: 3
    },
    start: 3,
    step: 0.1,
    format: {
      to: function (value) {
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      }
    }
  }
};

function customiseFilter (filterID) {
  let filterClass;
  let options;
  switch (filterID) {
    case 'effect-none':
      filterClass = 'effects__preview--none';
      filterType = 'none';
      sliderElement.setAttribute('hidden', true);
      options = FILTERS.NONE;
      break;
    case 'effect-chrome':
      filterClass = 'effects__preview--chrome';
      filterType = 'grayscale';
      sliderElement.removeAttribute('hidden', true);
      options = FILTERS.CHROME;
      break;
    case 'effect-sepia':
      filterClass = 'effects__preview--sepia';
      filterType = 'sepia';
      sliderElement.removeAttribute('hidden', true);
      options = FILTERS.SEPIA;
      break;
    case 'effect-marvin':
      filterClass = 'effects__preview--marvin';
      filterType = 'invert';
      sliderElement.removeAttribute('hidden', true);
      options = FILTERS.MARVIN;
      break;
    case 'effect-phobos':
      filterClass = 'effects__preview--phobos';
      filterType = 'blur';
      sliderElement.removeAttribute('hidden', true);
      options = FILTERS.PHOBOS;
      break;
    case 'effect-heat':
      filterClass= 'effects__preview--heat';
      filterType = 'brightness';
      sliderElement.removeAttribute('hidden', true);
      options = FILTERS.HEAT;
      break;
  }
  imageElement.className = '';
  imageElement.classList.add(filterClass);
  sliderElement.noUiSlider.updateOptions(options);
}

function onFilterChange (evt) {
  if (evt.target.closest('.effects__item')) {
    customiseFilter(evt.target.id);
  }
}

function addsFilter () {
  filterValueElement.value = 1;
  noUiSlider.create(sliderElement, FILTERS.NONE);
  sliderElement.setAttribute('hidden', true);
  filterButtonsContainer.addEventListener('change', onFilterChange);

  sliderElement.noUiSlider.on('update', () => {
    filterValueElement.value = parseFloat(sliderElement.noUiSlider.get());
    if (filterType !== 'none') {
      imageElement.style.filter = `${filterType}(${sliderElement.noUiSlider.get()})`;
    } else {
      imageElement.style.filter = '';
    }
  });
}

const removeFilters = () => {
  filterButtonsContainer.removeEventListener('change', onFilterChange);
  imageElement.className = '';
  imageElement.style.filter = '';
  document.querySelector('#effect-none').checked = true;
  sliderElement.noUiSlider.destroy();
};


export { form, addEventListenerImage, removeEventListenerImage, addsFilter, removeFilters };

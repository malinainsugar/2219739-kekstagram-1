/* eslint-disable no-unused-vars */

function getRandomNumber (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
}


function checkLengthString (line, maximum) {
  return line.length <= maximum;
}

const getRandomArrayElement = function (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Алёна',
  'Вася',
  'Маруся',
  'Данил',
  'Даррен Эллохард',
  'Риан Тьер',
  'Кадзу',
  'Ниалл',
  'Ариана',
  'Хуа Чен',
  'Се Лянь',
  'Лань Чжань',
  'Ло Бинхэ',
  'Вей Ин',
  'Лолита',
  'Люциан',
  'Рэйтан'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


const DESCRIPTIONS = [
  'Это просто доказательство того, что я могу быть лучшим эгоистом, чем вы.',
  'Улыбка — наше последнее слово в марафете.',
  'Жизнь слишком коротка, поэтому всегда ешь свой десерт в первую очередь.',
  'Я люблю свою работу, особенно тогда, когда наступает отпуск.',
  'Вы можете себе представить? Я проснулась вот так!',
  'Всякий раз, когда у меня возникает проблема, я просто начинаю петь. Затем я понимаю, что мой голос — худшая из всех моих проблем.',
  'Я не ленива. Я просто включила режим энергосбережения.',
  'Я только встретила тебя, а оказалось, что это целое безумие.',
  'Самое крутое доказательство того, что я умею делать фотки, лучше чем вы.',
  'Котики, ну куда же без них?',
  'Она — мой лучший друг.',
  'Если я когда-то напишу историю нашей жизни, не удивляйся, что твое имя я упомяну несколько миллиардов раз.',
  'Спокойно! Просто сегодня я сильно взволнована!',
  'В море может и водится миллион рыб, но я единственная русалка.',
  'Доброе утро, всем! Теперь давайте начнем стресс!',
  'Помните: не все, кто ушел, уходят.',
  'Никто никогда не совершенен. Вот почему изобрели корректор и ластик.',
  'Историю составляют только люди, нарушающие правила.',
  'Я не совершенен. Я никогда им не был, и я никогда им не буду.',
  'Надеваю эти розовые очки, чтобы не замечать вашего серого мира.',
  'Грустить лучше в мерседесе…',
  'Do not be a slave in heaven. Be a king of hell.',
  'But I"m only human after all. Don"t put your blame on me.',
  'When life gives you lemons, make orange juice and make them wonder how you did it. ',
  'I never lose. Either I win or I learn.'
];

const PHOTO_COUNT = 25;
const photoDescriptions = [];

for (let i = 1; i <= PHOTO_COUNT; i++) {
  photoDescriptions.push({
    id: i,
    url: `photos/${i}.jpg`,
    description: DESCRIPTIONS[i],
    likes: getRandomNumber(15, 200),
    comments: [{
      id: i * getRandomNumber(1, 100),
      avatar: `img/avatar${getRandomNumber(1, 6)}.svg`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES)
    }]
  });
};

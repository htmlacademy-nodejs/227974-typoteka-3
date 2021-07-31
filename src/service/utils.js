'use strict';

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const leadingZeroFormat = (number) => {
  number = number.toString();
  return number.length === 1 ? `0${number}` : number;
};

const getRandomPostDate = () => {
  const now = new Date();
  const [year, month, day, monthDiff] = [now.getFullYear(), now.getMonth() + 1, now.getDate(), getRandomInt(-3, 0)];

  const postDate = new Date(year, month + monthDiff, 0);
  const daysInMonth = postDate.getDate();
  const randomDay = (monthDiff === 0) ? Math.min(day, getRandomInt(1, daysInMonth)) : getRandomInt(1, daysInMonth);

  const monthFormatted = leadingZeroFormat(postDate.getMonth() + 1);
  const dayFormatted = leadingZeroFormat(randomDay);
  const [hour, min, sec] = [leadingZeroFormat(getRandomInt(0, 24)), leadingZeroFormat(getRandomInt(0, 60)), leadingZeroFormat(getRandomInt(0, 60))];
  // формально именно hour/min/sec могут конечно могут опередить текущее время

  return `${year}-${monthFormatted}-${dayFormatted} ${hour}:${min}:${sec}`;
};

module.exports = {
  getRandomInt,
  getRandomPostDate,
  leadingZeroFormat,
  shuffle,
};

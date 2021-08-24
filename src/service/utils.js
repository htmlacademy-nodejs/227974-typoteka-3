'use strict';

const getRandomInt = (minValue, maxValue) => {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (arr) => {
  const arrLocal = arr.slice();
  for (let i = arrLocal.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [arrLocal[i], arrLocal[randomPosition]] = [arrLocal[randomPosition], arrLocal[i]];
  }

  return arrLocal;
};

const formatToLeadingZero = (number) => {
  return number.toString().padStart(2, `0`);
};

const getRandomPostDate = () => {
  const now = new Date();
  const [year, month, day, monthDiff] = [now.getFullYear(), now.getMonth() + 1, now.getDate(), getRandomInt(-3, 0)];

  const postDate = new Date(year, month + monthDiff, 0);
  const daysInMonth = postDate.getDate();
  const randomDay = (monthDiff === 0) ? Math.min(day, getRandomInt(1, daysInMonth)) : getRandomInt(1, daysInMonth);

  const monthFormatted = formatToLeadingZero(postDate.getMonth() + 1);
  const dayFormatted = formatToLeadingZero(randomDay);
  const [hour, min, sec] = [formatToLeadingZero(getRandomInt(0, 24)), formatToLeadingZero(getRandomInt(0, 59)), formatToLeadingZero(getRandomInt(0, 59))];
  // формально именно hour/min/sec могут конечно могут опередить текущее время

  return `${year}-${monthFormatted}-${dayFormatted} ${hour}:${min}:${sec}`;
};

module.exports = {
  getRandomInt,
  getRandomPostDate,
  formatToLeadingZero,
  shuffle,
};

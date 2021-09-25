'use strict';

const getRandomInt = (minValue, maxValue) => {
  const min = Math.ceil(minValue);
  const max = Math.floor(maxValue);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (array) => {
  const localArray = array.slice();
  for (let i = localArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [localArray[i], localArray[randomPosition]] = [localArray[randomPosition], localArray[i]];
  }

  return localArray;
};

const formatToLeadingZero = (number) => {
  return number.toString().padStart(2, `0`);
};

const getRandomPostDay = (year, month) => {
  const now = new Date();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const isCurrentMonth = now.getFullYear() === year && now.getMonth() === month;

  return isCurrentMonth ? Math.min(now.getDate(), getRandomInt(1, daysInMonth)) : getRandomInt(1, daysInMonth);
};

const getRandomPostDate = () => {
  const OLDEST_POSSIBLE_MONTH_FROM_NOW = -3;
  const now = new Date();

  const postYear = now.getFullYear();
  const postMonth = new Date(postYear, now.getMonth() + getRandomInt(OLDEST_POSSIBLE_MONTH_FROM_NOW, 0)).getMonth();
  const postDay = getRandomPostDay(postYear, postMonth);

  const monthFormatted = formatToLeadingZero(postMonth + 1);
  const dayFormatted = formatToLeadingZero(postDay);

  const hour = formatToLeadingZero(getRandomInt(0, 24));
  const min = formatToLeadingZero(getRandomInt(0, 59));
  const sec = formatToLeadingZero(getRandomInt(0, 59));

  return `${postYear}-${monthFormatted}-${dayFormatted} ${hour}:${min}:${sec}`;
};

const sendResponse = (res, httpCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>${message}</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.writeHead(httpCode, {
    'Content-Type': `text/html; charset=UTF-8`
  });

  res.end(template);
};

module.exports = {
  getRandomInt,
  getRandomPostDate,
  formatToLeadingZero,
  shuffle,
  sendResponse,
};

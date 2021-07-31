'use strict';

const fs = require(`fs`);
const {getRandomInt, getRandomPostDate, shuffle} = require(`../utils`);
const {
  MockData: {
    FILE_NAME,
    TITLES,
    ANNOUNCE,
    CATEGORY,
    MAX_POSTS,
    MIN_POSTS,
  }
} = require(`../constants`);


const generatePosts = (count) =>
  Array(count).fill({}).map(() => (
    {
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      announce: shuffle(ANNOUNCE.slice()).slice(0, getRandomInt(1, 6)).join(` `),
      fullText: shuffle(ANNOUNCE.slice()).slice(0, 7).join(` `),
      createdDate: getRandomPostDate(),
      category: shuffle(CATEGORY.slice()).slice(0, getRandomInt(1, 3)),
    })
  );

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countPosts = Number.parseInt(count, 10) || MIN_POSTS;

    if (countPosts > MAX_POSTS) {
      console.error(`Не больше ${MAX_POSTS} публикаций`);
      process.exit(1);
    }

    const posts = generatePosts(countPosts);
    const content = JSON.stringify(posts);

    fs.writeFile(`../../${FILE_NAME}`, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file - ${err}`);
      }
      return console.info(`Operation success. File created.`);
    });
  }
};

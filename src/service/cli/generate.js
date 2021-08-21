'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, getRandomPostDate, shuffle} = require(`../utils`);
const {
  ExitCode,
  MockData: {
    FILE_NAME,
    TITLE,
    ANNOUNCE,
    CATEGORY,
    MIN_POSTS_COUNT,
    MAX_POSTS_COUNT,
  }
} = require(`../constants`);


const generatePosts = (count) =>
  Array(count).fill({}).map(() => (
    {
      title: TITLE[getRandomInt(0, TITLE.length - 1)],
      announce: shuffle(ANNOUNCE).slice(0, getRandomInt(1, 6)).join(` `),
      fullText: shuffle(ANNOUNCE).slice(0, 7).join(` `),
      createdDate: getRandomPostDate(),
      category: shuffle(CATEGORY).slice(0, getRandomInt(1, 3)),
    })
  );

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const postsCount = Number.parseInt(count, 10) || MIN_POSTS_COUNT;

    if (postsCount > MAX_POSTS_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_POSTS_COUNT} публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const posts = generatePosts(postsCount);
    const content = JSON.stringify(posts);

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (e) {
      console.error(chalk.red(`Can't write data to file - ${e}`));
    }
  }
};

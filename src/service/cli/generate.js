'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, getRandomPostDate, shuffle} = require(`../utils`);
const {
  ExitCode,
  FILE_NAME_MOCKS,
  MIN_POSTS_COUNT,
  MAX_POSTS_COUNT,
} = require(`../constants`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;

const generatePosts = (count, sentences, titles, categories) => {
  return Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(0, getRandomInt(1, 6)).join(` `),
    fullText: shuffle(sentences).slice(0, 7).join(` `),
    createdDate: getRandomPostDate(),
    category: shuffle(categories).slice(0, getRandomInt(1, 3)),
  })
  );
};

const readContent = async (path) => {
  try {
    let data = await fs.readFile(path, `utf8`);
    return data.trim().split(`\n`);
  } catch (err) {
    console.log(chalk.red(`Ошибка при чтении файлa - ${err}`));
    return [];
  }
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);

    const [count] = args;
    const postsCount = Number.parseInt(count, 10) || MIN_POSTS_COUNT;

    if (postsCount > MAX_POSTS_COUNT) {
      console.error(chalk.red(`Не больше ${MAX_POSTS_COUNT} публикаций`));
      process.exit(ExitCode.ERROR);
    }

    const posts = generatePosts(postsCount, sentences, titles, categories);
    const content = JSON.stringify(posts);

    try {
      await fs.writeFile(FILE_NAME_MOCKS, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (e) {
      console.error(chalk.red(`Can't write data to file - ${e}`));
    }
  }
};

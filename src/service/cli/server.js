'use strict';

const chalk = require(`chalk`);
const http = require(`http`);
const fs = require(`fs`).promises;

const {
  FILE_NAME_MOCKS,
  DEFAULT_SERVER_PORT,
  NOT_FOUND_MESSAGE,
  HttpCode,
} = require(`../constants`);

const {sendResponse} = require(`../utils`);

const onClientConnect = async (req, res) => {
  switch (req.url) {
    case (`/`):
      try {
        const mocks = await fs.readFile(FILE_NAME_MOCKS, `utf8`);
        const titles = JSON.parse(mocks).map((mock) => mock.title);
        const listHtml = titles.map((title) => `<li>${title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${listHtml}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, NOT_FOUND_MESSAGE);
      break;
  }
};


module.exports = {
  name: `--server`,
  run(args) {
    const serverPort = Number.parseInt(args[0], 10) || DEFAULT_SERVER_PORT;

    http.createServer(onClientConnect)
      .listen(serverPort)
      .on(`listening`, () => {
        console.info(chalk.green(`Ожидаю соединений на ${serverPort}`));
      })
      .on(`error`, ({message}) => {
        console.error(chalk.red(`Ошибка при создании сервера: ${message}`));
      });
  }
};

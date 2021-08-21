'use strict';

const chalk = require(`chalk`);

module.exports = {
  name: `--version`,
  run() {
    const packageJsonFile = require(`../../../package.json`);
    console.info(chalk.blue(packageJsonFile.version));
  }
};

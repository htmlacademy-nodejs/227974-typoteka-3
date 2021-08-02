'use strict';

module.exports = {
  name: `--version`,
  run() {
    const packageJsonFile = require(`../../../package.json`);
    console.info(packageJsonFile.version);
  }
};

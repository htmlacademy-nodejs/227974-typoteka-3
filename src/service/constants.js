'use strict';

module.exports = {
  DEFAULT_COMMAND: `--help`,
  DEFAULT_SERVER_PORT: 3000,
  NOT_FOUND_MESSAGE: `Not found`,
  USER_ARGV_INDEX: 2,
  ExitCode: {
    SUCCESS: 0,
    ERROR: 1,
  },
  HttpCode: {
    OK: 200,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401,
  },
  FILE_NAME_MOCKS: `mocks.json`,
  MIN_POSTS_COUNT: 1,
  MAX_POSTS_COUNT: 1000,
};


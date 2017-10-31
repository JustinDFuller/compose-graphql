import _ from 'lodash';
import fp from 'lodash/fp';

import app from './app';
import routes from './app/routes';
import logs from './logs';
import dependencies from './dependencies';
import config from './config';

const composedApp = [
  app,
  routes,
  logs,
  dependencies,
  config,
];

const mergeFreeze = fp.compose(
  Object.freeze,
  _.merge
);

const accumulator = (app, method) => mergeFreeze(
  {},
  app,
  method(app)
);

const startDate = new Date();

/**
 * reduceRight will work the same as fp.compose (right to left).
 * The result of each function will be merged with the result of the next.
 * So each function doesn't have to worry about modifying or adding the lasts result.
 */
_.reduceRight(composedApp, accumulator, {});

const endDate   = new Date();
const seconds = (endDate.getTime() - startDate.getTime()) / 1000;

console.log(`App started in ${seconds} seconds`);

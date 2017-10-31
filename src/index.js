import _ from 'lodash';
import config from './config';
import dependencies from './dependencies';
import routes from './app/routes';
import app from './app';
import logs from './logs';

const application = [
  app,
  routes,
  logs,
  dependencies,
  config,
];

/**
 * reduceRight will work the same as fp.compose (right to left).
 * The result of each function will be merged with the result of the next.
 * So each function doesn't have to worry about modifying or adding the lasts result.
 */
_.reduceRight(application, (app, method) => {
  return _.merge(
    {},
    app,
    method(app)
  );
}, {});
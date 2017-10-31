import fp from 'lodash/fp';
import config from './config';
import dependencies from './dependencies';
import routes from './app/routes';
import app from './app';
import logs from './logs';

const application = fp.compose(
  app,
  routes,
  logs,
  dependencies,
  config
);

application();

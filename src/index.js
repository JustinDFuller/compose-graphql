import fp from 'lodash/fp';
import config from './config';
import dependencies from './dependencies';
import routes from './app/routes';
import app from './app';

const application = fp.compose(
  app,
  routes,
  dependencies,
  config
);

application();

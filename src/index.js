import { callAndCombine } from './utils';
import app from './app';
import routes from './routes';
import logger from './logger';
import dependencies from './dependencies';
import config from './config';

const composedApp = [
  app,
  routes,
  logger,
  dependencies,
  config,
];


const startDate = new Date();

callAndCombine({}, composedApp);

const endDate   = new Date();
const seconds = (endDate.getTime() - startDate.getTime()) / 1000;

console.log(`App started in ${seconds} seconds`);

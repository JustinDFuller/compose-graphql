import 'babel-polyfill';
import { callAndCombine } from './utils';
import server from  './utils/server';
import routes from './routes';
import sockets from './sockets';
import logger from './utils/logger';
import dependencies from './utils/dependencies';
import config from './utils/config';

// Called from bottom to top (right to left, composition style).
const composedApp = [
  server,
  routes,
  sockets,
  logger,
  dependencies,
  config,
];


const startDate = new Date();

callAndCombine({}, composedApp);

const endDate   = new Date();
const seconds = (endDate.getTime() - startDate.getTime()) / 1000;

console.log(`App started in ${seconds} seconds`);

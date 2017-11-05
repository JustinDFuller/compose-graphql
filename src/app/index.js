import { callAndCombine } from '../utils';
import create from './create';
import middleware from './middleware';
import router from './router';
import listen from './listen';

const server = [
  listen,
  router,
  middleware,
  create,
];

export default (appConfig) => callAndCombine(appConfig, server);

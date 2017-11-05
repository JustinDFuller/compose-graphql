import _ from 'lodash';
import { callAndCombine } from '../';
import create from './create';
import middleware from './middleware';
import websockets from './websockets';
import router from './router';
import listen from './listen';

const server = [
  listen,
  router,
  websockets,
  middleware,
  create,
];

export default _.partialRight(callAndCombine, server);

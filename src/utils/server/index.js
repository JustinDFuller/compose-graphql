import _ from 'lodash';
import { callAndCombine } from '../';
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

export default _.partialRight(callAndCombine, server);

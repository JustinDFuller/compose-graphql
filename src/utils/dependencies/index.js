import _ from 'lodash';
import fp from 'lodash/fp';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import bunyan from 'bunyan';
import immutable from 'immutable';
import io from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import Promise from 'bluebird';

const dependencies = {
  _,
  io,
  fp,
  helmet,
  bunyan,
  express,
  immutable,
  bodyParser,
  compression,
  cookieParser,
  cookieSession,
  http: Promise.promisifyAll(http, { context: http }),
};

export default () => ({
  dependencies,
});

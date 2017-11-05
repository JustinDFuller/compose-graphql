import _ from 'lodash';
import fp from 'lodash/fp';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import bunyan from 'bunyan';
import immutable from 'immutable';
import io from 'socket.io';

const dependencies = {
  _,
  io,
  fp,
  express,
  compression,
  helmet,
  bunyan,
  immutable,
};

export default () => ({
  dependencies,
});

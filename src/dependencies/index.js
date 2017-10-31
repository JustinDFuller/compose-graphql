import _ from 'lodash';
import fp from 'lodash/fp';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import bunyan from 'bunyan';

const dependencies = {
  _,
  fp,
  express,
  compression,
  helmet,
  bunyan,
};

export default () => ({
  dependencies,
});

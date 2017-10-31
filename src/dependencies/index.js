import _ from 'lodash';
import fp from 'lodash/fp';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';

const dependencies = {
  _,
  fp,
  express,
  compression,
  helmet,
};

export default config => ({
  ...config,
  dependencies,
});

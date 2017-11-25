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
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Promise from 'bluebird';
import Sequelize from 'sequelize';
// import GraphqlSequelize from 'graphql-sequelize';
import * as ApolloServer from 'apollo-server-express';

const dependencies = {
  _,
  io,
  fp,
  path,
  React,
  helmet,
  bunyan,
  express,
  Sequelize,
  immutable,
  bodyParser,
  compression,
  ApolloServer,
  cookieParser,
  cookieSession,
  ReactDOMServer,
  // GraphqlSequelize,
  fs: Promise.promisifyAll(fs, { context: fs }),
  http: Promise.promisifyAll(http, { context: http }),
};

export default () => ({
  dependencies,
});

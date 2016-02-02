process.env.BABEL_ENV = 'browser';
process.env.NODE_ENV = 'development';

import Koa from 'koa';
import debug from 'debug';
import webpack from 'webpack';
import convert from 'koa-convert';

import config from './dev.config';

const app = new Koa();
const compiler = webpack(config.webpack);

debug.enable('dev');

app.use(convert(require('koa-webpack-dev-middleware')(compiler, config.server.options)));
app.use(convert(require('koa-webpack-hot-middleware')(compiler)));

app.listen(config.server.port, '0.0.0.0', () =>
  debug('dev')('`webpack-dev-server` listening on port %s', config.server.port));

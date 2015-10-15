process.env.BABEL_ENV = 'browser';
process.env.NODE_ENV = 'development';

import koa from 'koa';
import debug from 'debug';
import webpack from 'webpack';

import config from './dev.config';

const app = koa();
const compiler = webpack(config.webpack);

debug.enable('dev');

app.use(require('koa-webpack-dev-middleware')(compiler, config.server.options));
app.use(require('koa-webpack-hot-middleware')(compiler));

app.listen(config.server.port, '0.0.0.0', function() {
  debug('dev')('`webpack-dev-server` listening on port %s', config.server.port);
});

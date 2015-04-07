'use strict';

import path from 'path';

import koa from 'koa';
import hbs from 'koa-hbs';
import etag from 'koa-etag';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import compressor from 'koa-compressor';
import staticCache from 'koa-static-cache';
import conditional from 'koa-conditional-get';
import responseTime from 'koa-response-time';

import router from './router';
import config from './config/init';

const app = koa();
const env = process.env.NODE_ENV || 'development';

// add header `X-Response-Time`
app.use(responseTime());

// various security headers
app.use(helmet.defaults());

// Cache client-side content on production
if (env === 'production') {
  app.use(conditional());
  app.use(etag());
  app.use(compressor());
  app.use(function *(next) {
    this.set('Cache-Control', 'public, max-age=86400000');
    yield next;
  });
}

if (env === 'development') {
  // log http requests
  app.use(logger());
  // log when process is blocked
  require('blocked')((ms) => console.log(`blocked for ${ms}ms`));
}

app.use(hbs.middleware({
  defaultLayout: 'index',
  layoutsPath: path.join(__dirname, '/views/layouts'),
  viewPath: path.join(__dirname, '/views')
}));

const cacheOpts = {maxAge: 86400000, gzip: true};
app.use(mount('/assets', staticCache(path.join(__dirname, '../dist'), cacheOpts)));

app.use(router);
app.listen(config.port);

console.log(`Application started on port ${config.port}`);
if (process.send) {
  process.send('online');
}

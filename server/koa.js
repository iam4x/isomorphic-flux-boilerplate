'use strict';

import path from 'path';

import koa from 'koa';
import hbs from 'koa-hbs';
import mount from 'koa-mount';
import helmet from 'koa-helmet';
import logger from 'koa-logger';
import staticCache from 'koa-static-cache';
import responseTime from 'koa-response-time';

import router from './router';
import config from './config/init';

const app = koa();
const env = process.env.NODE_ENV || 'development';

// add header `X-Response-Time`
app.use(responseTime());
app.use(logger());

// various security headers
app.use(helmet.defaults());

if (env === 'production') {
  app.use(require('koa-conditional-get')());
  app.use(require('koa-etag')());
  app.use(require('koa-compressor')());

  // Cache pages
  const cache = require('lru-cache')({maxAge: 3000});
  app.use(require('koa-cash')({
    get: function* (key) {
      return cache.get(key);
    },
    set: function* (key, value) {
      cache.set(key, value);
    }
  }));
}

if (env === 'development') {
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

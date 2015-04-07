'use strict';

import path from 'path';

import koa from 'koa';
import hbs from 'koa-hbs';
import etag from 'koa-etag';
import mount from 'koa-mount';
import compressor from 'koa-compressor';
import staticCache from 'koa-static-cache';
import conditional from 'koa-conditional-get';

import router from './router';

const app = koa();

// Cache client-side content on production
if (process.env.NODE_ENV === 'production') {
  app.use(conditional());
  app.use(etag());
  app.use(compressor());
  app.use(function *(next) {
    this.set('Cache-Control', 'public, max-age=86400000');
    yield next;
  });
}

app.use(hbs.middleware({
  defaultLayout: 'index',
  layoutsPath: path.join(__dirname, '/views/layouts'),
  viewPath: path.join(__dirname, '/views')
}));

const cacheOpts = {maxAge: 86400000, gzip: true};
app.use(mount('/assets', staticCache(path.join(__dirname, '../dist'), cacheOpts)));

app.use(router);
app.listen(3000);

console.log('Application started on port 3000');
if (process.send) {
  process.send('online');
}

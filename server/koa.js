'use strict';

import path from 'path';

import koa from 'koa';
import hbs from 'koa-hbs';
import serve from 'koa-static';
import mount from 'koa-mount';

import router from './router';

const app = koa();

app.use(hbs.middleware({
  defaultLayout: 'index',
  layoutsPath: path.join(__dirname, '/views/layouts'),
  viewPath: path.join(__dirname, '/views')
}));

app.use(mount('/assets/img', serve(path.join(__dirname, '../dist/img'))));
app.use(mount('/assets/js', serve(path.join(__dirname, '../dist/js'))));
app.use(mount('/assets/css', serve(path.join(__dirname, '../dist/css'))));

app.use(router);
app.listen(3000);

console.log('Application started on port 3000');

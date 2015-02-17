'use strict';

// Install `babel` hook
require('babel/register');

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const router = require('./server.router');

const app = express();

app.engine('handlebars', exphbs({
  layoutsDir: __dirname + '/views/layouts',
  defaultLayout: 'index'
}));
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/assets/img', express.static(path.resolve(__dirname + '/../dist/img/')));
app.use('/assets/js', express.static(path.resolve(__dirname + '/../dist/js')));
app.use('/assets/css', express.static(path.resolve(__dirname + '/../dist/css')));

app.use(router);
app.listen(3000);

console.log('Application started on port 3000');

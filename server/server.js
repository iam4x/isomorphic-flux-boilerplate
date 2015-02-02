'use strict';

// Install `.jsx` into node
require('node-jsx').install({
  extension: '.jsx',
  harmony: true
});

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

app.use('/assets/images', express.static(path.resolve(__dirname + '/../app/assets/')));
app.use('/assets/javascript', express.static(path.resolve(__dirname + '/../dist/')));

app.use(router);
app.listen(3000);

console.log('Application started on port 3000');

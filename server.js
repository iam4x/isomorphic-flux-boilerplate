'use strict';

// Install `.jsx` into node
require('node-jsx').install({
  extension: '.jsx',
  harmony: true
});

const express = require('express');
const exphbs = require('express-handlebars');

const router = require('./router');

const app = express();

app.engine('handlebars', exphbs({defaultLayout: 'index'}));
app.set('view engine', 'handlebars');

app.use('/assets/images', express.static(__dirname + '/app/assets/images'));
app.use('/assets/javascript', express.static(__dirname + '/dist/'));

app.use(router);
app.listen(3000);

console.log('Application started on port 3000');

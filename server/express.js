'use strict';

import path from 'path';
import express from 'express';
import exphbs from 'express-handlebars';
import request from 'superagent';

import router from './router';

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

app.use((req, res, next) => {
  return request
    .get('http://api.randomuser.me/?results=10')
    .end((response) => {
      res.locals.data = {
        UserStore: {users: response.body.results}
      };
      return next();
    });
});

app.use(router);
app.listen(3000);

console.log('Application started on port 3000');

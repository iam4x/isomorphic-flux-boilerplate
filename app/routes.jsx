'use strict';

const React = require('react');
const Router = require('react-router');
const {Route, DefaultRoute} = Router;

module.exports = (
  <Route name='app' path='/' handler={require('./components/app')}>
    <DefaultRoute name="home" handler={require('./components/home')} />
    <Route name="guides" handler={require('./components/guides')} />
  </Route>
);

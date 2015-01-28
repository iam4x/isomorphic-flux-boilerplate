'use strict';

const React = require('react');
const Router = require('react-router');
const {Route, DefaultRoute} = Router;

const App = require('./components/app.jsx');
const Home = require('./components/home.jsx');
const Guides = require('./components/guides.jsx');

module.exports = (
  <Route name='app' path='/' handler={App}>
    <DefaultRoute name="home" handler={Home} />
    <Route name="guides" handler={Guides} />
  </Route>
);

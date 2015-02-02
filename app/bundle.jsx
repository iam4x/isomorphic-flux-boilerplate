'use strict';

const React = require('react');
const Router = require('react-router');

const routes = require('./routes.jsx');

const content = document.getElementById('content');

Router.run(routes, Router.HistoryLocation, (Handler) => {
  return React.render(<Handler/>, content);
});

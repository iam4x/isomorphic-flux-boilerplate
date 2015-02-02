'use strict';

const React = require('react');
const Router = require('react-router');

const routes = require('../app/routes');

module.exports = (req, res) => {
  Router.run(routes, req.url, (Handler) => {
    let content = React.renderToString(<Handler/>);
    return res.render('main', {content});
  });
};

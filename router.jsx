'use strict';

const React = require('react');
const Router = require('react-router');

const routes = require(__dirname + '/app/routes.jsx');

module.exports = (req, res) => {
  Router.run(routes, req.url, (Handler) => {
    let content = React.renderToString(<Handler/>);
    return res.render('main', {content});
  });
};

'use strict';

const React = require('react');
const Router = require('react-router');

const routes = require('../app/routes');

module.exports = (req, res) => {
  let router = Router.create({
    routes: routes,
    location: req.url,
    onAbort: function (redirect) {
      // TODO: Try to render the good page with re-creating a Router,
      // and with modifying req with `redirect.to`
      res.writeHead(303, {'Location': redirect.to});
      return res.send();
    },
    onError: function (err) {
      console.log('Routing Error');
      console.log(err);
    }
  });

  router.run((Handler) => {
    let content = React.renderToString(<Handler/>);
    return res.render('main', {content});
  });
};

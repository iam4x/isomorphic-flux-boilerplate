'use strict';

import React from 'react';
import Router from 'react-router';
import Resolver from 'react-resolver';

export default (req, res) => {
  let resolver = new Resolver();
  let routes = resolver.route(require('../app/routes'));
  let router = Router.create({
    routes: routes,
    location: req.url,
    onAbort(redirect) {
      // TODO: Try to render the good page with re-creating a Router,
      // and with modifying req with `redirect.to`
      res.writeHead(303, {'Location': redirect.to});
      return res.send();
    },
    onError(err) {
      console.log('Routing Error');
      console.log(err);
    }
  });

  router.run((Handler) => {
    resolver.handle(Handler).then((resolved) => {
      let content = React.renderToString(resolved);
      return res.render('main', {content});
    });
  });
};

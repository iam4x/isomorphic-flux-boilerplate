'use strict';

import React from 'react';
import Router from 'react-router';
import Resolver from 'react-resolver';

import routes from '../app/routes';

export default (req, res) => {
  const resolver = new Resolver();
  const router = Router.create({
    routes: resolver.route(routes),
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
    resolver.handle(Handler)
      .then((resolved) => {
        const content = React.renderToString(resolved);
        return res.render('main', {content});
      })
      .catch((error) => {
        // TODO: Better error handling if `react-resolver`
        // counldn't resolve correctly the data
        console.warn(error);
        return res.send('Error with fetching upstream data');
      });
  });
};

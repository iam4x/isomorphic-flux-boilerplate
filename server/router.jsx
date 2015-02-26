'use strict';

import Iso from 'iso';
import React from 'react';
import Router from 'react-router';

import alt from 'utils/alt';
import routes from 'routes';

export default (req, res) => {
  // Bootstrap data into Alt stores
  const data = res.locals.data || {};
  alt.bootstrap(JSON.stringify(data));

  const router = Router.create({
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
    // Render the correct component
    let content = React.renderToStaticMarkup(<Handler />);
    // Add him data from alt stores, and flush them
    // to have next request clean
    content = Iso.render(content, alt.flush());
    // Render the app
    return res.render('main', {content});
  });
};

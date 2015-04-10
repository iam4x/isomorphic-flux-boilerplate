'use strict';

import React from 'react';
import Router from 'react-router';
import isoRenderer from 'alt/utils/IsomorphicRenderer';

// Paths are relative to `app` directory
import routes from 'routes';
import alt from 'utils/alt';
import altResolver from 'utils/alt-resolver';

const render = (router) => {
  return new Promise((resolve) => {
    return router.run((Handler) => {
      // Fire first render to catch all promises
      // into altResolver
      React.renderToString(<Handler />);
      // actions filled the promises store
      Promise
        .all(altResolver.getPromises())
        .then(() => resolve(altResolver.render(Handler)));
    });
  });
};

export default function *() {
  const isCashed = this.cashed ? yield this.cashed() : false;
  if (!isCashed) {
    const router = Router.create({
      routes: routes,
      location: this.request.url,
      onAbort(redirect) {
        // TODO: Try to render the good page with re-creating a Router,
        // and with modifying req with `redirect.to`
        this.status = 303;
        this.redirect(redirect.to);
      },
      onError(err) {
        console.log('Routing Error');
        console.log(err);
      }
    });

    const content = yield render(router);
    const assets = require('./webpack-stats.json');

    yield this.render('main', {content, assets});
  }
};

'use strict';

import React from 'react';
import Router from 'react-router';
import isoRenderer from 'alt/utils/IsomorphicRenderer';

// Paths are relative to `app` directory
import alt from 'utils/alt';
import routes from 'routes';

import altResolver from '../shared/alt-resolver';

const render = (router) => {
  const promise = new Promise((resolve) => {
    router.run((Handler, state) => {
      altResolver(
        {routes: state.routes},
        (nextState) => {
          alt.bootstrap(nextState);
          return resolve(isoRenderer(alt, Handler));
        }
      );
    });
  });
  return promise;
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
    yield this.render('main', {content});
  }
};

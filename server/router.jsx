'use strict';

import debug from 'debug';

import React from 'react';
import Router from 'react-router';
import isoRenderer from 'alt/utils/IsomorphicRenderer';

// Paths are relative to `app` directory
import routes from 'routes';
import alt from 'utils/alt';
import altResolver from 'utils/alt-resolver';
import promisify from 'utils/promisify';

export default function *() {
  const isCashed = this.cashed ? yield this.cashed() : false;
  if (!isCashed) {
    let router = Router.create({
      routes: routes,
      location: this.request.url,
      onAbort(redirect) {
        // TODO: Try to render the good page with re-creating a Router,
        // and with modifying req with `redirect.to`
        this.status = 303;
        this.redirect(redirect.to);
      },
      onError(err) {
        debug('koa')('Routing Error');
        debug('koa')(err);
      }
    });

    const handler = yield promisify(router.run);
    const content = yield altResolver.render(handler);
    const assets = require('./webpack-stats.json');

    yield this.render('main', {content, assets});
  }
};

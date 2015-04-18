'use strict';

import React from 'react';
import Iso from 'iso';
import debug from 'debug';

import ErrorPage from 'pages/server-error';

const toResolve = [];

export default {
  resolve(promise: Function, later = false) {
    if (process.env.BROWSER && !later) {
      return new Promise(promise);
    }
    else {
      toResolve.push(promise);
    }
  },
  mapPromises() {
    return toResolve.map((promise) => new Promise(promise));
  },
  cleanPromises() {
    toResolve.length = 0;
  },
  async render(Handler: object, flux: object, force: ?boolean = false) {
    if (process.env.BROWSER && !force) {
      debug('dev')('`altResolver.render` should not be used in browser, something went wrong');
      return null;
    }
    else {
      let content: string;
      try {
        // Fire first render to collect XHR promises
        debug('dev')('first render');
        React.renderToString(React.createElement(Handler, {flux}));

        // Resolve all promises
        await Promise.all(this.mapPromises());

        debug('dev')('second render');
        // Get the new content with promises resolved
        const app: string = React.renderToString(React.createElement(Handler, {flux}));

        // Render the html with state in it
        content = Iso.render(app, flux.flush());
      }
      catch (error) {
        // catch script error, render 500 page
        debug('koa')('`rendering error`');
        debug('koa')(error);
        const app: string = React.renderToString(React.createElement(ErrorPage));
        content = Iso.render(app, flux.flush());
      }

      // clean server for next request
      this.cleanPromises();

      // return the content
      return content;
    }
  }
};

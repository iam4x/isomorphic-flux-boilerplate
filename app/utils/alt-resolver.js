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

        // Get the promises collected from the first rendering
        const promises: Array = this.mapPromises();

        // Clean the promises for the next request
        this.cleanPromises();

        // Resolve all promises collected
        await Promise.all(promises);

        debug('dev')('second render');
        // Get the new content with promises resolved
        const app: string = React.renderToString(React.createElement(Handler, {flux}));

        // Clean the promises collected from the second rendering
        // we won't use them, and we need to clean for
        // the next request
        this.cleanPromises();

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

      // return the content
      return content;
    }
  }
};

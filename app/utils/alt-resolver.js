'use strict';

import React from 'react';
import Iso from 'iso';
import debug from 'debug';

import alt from 'utils/alt';
import ErrorPage from 'pages/error';

const toResolve = [];

export default {
  resolve(promise) {
    if (process.env.BROWSER) {
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
  async render(Handler) {
    if (process.env.BROWSER) {
      debug('dev')('`altResolver.render` should not be used in browser, something went wrong');
    }
    else {
      // Fire first render to collect XHR promises
      let content;
      try {
        React.renderToString(React.createElement(Handler));
        // Resolve all promises
        await Promise.all(this.mapPromises());
        // Get the new content with promises resolved
        const app = React.renderToString(React.createElement(Handler));
        // Render the html with state in it
        content = Iso.render(app, alt.takeSnapshot());
      }
      catch (error) {
        // catch script error, render 500 page
        content = React.renderToString(React.createElement(ErrorPage));
      }
      // clean server for next request
      this.cleanPromises();
      alt.flush();
      // return the content
      return content;
    }
  }
};

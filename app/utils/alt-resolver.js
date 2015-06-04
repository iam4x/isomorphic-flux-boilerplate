/*eslint-disable no-undef */
'use strict';

import React from 'react';
import Iso from 'iso';
import debug from 'debug';

import ErrorPage from 'pages/server-error';

export default class AltResolver {
  constructor() {
    this._toResolve = [];
  }
  resolve(promise: Function, later = false) {
    if (process.env.BROWSER && !later) {
      return new Promise(promise);
    }
    else {
      this._toResolve.push(promise);
    }
  }
  mapPromises() {
    return this._toResolve.map((promise) => new Promise(promise));
  }
  async render(Handler: Object, flux: Object, force: ?boolean = false) {
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

        // Resolve all promises collected
        await Promise.all(promises);

        debug('dev')('second render');
        // Get the new content with promises resolved
        const app: string = React.renderToString(React.createElement(Handler, {flux}));
        const {title}: string = flux.getStore('page-title').getState();

        // Render the html with state in it
        content = {body: Iso.render(app, flux.flush()), title};
      }
      catch (error) {
        // catch script error, render 500 page
        debug('koa')('`rendering error`');
        debug('koa')(error);

        const app: string = React.renderToString(React.createElement(ErrorPage));
        const {title}: string = flux.getStore('page-title').getState();

        content = {body: Iso.render(app, flux.flush()), title};
      }

      // return the content
      return content;
    }
  }
}

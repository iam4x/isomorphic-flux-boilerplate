import debug from 'debug';
import noop from 'lodash/utility/noop';

import React from 'react';
import ReactDOM from 'react-dom/server';
import Iso from 'iso';

import ErrorPage from 'pages/server-error';

class AltResolver {

  _toResolve = []
  _firstClientSideRender = !(process.env.NODE_ENV === 'test')

  resolve(promise: Function, later = false) {
    if (process.env.BROWSER && !later) {
      // Prevent first app mount to re-resolve same
      // promises that server already did
      if (this._firstClientSideRender) {
        return noop();
      }

      return new Promise(promise);
    }

    return this._toResolve.push(promise);
  }

  mapPromises() {
    return this._toResolve.map((promise) => new Promise(promise));
  }

  async render(Handler, flux, force = false) {
    if (process.env.BROWSER && !force) {
      debug('dev')('`altResolver.render` should not be used in browser, something went wrong');
      return null;
    }

    let content;
    try {
      // Fire first render to collect XHR promises
      debug('dev')('first render');
      ReactDOM.renderToString(Handler);

      // Get the promises collected from the first rendering
      const promises = this.mapPromises();

      // Resolve all promises collected
      await Promise.all(promises);

      debug('dev')('second render');
      // Get the new content with promises resolved

      const fluxSnapshot = flux.takeSnapshot();
      const app = ReactDOM.renderToString(Handler);
      const { title } = flux.getStore('page-title').getState();

      // Render the html with state in it
      content = { body: Iso.render(app, fluxSnapshot), title };
    } catch (error) {
      // catch script error, render 500 page
      debug('koa')('`rendering error`');
      debug('koa')(error);

      const fluxSnapshot = flux.takeSnapshot();
      const app = ReactDOM.renderToString(React.createElement(ErrorPage));
      const { title } = flux.getStore('page-title').getState();

      content = { body: Iso.render(app, fluxSnapshot), title };
    }

    // return the content
    return content;
  }

}

export default AltResolver;

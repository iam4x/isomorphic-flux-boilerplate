'use strict';

import React from 'react';
import Iso from 'iso';
import debug from 'debug';

import alt from 'utils/alt';

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
  getPromises() {
    return toResolve.map((promise) => new Promise(promise));
  },
  cleanPromises() {
    toResolve.length = 0;
  },
  render(Handler) {
    if (process.env.BROWSER) {
      debug('dev')('`altResolver.render` should not be used in browser, something went wrong');
    }
    else {
      const app = React.renderToString(React.createElement(Handler));
      const content = Iso.render(app, alt.takeSnapshot());
      // clean server for next request
      this.cleanPromises();
      alt.flush();
      // return the new content generated
      return content;
    }
  }
};

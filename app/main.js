'use strict';

import Iso from 'iso';
import React from 'react';
import Router from 'react-router';

// Paths are relative to `app` directory
import Flux from 'utils/flux';
import intlLoader from 'utils/intl-loader';

if (process.env.NODE_ENV === 'development') {
  // Warns about potential accessibility issues with your React elements
  require('react-a11y')(React);
  require('debug').enable('dev,koa');
}

const boostrap = () => {
  return new Promise((resolve) => {
    Iso.bootstrap((initialState, __, container) => {
      resolve({initialState, __, container});
    });
  });
};

(async () => {
  // Init alt instance
  const flux = new Flux();

  // bootstrap application with data from server
  const boot = await boostrap();
  flux.bootstrap(boot.initialState);

  // load the intl-polyfill if needed
  // load the correct data/{lang}.json into app
  const locale = flux.getStore('locale').getLocale();
  const {messages} = await intlLoader(locale);
  flux.getActions('locale').switchLocaleSuccess({locale, messages});

  // load routes after int-polyfill
  // routes.jsx imports components using the `window.Intl`
  // it should be defined before
  const routes = require('routes');

  // Render the app at correct URL
  Router.run(
    routes,
    Router.HistoryLocation,
    (Handler) => {
      const app = React.createElement(Handler, {flux});
      React.render(app, boot.container);
    }
  );
})();

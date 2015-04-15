'use strict';

import Iso from 'iso';
import React from 'react';
import Router from 'react-router';

// Paths are relative to `app` directory
import alt from 'utils/alt';
import routes from 'routes';
import intlLoader from 'utils/intl-loader';
import LocaleStore from 'stores/locale';
import LocaleActions from 'actions/locale';

if (process.env.NODE_ENV === 'development') {
  // Warns about potential accessibility issues with your React elements
  require('react-a11y')();
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
  // bootstrap application with data from server
  const boot = await boostrap();
  alt.bootstrap(boot.initialState);

  // load the intl-polyfill if needed
  // load the correct data/{lang}.json into app
  const locale = LocaleStore.getLocale();
  const {messages} = await intlLoader(locale);
  LocaleActions.switchLocaleSuccess({locale, messages});

  // Render the app at correct URL
  Router.run(
    routes,
    Router.HistoryLocation,
    (Handler) => {
      const app = React.createElement(Handler);
      React.render(app, boot.container);
    }
  );
})();

'use strict';

import Iso from 'iso';
import React from 'react';
import Router from 'react-router';

// Paths are relative to `app` directory
import alt from 'utils/alt';
import routes from 'routes';

if (process.env.NODE_ENV === 'development') {
  // Warns about potential accessibility issues with your React elements
  require('react-a11y')();
}

Iso.bootstrap((initialState, __, container) => {
  // Bootstrap data into client Alt
  alt.bootstrap(initialState);
  // Run the `react-router`
  Router.run(
    routes,
    Router.HistoryLocation,
    (Handler) => React.render(React.createElement(Handler), container)
  );
});

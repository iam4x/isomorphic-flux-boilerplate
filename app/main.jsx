'use strict';

import Iso from 'iso';
import React from 'react';
import Router from 'react-router';

import altResolver from '../shared/alt-resolver';
// Paths are relative to `app` directory
import alt from 'utils/alt';
import routes from 'routes';

Iso.bootstrap((initialState, __, container) => {
  // Bootstrap data into client Alt
  alt.bootstrap(initialState);
  // Run the `react-router`
  Router.run(
    routes,
    Router.HistoryLocation,
    (Handler, state) => {
      altResolver(
        {
          routes: state.routes,
          state: initialState
        },
        (nextState) => {
          alt.bootstrap(nextState);
          React.render(<Handler />, container);
        }
      );
    }
  );
});

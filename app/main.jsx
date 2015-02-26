'use strict';

import Iso from 'iso';
import React from 'react';
import Router from 'react-router';

// Paths are relative to `app` directory
import alt from 'utils/alt';
import routes from 'routes';

Iso.bootstrap((state, _, container) => {
  // Bootstrap data into client Alt
  alt.bootstrap(state);
  // Run the `react-router`
  Router.run(
    routes,
    Router.HistoryLocation,
    (Handler) => React.render(<Handler/>, container)
  );
});

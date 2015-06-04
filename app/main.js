import React from 'react';
import Router from 'react-router';
import AltIso from 'alt/utils/AltIso';
import BrowserHistory from 'react-router/lib/BrowserHistory';

import alt from 'utils/alt';

if (process.env.NODE_ENV === 'development') {
  require('debug').enable('dev,koa');
}

// load routes after int-polyfill
// routes.jsx imports components using the `window.Intl`
// it should be defined before
const routerProps = {
  routes: require('routes'),
  history: new BrowserHistory()
};

// Render `<Router />` in the same container as the SSR
AltIso.render(alt, React.createElement(Router, {...routerProps}));

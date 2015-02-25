'use strict';

import React from 'react';
import Router from 'react-router';
import Resolver from 'react-resolver';

import routes from './routes';

const resolver = new Resolver();
const content = document.getElementById('content');

Router.run(
  resolver.route(routes),
  Router.HistoryLocation,
  (Handler) => React.render(<Handler/>, content)
);

'use strict';

import React from 'react';
import Router from 'react-router';

import routes from './routes';

const content = document.getElementById('content');

Router.run(routes, Router.HistoryLocation, (Handler) => {
  return React.render(<Handler/>, content);
});

'use strict';

import React from 'react';
import {Route, DefaultRoute} from 'react-router';

export default (
  <Route name='app' path='/' handler={require('./components/app')}>
    <DefaultRoute
      name='users'
      handler={require('./components/users')} />
    <Route
      name='guides'
      handler={require('./components/guides')} />
    <Route
      name='profile'
      path='profile/:seed'
      handler={require('./components/profile')} />
  </Route>
);

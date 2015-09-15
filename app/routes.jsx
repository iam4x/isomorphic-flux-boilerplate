import React from 'react';
import { Route } from 'react-router';
import { generateRoute } from 'utils/localized-routes';

export default (
  <Route component={ require('./components/app') }>
    { generateRoute({
      paths: ['/', '/users', '/utilisateurs'],
      component: require('./components/users')
    }) }
    { generateRoute({
      paths: ['/protected', '/protege'],
      component: require('./components/protected')
    }) }
    { generateRoute({
      paths: ['/guides'],
      component: require('./components/guides')
    }) }
    { generateRoute({
      paths: ['/profile/:seed', '/profil/:seed'],
      component: require('./components/profile')
    }) }
    { generateRoute({
      paths: ['/login-info', '/info-client'],
      component: require('./pages/login-info')
    }) }
    <Route path='*' component={ require('./pages/not-found') } />
  </Route>
);

import React from 'react';
import { Route } from 'react-router';

import { generateRoute } from 'utils/localized-routes';
import { isConnected } from 'utils/routes-hooks';

export default function (flux) { /* eslint react/display-name: 0 */
  return (
    <Route component={ require('./components/app/app') }>
      { generateRoute({
        paths: [ '/', '/users', '/utilisateurs' ],
        component: require('./components/users/users')
      }) }
      { generateRoute({
        paths: [ '/account', '/mon-compte' ],
        component: require('./pages/account/account'),
        onEnter: isConnected(flux)
      }) }
      { generateRoute({
        paths: [ '/guides' ],
        component: require('./components/guides/guides')
      }) }
      { generateRoute({
        paths: [ '/profile/:seed', '/profil/:seed' ],
        component: require('./components/profile/profile')
      }) }
      { generateRoute({
        paths: [ '/login', '/connexion' ],
        component: require('./pages/login/login')
      }) }
      <Route path='*' component={ require('./pages/not-found/not-found') } />
    </Route>
  );
}

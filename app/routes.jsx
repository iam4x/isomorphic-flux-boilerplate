import React from 'react';
import { Route } from 'react-router';

import { generateRoute } from 'utils/localized-routes';
import { isConnected, dealsUrlRedirect } from 'utils/routes-hooks';

export default function (flux) { /* eslint react/display-name: 0 */
  return (
    <Route component={ require('./components/app') }>
      { generateRoute({
        paths: [ '/', '/deals' ],
        component: require('./components/deals/deals-list'),
        onEnter: dealsUrlRedirect(flux)
      }) }
      { generateRoute({
        paths: [ '/deals/:id' ],
        component: require('./components/deals/deal-show')
      }) }
      { generateRoute({
        paths: [ '/account', '/mon-compte' ],
        component: require('./pages/account'),
        onEnter: isConnected(flux)
      }) }
      { generateRoute({
        paths: [ '/cart' ],
        component: require('./components/cart')
      }) }
      { generateRoute({
        paths: [ '/profile/:seed', '/profil/:seed' ],
        component: require('./components/profile')
      }) }
      { generateRoute({
        paths: [ '/login', '/connexion' ],
        component: require('./pages/login')
      }) }
      <Route path='*' component={ require('./pages/not-found') } />
    </Route>
  );
}

import React from 'react'
import { Route } from 'react-router'

import { generateRoute } from 'utils/localized-routes'
import { isConnected } from 'utils/routes-hooks'

export default function(flux) { /* eslint react/display-name: 0 */
  return (
    <Route component={ require('./components/app') }>
      { generateRoute({
        paths: [ '/', '/users', '/utilisateurs' ],
        component: require('./components/users')
      }) }
      { generateRoute({
        paths: [ '/account', '/mon-compte' ],
        component: require('./pages/account'),
        onEnter: isConnected(flux)
      }) }
      { generateRoute({
        paths: [ '/guides' ],
        component: require('./components/guides')
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
  )
}

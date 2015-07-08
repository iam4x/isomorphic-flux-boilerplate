import {generateRoute} from 'utils/localized-routes';

export default {
  path: '',
  component: require('./components/app'),
  childRoutes: [
    ...generateRoute({
      paths: ['/', '/users', '/utilisateurs'],
      component: require('./components/users')
    }),
    ...generateRoute({
      paths: ['/protected', '/protege'],
      component: require('./components/protected')
    }),
    ...generateRoute({
      paths: ['/guides'],
      component: require('./components/guides')
    }),
    ...generateRoute({
      paths: ['/profile/:seed', '/profil/:seed'],
      component: require('./components/profile')
    }),
    ...generateRoute({
      paths: ['/login-info', '/info-client'],
      component: require('./pages/login-info')
    })
  ]
};

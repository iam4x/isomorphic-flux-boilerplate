export default {
  path: '',
  component: require('./components/app'),
  childRoutes: [
    {path: '/', component: require('./components/users')},
    {path: '/guides', component: require('./components/guides')},
    {path: '/protected', component: require('./components/protected')},
    {path: '/profile/:seed', component: require('./components/profile')},
    {path: '/login-info', component: require('./pages/login-info')}
  ]
};

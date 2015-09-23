import Iso from 'iso';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

// Paths are relative to `app` directory
import Flux from 'utils/flux';
import intlLoader from 'utils/intl-loader';

if (process.env.NODE_ENV === 'development') {
  require('debug').enable('dev,koa');
}

const boostrap = () => {
  return new Promise((resolve) => {
    Iso.bootstrap((initialState, __, container) => {
      resolve({ initialState, __, container });
    });
  });
};

(async () => {
  // Init alt instance
  const flux = new Flux();

  // bootstrap application with data from server
  const boot = await boostrap();
  flux.bootstrap(boot.initialState);

  // load the intl-polyfill if needed
  // load the correct data/{lang}.json into app
  const locale = flux.getStore('locale').getLocale();
  const { messages } = await intlLoader(locale);
  flux.getActions('locale').switchLocaleSuccess({ locale, messages });

  // load routes after int-polyfill
  // routes.jsx imports components using the `window.Intl`
  // it should be defined before
  const routerProps = {
    routes: require('routes'),
    history: createBrowserHistory(),
    createElement: (component, props) => {
      // Take locale and messages from `locale` store
      // and pass them to every components rendered from `Router`
      const i18n = flux.getStore('locale').getState();
      return React.createElement(component, { ...props, ...i18n, flux });
    }
  };

  // Render `<Router />` in the same container as the SSR
  ReactDOM.render(
    React.createElement(Router, { ...routerProps }),
    boot.container
  );

  // Tell `alt-resolver` we have done the first render
  // next promises will be resolved
  flux._resolver._firstClientSideRender = false;
})();

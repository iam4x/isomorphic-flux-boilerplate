import debug from 'debug';

import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';

// Paths are relative to `app` directory
import routes from 'routes';
import Flux from 'utils/flux';

// We need wrap `Router.run` into a promise
// in order to use the keyword `yield` and keep
// the correct way `koajs` works
const promisifiedRouter = (customRoutes, location) => {
  return new Promise((resolve) => {
    Router.run(customRoutes, location, (error, initialState, transition) =>
      resolve({error, initialState, transition})
    );
  });
};

export default function *() {
  // Init alt instance
  const flux = new Flux();

  // Get request locale for rendering
  const locale = this.cookies.get('_lang') || this.acceptsLanguages(require('./config/init').locales) || 'en';
  const {messages} = require(`data/${locale}`);

  // Populate store with locale
  flux
    .getActions('locale')
    .switchLocaleSuccess({locale, messages});

  debug('dev')(`locale of request: ${locale}`);

  try {
    // Pass correct location of the request to `react-router`
    // it will return the matched components for the route into `initialState`
    const location = new Location(this.request.path, this.request.query);
    const {error, initialState, transition} = yield promisifiedRouter(routes, location);

    // Render 500 error page from server
    if (error) throw error;

    // Handle component `onEnter` transition
    const {isCancelled, redirectInfo} = transition;
    if (isCancelled) return this.redirect(redirectInfo.pathname);

    // Render application of correct location
    // We need to re-define `createElement` of `react-router`
    // in order to include `flux` on children components props
    const routerProps = Object.assign({}, initialState,
      {
        location,
        createElement: (component, props) => {
          // Take locale and messages from `locale` store
          // and pass them to every components rendered from `Router`
          const i18n = flux.getStore('locale').getState();
          return React.createElement(
            component,
            Object.assign(props, {flux, ...i18n})
          );
        }
      }
    );

    // Use `alt-resolver` to render component with fetched data
    const {body, title} = yield flux.render(<Router {...routerProps} />);

    // Assets name are found into `webpack-stats`
    const assets = require('./webpack-stats.json');

    // Don't cache assets name on dev
    if (process.env.NODE_ENV === 'development') {
      delete require.cache[require.resolve('./webpack-stats.json')];
    }

    debug('dev')('return html content');
    yield this.render('main', {body, assets, locale, title});
  }
  // Catch error from rendering procress
  catch (error) {
    // In other cases just return the error
    throw error;
  }
}

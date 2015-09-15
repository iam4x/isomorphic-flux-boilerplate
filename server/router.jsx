import debug from 'debug';

import React from 'react';
import { RoutingContext, match } from 'react-router';

import createLocation from 'history/lib/createLocation';

// Paths are relative to `app` directory
import routes from 'routes';
import Flux from 'utils/flux';

// We need wrap `Router.run` into a promise
// in order to use the keyword `yield` and keep
// the correct way `koajs` works
const promisifiedRouter = (location) =>
  new Promise((resolve) =>
    match({ routes, location }, (...args) => resolve(args)));

export default function *() {
  // Init alt instance
  const flux = new Flux();

  // Get request locale for rendering
  const locale = this.cookies.get('_lang') || this.acceptsLanguages(require('./config/init').locales) || 'en';
  const { messages } = require(`data/${locale}`);

  // Populate store with locale
  flux
    .getActions('locale')
    .switchLocaleSuccess({ locale, messages });

  debug('dev')(`locale of request: ${locale}`);

  try {
    // Pass correct location of the request to `react-router`
    // it will return the matched components for the route into `initialState`
    const location = createLocation(this.request.path, this.request.query);
    const [ error, redirect, renderProps ] = yield promisifiedRouter(location);

    // Render 500 error page from server
    if (error) throw error;

    // Handle component `onEnter` transition
    if (redirect) {
      const { pathname, search } = redirect;
      return this.redirect(pathname + search);
    }

    // Render application of correct location
    // We need to re-define `createElement` of `react-router`
    // in order to include `flux` on children components props
    const routerProps = {
      ...renderProps, location,
      createElement: (component, props) => {
        // Take locale and messages from `locale` store
        // and pass them to every components rendered from `Router`
        const i18n = flux.getStore('locale').getState();
        return React.createElement(component, { ...props, ...i18n, flux });
      }
    };

    // Use `alt-resolver` to render component with fetched data
    const { body, title } = yield flux.render(<RoutingContext { ...routerProps } />);

    // Assets name are found into `webpack-stats`
    const assets = require('./webpack-stats.json');

    // Don't cache assets name on dev
    if (process.env.NODE_ENV === 'development') {
      delete require.cache[require.resolve('./webpack-stats.json')];
    }

    debug('dev')('return html content');
    yield this.render('main', { body, assets, locale, title });
  } catch (error) {
    // Catch error from rendering procress
    // In other cases just return the error
    throw error;
  }
}

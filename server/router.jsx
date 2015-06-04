import debug from 'debug';

import React from 'react';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import AltIso from 'alt/utils/AltIso';

// Paths are relative to `app` directory
import routes from 'routes';
import alt from 'utils/alt';

import PageTitleStore from 'flux/stores/page-title';

// We need wrap `Router.run` into a promise
// in order to use the keyword `yield` and keep
// the correct way `koajs` works
const promisifiedRouter = (customRoutes, location) => {
  return new Promise((resolve) => {
    Router.run(customRoutes, location, (error, initialState) => resolve({error, initialState}));
  });
};

export default function *() {
  // Get request locale for rendering
  const locale = this.cookies.get('_lang') || this.acceptsLanguages(require('./config/init').locales) || 'en';
  debug('dev')(`locale of request: ${locale}`);

  try {
    // Pass correct location of the request to `react-router`
    // it will return the matched components for the route into `initialState`
    const location = new Location(this.request.path, this.request.querystring);
    const {error, initialState} = yield promisifiedRouter(routes, location);

    // Render 500 error page from server
    if (error) throw error;

    const routerProps = Object.assign({}, initialState, {location});
    const body = yield AltIso.render(alt, <Router {...routerProps} />, {locale});
    const {title} = PageTitleStore.getState();

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
    // If the error got a `redirect` key
    // we should trigger a redirection from
    // the server to keep things isomorphic
    if (error.redirect) {
      return this.redirect(error.redirect);
    }

    // In other cases just return the error
    throw error;
  }
}

import debug from 'debug';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import createFlux from 'flux/createFlux';

import ApiClient from '../shared/api-client';
import universalRender from '../shared/universal-render';

export default function *() {
  // Init alt instance
  const client = new ApiClient(this.get('cookie'));
  const flux = createFlux(client);

  // Get request locale for rendering
  const locale = this.cookies.get('_lang') || this.acceptsLanguages(require('./config/init').locales) || 'en';
  const { messages } = require(`data/${locale}`);

  // Populate store with locale
  flux
    .getActions('locale')
    .switchLocaleSuccess({ locale, messages });

  debug('dev')(`locale of request: ${locale}`);

  try {
    const { body, title } = yield universalRender({ flux, location: this.request.url });

    // Assets name are found into `webpack-stats`
    const assets = require('./webpack-stats.json');

    // Refresh page at a first time after set screen resolution for server
    const extractor = new ExtractTextPlugin('./views/media-query-refresh.js');
    const mediaQueryRefreshScript = extractor.extract();

    // Don't cache assets name on dev
    if (process.env.NODE_ENV === 'development') {
      delete require.cache[require.resolve('./webpack-stats.json')];
    }

    debug('dev')('return html content');
    yield this.render('main', { body, assets, locale, title, mediaQueryRefreshScript });
  } catch (err) {
    // Render 500 error page from server
    const { error, redirect } = err;
    if (error) throw error;

    // Handle component `onEnter` transition
    if (redirect) {
      const { pathname, search } = redirect;
      return this.redirect(pathname + search);
    }

    throw error;
  }
}

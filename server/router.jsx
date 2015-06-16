'use strict';

import fs from 'fs';
import path from 'path';
import debug from 'debug';

import Router from 'react-router';
// Paths are relative to `app` directory
import routes from 'routes';
import Flux from 'utils/flux';
import promisify from 'utils/promisify';

export default function *() {

  // TODO: Find strategy for removing cache on specific url
  const isCashed = this.cashed ? yield *this.cashed() : false;

  if (!isCashed) {
    const router = Router.create({
      routes: routes,
      location: this.request.url,
      onAbort(abortReason) {
        const error = new Error();

        // Create specific error for creating
        // a redirection on the server
        if (abortReason.constructor.name === 'Redirect') {
          const { to, params, query } = abortReason;
          const url = router.makePath(to, params, query);
          debug('dev')('Redirect request to `%s`', url);
          error.redirect = url;
        }

        // Throw an error to be catch
        // from the rendering process
        throw error;
      },
      onError(error) {

        // Don't flood the console output
        // with redirection information
        if (!error.redirect) {
          debug('koa')('Routing Error');
          debug('koa')(error);
        }

        // Continue to throw the err
        throw error;
      }
    });

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
      const handler = yield promisify(router.run);
      const {body, title} = yield flux.render(handler);

      // Reload './webpack-stats.json' on dev
      // cache it on production
      let assets;
      if (process.env.NODE_ENV === 'development') {
        assets = fs.readFileSync(path.resolve(__dirname, './webpack-stats.json'));
        assets = JSON.parse(assets);
      }
      else {
        assets = require('./webpack-stats.json');
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
}

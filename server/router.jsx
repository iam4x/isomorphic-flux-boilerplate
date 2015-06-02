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
  const isCashed = this.cashed ? yield *this.cashed() : false;
  if (!isCashed) {
    const router = Router.create({
      routes: routes,
      location: this.request.url,
      onAbort: abortReason => {
        const error = new Error();
        if (abortReason.constructor.name === 'Redirect') {
          const { to, params, query } = abortReason;
          const url = router.makePath(to, params, query);
          error.redirect = url;
          debug('dev')('Redirect request to `%s`', url);
        }
        throw(error);
      },
      onError: error => {
        debug('koa')('Routing Error');
        debug('koa')(error);
        throw(error);
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

    } catch (error) {
      if (error.redirect) {
        return this.redirect(error.redirect);
      }
      throw error;
    }
  }
}

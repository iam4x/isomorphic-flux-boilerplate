import debug from 'debug';

import React from 'react';
import { renderToString } from 'react-dom/server';

import createFlux from 'flux/createFlux';

import ServerHTML from './server-html';
import ApiClient from '../shared/api-client';
import universalRender from '../shared/universal-render';

export default function *() {
  // Init alt instance
  const client = new ApiClient(this.get('cookie'));
  const flux = createFlux(client);

  // Get request locale for rendering
  const locale = this.cookies.get('_lang') || this.acceptsLanguages(require('./config/init').locales) || 'en';
  const { messages } = require(`data/${locale}`);

  // Get auth-token from cookie
  const username = this.cookies.get('_auth');

  // Populate store with locale
  flux
    .getActions('locale')
    .switchLocaleSuccess({ locale, messages });

  // Populate store with auth
  if (username) {
      flux
        .getActions('session')
        .update({ username });
  }

  debug('dev')(`locale of request: ${locale}`);

  try {
    const { body, title, statusCode, description } =
      yield universalRender({ flux, location: this.request.url });

    // Assets name are found into `webpack-stats`
    const assets = require('./webpack-stats.json');

    // Don't cache assets name on dev
    if (process.env.NODE_ENV === 'development') {
      delete require.cache[require.resolve('./webpack-stats.json')];
    }

    debug('dev')('return html content');
    const props = { body, assets, locale, title, description };
    this.status = statusCode;
    this.body = '<!DOCTYPE html>' + renderToString(<ServerHTML { ...props } />);
  } catch (err) {
    // Render 500 error page from server
    const { error, redirect } = err;
    if (error) throw error;

    // Handle component `onEnter` transition
    if (redirect) {
      const { pathname, search } = redirect;
      return this.redirect(pathname + search);
    }

    throw err;
  }
}

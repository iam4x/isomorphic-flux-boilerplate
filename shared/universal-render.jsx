/* eslint react/display-name: 0 */

import Iso from 'iso';
import React from 'react';
import ReactDOM from 'react-dom';
import Router, { RoutingContext, match } from 'react-router';
import AltContainer from 'alt-container';

import intlLoader from 'utils/intl-loader';

const { BROWSER, NODE_ENV } = process.env;

const runRouter = (location, routes) =>
  new Promise((resolve) =>
    match({ routes, location }, (...args) => resolve(args)));

const bootstrap = () =>
  new Promise((resolve) =>
    Iso.bootstrap((initialState, __, container) =>
      resolve({ initialState, __, container })));

export default async function({ flux, history, location }) {
  if (BROWSER) {
    if (NODE_ENV === 'development') require('alt/utils/chromeDebug')(flux);

    const { container, initialState } = await bootstrap();
    flux.bootstrap(initialState);

    // load the intl-polyfill if needed
    // load the correct data/{lang}.json into app
    const { locales: [ locale ] } = flux.getStore('locale').getState();
    const { messages } = await intlLoader(locale);
    flux.getActions('locale').switchLocaleSuccess({ locale, messages });

    const routes = require('routes');

    const element = (
      <AltContainer flux={ flux }>
        <Router
          history={ history }
          routes={ routes } />
      </AltContainer>
    );

    // Render element in the same container as the SSR
    ReactDOM.render(element, container);

    // Tell `alt-resolver` we have done the first render
    // next promises will be resolved
    flux._resolver._firstClientSideRender = false;
  } else {
    const routes = require('routes');
    const [ error, redirect, renderProps ] = await runRouter(location, routes);

    if (error || redirect) throw ({ error, redirect });

    const element = (
      <AltContainer flux={ flux }>
        <RoutingContext { ...renderProps } />
      </AltContainer>
    );

    const { body, title } = await flux.render(element);
    return { body, title };
  }
}

/* eslint react/display-name: 0 */
/* eslint consistent-return: 0 */

import Iso from 'iso'
import React from 'react'
import debug from 'debug'
import { render } from 'react-dom'
import { renderToString } from 'react-dom/server'
import { Router, RouterContext, match } from 'react-router'
import AltContainer from 'alt-container'

import intlLoader from 'utils/intl-loader'
import ErrorPage from 'pages/server-error'

const { BROWSER, NODE_ENV } = process.env

const runRouter = (location, routes) =>
  new Promise((resolve) =>
    match({ routes, location }, (...args) => resolve(args)))

const bootstrap = () =>
  new Promise((resolve) =>
    Iso.bootstrap((initialState, container) =>
      resolve({ initialState, container })))

/* eslint space-before-function-paren:0 */
// https://github.com/eslint/eslint/issues/4442
export default async function({ flux, location }) {
  if (BROWSER) {
    if (NODE_ENV === 'development') require('alt-utils/lib/chromeDebug')(flux)

    const { container, initialState } = await bootstrap()
    flux.bootstrap(initialState)

    // load the intl-polyfill if needed
    // load the correct data/{lang}.json into app
    const { locales: [ locale ] } = flux.getStore('locale').getState()
    const { messages } = await intlLoader(locale)
    flux.getActions('locale').switchLocale({ locale, messages })

    const routes = require('routes')
    const I18nContainer = require('utils/i18n-container')

    const { browserHistory } = require('react-router')
    const withScroll = require('scroll-behavior/lib/withStandardScroll')

    const element = (
      <AltContainer flux={ flux }>
        <I18nContainer>
          <Router
            history={ withScroll(browserHistory) }
            routes={ routes(flux) } />
        </I18nContainer>
      </AltContainer>
    )

    // Render element in the same container as the SSR
    render(element, container)

    // Tell `alt-resolver` we have done the first render
    // next promises will be resolved
    flux.resolver.firstRender = false
  } else {
    const routes = require('routes')(flux)
    const I18nContainer = require('utils/i18n-container')
    const [ error, redirect, renderProps ] = await runRouter(location, routes)

    /* eslint no-throw-literal: 0 */
    if (error || redirect) throw ({ error, redirect })

    const element = (
      <AltContainer flux={ flux }>
        <I18nContainer>
          <RouterContext { ...renderProps } />
        </I18nContainer>
      </AltContainer>
    )

    let app
    let fluxSnapshot
    try {
      // Collect promises with a first render
      debug('dev')('first server render')
      renderToString(element)

      // Resolve them
      await flux.resolver.dispatchPendingActions()

      debug('dev')('second server render')

      fluxSnapshot = flux.takeSnapshot()
      app = renderToString(element)
    } catch (renderErr) {
      // Catch rendering error, render a 500 page
      debug('koa')('rendering error')
      debug('koa')(renderErr)

      fluxSnapshot = flux.takeSnapshot()
      app = renderToString(<ErrorPage />)
    }

    // Get status code, page title and page description for rendering
    /* eslint no-use-before-define: 0 */
    const { titleBase, title, ...helmet } = flux.getStore('helmet').getState()

    return {
      ...helmet,
      body: Iso.render(app, fluxSnapshot),
      title: titleBase + title
    }
  }
}

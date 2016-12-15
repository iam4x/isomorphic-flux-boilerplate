import debug from 'debug'

import React from 'react'
import { renderToString } from 'react-dom/server'

import createFlux from 'flux/createFlux'

import ServerHTML from './server-html'
import ApiClient from '../shared/api-client'
import universalRender from '../shared/universal-render'

export default async function(ctx) {
  // Init alt instance
  const client = new ApiClient(ctx.get('cookie'))
  const flux = createFlux(client)

  // Get request locale for rendering
  const locale = ctx.cookies.get('_lang') ||
    ctx.acceptsLanguages(require('../internals/config/private').locales) ||
    'en'

  const { messages } = require(`data/${locale}`)

  // Get auth-token from cookie
  const username = ctx.cookies.get('_auth')

  // Populate store with locale
  flux
    .getActions('locale')
    .switchLocale({ locale, messages })

  // Populate store with auth
  if (username) {
    flux
      .getActions('session')
      .update({ username })
  }

  debug('dev')(`locale of request: ${locale}`)

  try {
    const { body, title, statusCode, description } =
      await universalRender({ flux, location: ctx.request.url })

    // Assets name are found into `webpack-stats`
    const assets = require('./webpack-stats.json')

    // Don't cache assets name on dev
    if (process.env.NODE_ENV === 'development') {
      delete require.cache[require.resolve('./webpack-stats.json')]
    }

    debug('dev')('return html content')
    const props = { body, assets, locale, title, description }
    const html = renderToString(<ServerHTML { ...props } />)
    ctx.status = statusCode
    ctx.body = `<!DOCTYPE html>${html}`
  } catch (err) {
    // Render 500 error page from server
    const { error, redirect } = err
    if (error) throw error

    // Handle component `onEnter` transition
    if (redirect) {
      const { pathname, search } = redirect
      ctx.redirect(pathname + search)
    } else {
      throw err
    }
  }
}

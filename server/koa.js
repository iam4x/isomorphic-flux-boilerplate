import path from 'path'
import debug from 'debug'

import Koa from 'koa'
import mount from 'koa-mount'
import helmet from 'koa-helmet'
import logger from 'koa-logger'
import favicon from 'koa-favicon'
import staticCache from 'koa-static-cache'
import responseTime from 'koa-response-time'
import Router from 'koa-router'
import convert from 'koa-convert'

import router from './router'
import config from '../internals/config/private'
import { apiPrefix } from '../internals/config/public'

const app = new Koa()
const env = process.env.NODE_ENV || 'development'

// add header `X-Response-Time`
app.use(responseTime())
app.use(convert(logger()))

// various security headers
app.use(helmet())

if (env === 'production') {
  // set debug env to `koa` only
  // must be set programmaticaly for windows
  debug.enable('koa')

  // load production middleware
  app.use(require('koa-conditional-get')())
  app.use(convert(require('koa-etag')()))
  app.use(require('koa-compress')())
}

if (env === 'development') {
  // set debug env, must be programmaticaly for windows
  debug.enable('dev,koa')

  // log when process is blocked
  require('blocked')((ms) => debug('koa')(`blocked for ${ms}ms`))
}

app.use(favicon(path.join(__dirname, '../app/images/favicon.ico')))

const cacheOpts = { maxAge: 86400000, gzip: true }

// Proxy asset folder to webpack development server in development mode
if (env === 'development') {
  const webpackConfig = require('./../internals/webpack/dev.config')
  const proxy = require('koa-proxy')({
    host: `http://0.0.0.0:${webpackConfig.server.port}`,
    map: (filePath) => `assets/${filePath}`
  })
  app.use(mount('/assets', proxy))
} else {
  app.use(mount('/assets', staticCache(path.join(__dirname, '../dist'), cacheOpts)))
}

// mount the Api router
const apiRouter = new Router({ prefix: apiPrefix })
require('./api/routes')(apiRouter)

app.use(apiRouter.routes())

// mount react-router
app.use(router)

app.listen(config.port)

// Tell parent process koa-server is started
if (process.send) process.send('online')
debug('koa')(`Application started on port ${config.port}`)

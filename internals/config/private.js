import { port } from './public'

const { NODE_ENV } = process.env

const config = {

  default: {
    port,
    locales: [ 'fr', 'en' ]
  },

  development: {

  },

  staging: {

  },

  production: {

  }

}

export default config[NODE_ENV] ?
  { ...config.default, ...config[NODE_ENV] } :
  { ...config.default, ...config.development }

import axios from 'axios'
import { port, apiPrefix } from '../internals/config/public'

const { BROWSER } = process.env

class ApiClient {

  constructor(cookie) {
    /* istanbul ignore if */
    if (BROWSER) {
      this.baseURL = apiPrefix
    } else {
      this.cookie = cookie
      this.baseURL = `http://localhost:${port}${apiPrefix}`
    }
  }

  getConfig(config) {
    config.method = config.method || 'get'

    // Append correct `baseURL` to `config.url`
    /* istanbul ignore else */
    if (config.baseURL === undefined) {
      config.url = config.url ? this.baseURL + config.url : this.baseURL
    } else {
      config.url = config.url ? config.baseURL + config.url : config.baseURL
    }

    // Add CORS credentials on browser side
    /* istanbul ignore if */
    if (BROWSER) {
      config.withCredentials = (config.withCredentials === undefined) ?
        true : config.withCredentials
    }

    // Copy cookies into headers on server side
    if (!BROWSER && this.cookie) config.headers = { cookie: this.cookie }

    return config
  }

  async request(config = {}) {
    try {
      const { data } = await axios(this.getConfig(config))
      return data
    } catch (error) {
      throw (error && error.response && error.response.data) || error.stack
    }
  }

}

export default ApiClient

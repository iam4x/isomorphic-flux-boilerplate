import debug from 'debug'

const { BROWSER } = process.env

class SessionStore {

  constructor() {
    this.bindActions(this.alt.getActions('session'))
    this.session = null
  }

  onUpdate({ username }: { username: string }) {
    this.session = { username }
  }

  onLogin({ username }: { username: string }) {
    this.session = { username }

    // transition app to `/account`
    // or to the original asked page
    /* istanbul ignore if */
    if (BROWSER) {
      const { browserHistory } = require('react-router')
      const [ , nextPath = '/account' ] = window
        .location.search.match(/\?redirect=(.+)$/) || []

      const Cookies = require('cookies-js')
      Cookies.set('_auth', username)

      debug('dev')('redirect after login to %s', nextPath)
      browserHistory.replace(nextPath)
    }
  }

  onLogout() {
    this.session = null

    /* istanbul ignore if */
    if (BROWSER) {
      const Cookies = require('cookies-js')
      const { browserHistory } = require('react-router')
      Cookies.expire('_auth')
      browserHistory.replace('/login')
    }
  }

}

export default SessionStore

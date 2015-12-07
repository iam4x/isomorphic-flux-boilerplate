import debug from 'debug';

const { BROWSER } = process.env;

class SessionStore {

  constructor() {
    this.bindActions(this.alt.getActions('session'));
    this.session = null;
  }

  onLogin({ username }) {
    this.session = { username };

    // transition app to `/account`
    // or to the original asked page
    if (BROWSER) {
      const history = require('utils/router-history');
      const [, nextPath = '/account' ] = window
        .location.search.match(/\?redirect=(.+)$/) || [];

      debug('dev')('redirect after login to %s', nextPath);
      return history.replaceState(null, nextPath);
    }
  }

  onLogout() {
    this.session = null;
    if (BROWSER) require('utils/router-history').replaceState(null, '/login');
  }

}

export default SessionStore;

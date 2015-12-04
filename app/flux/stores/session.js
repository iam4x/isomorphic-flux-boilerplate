const { BROWSER } = process.env;

class SessionStore {

  constructor() {
    this.bindActions(this.alt.getActions('session'));
    this.session = null;
  }

  onLogin({ username }) {
    this.session = { username };
    // transition app to `/account`
    if (BROWSER) require('utils/router-history').replaceState(null, '/account');
  }

  onLogout() {
    this.session = null;
    if (BROWSER) require('utils/router-history').replaceState(null, '/login');
  }

}

export default SessionStore;

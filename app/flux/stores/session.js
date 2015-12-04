import history from 'utils/router-history';

class SessionStore {

  constructor() {
    this.bindActions(this.alt.getActions('session'));
    this.session = null;
  }

  onLogin({ username }) {
    this.session = { username };
    // transition app to `/account`
    return history.replaceState(null, '/account');
  }

  onLogout() {
    this.session = null;
    return history.replaceState(null, '/login');
  }

}

export default SessionStore;

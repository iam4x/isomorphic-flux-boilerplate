'use strict';

import alt from 'utils/alt';

class UserStore {
  constructor() {
    this.users = [];
  }
}

export default alt.createStore(UserStore, 'UserStore');

'use strict';

import alt from 'utils/alt';
import UserActions from 'actions/user';

class UserStore {
  constructor() {
    this.bindActions(UserActions);
    this.users = [];
  }
  onAdd(user) {
    this.users.push(user);
  }
  onRemove(index) {
    this.users.splice(index, 1);
  }
}

export default alt.createStore(UserStore, 'UserStore');

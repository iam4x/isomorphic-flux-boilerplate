'use strict';

import alt from 'utils/alt';
import UserActions from 'actions/user';

class UserStore {
  constructor() {
    this.bindActions(UserActions);
    this.users = [];
  }
  onRemove(index) {
    this.users.splice(index, 1);
  }
  onAddSuccess(user) {
    this.users.push(user);
  }
  onFetchSuccess(users) {
    this.users = users;
  }
}

export default alt.createStore(UserStore, 'UserStore');

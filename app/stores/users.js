'use strict';

import alt from 'utils/alt';
import UsersActions from 'actions/users';

class UsersStore {
  constructor() {
    this.bindActions(UsersActions);
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

export default alt.createStore(UsersStore, 'UsersStore');

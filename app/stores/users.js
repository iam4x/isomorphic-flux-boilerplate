'use strict';

import alt from 'utils/alt';
import UsersActions from 'actions/users';

class UsersStore {

  constructor() {
    this.bindActions(UsersActions);
    this.users = [];
  }

  static getBySeed(seed) {
    const users = this.getState().users;
    return {user: users.find((user) => user.seed === seed)};
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

  onFetchBySeedSuccess(user) {
    const users = this.users.slice();
    let occurrence = users.find((u) => u.seed === user.seed);
    if (occurrence) {
      occurrence = user;
    }
    else {
      users.push(user);
    }
    this.users = users;
  }

}

export default alt.createStore(UsersStore, 'UsersStore');

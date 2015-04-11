'use strict';

import {isEmpty} from 'lodash';

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
    if (isEmpty(this.users)) {
      // just apply the new users
      // this is called on every server rendering
      this.users = users;
    }
    else {
      const merged = this.users.slice();
      users.forEach((user) => {
        // update the most recent data into store
        let match = merged.find((u) => u.seed === user.seed);
        if (match) {
          match = user;
        }
        // push the new user
        else {
          merged.push(user);
        }
      });
      this.users = merged;
    }
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

'use strict';

import {isEmpty} from 'lodash';

class UsersStore {

  constructor() {
    this.bindActions(this.alt.getActions('users'));
    this.users = [];
  }

  static getBySeed(seed) {
    const users: Array<Object> = this.getState().users;
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
      const merged: Array<Object> = this.users.slice();
      users.forEach((user) => {
        // update the most recent data into store
        let match: ?Object = merged.find((u) => u.seed === user.seed) || null;
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
    const users: Array<Object> = this.users.slice();
    let occurrence: ?Object = users.find((u) => u.seed === user.seed);
    if (occurrence) {
      occurrence = user;
    }
    else if (user) {
      users.push(user);
    }
    this.users = users;
  }

}

export default UsersStore;

'use strict';

import {sample, take} from 'lodash';

import altResolver from 'utils/alt-resolver';
import data from 'data/users.json';

class UsersActions {
  constructor() {
    this.generateActions(
      'remove', 'fetchSuccess', 'addSuccess',
      'fetchBySeedSuccess'
    );
  }
  add() {
    const promise = (resolve) => {
      // fake xhr
      this.alt.getActions('requests').start();
      setTimeout(() => {
        this.actions.addSuccess(sample(data.users));
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    altResolver.resolve(promise);
  }
  fetch() {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      setTimeout(() => {
        this.actions.fetchSuccess(take(data.users, 10));
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    altResolver.resolve(promise);
  }
  fetchBySeed(seed) {
    const promise = (resolve) => {
      this.alt.getActions('requests').start();
      setTimeout(() => {
        const user = data.users.find((u) => u.seed === seed);
        this.actions.fetchBySeedSuccess(user);
        this.alt.getActions('requests').success();
        return resolve();
      }, 300);
    };
    altResolver.resolve(promise);
  }
}

export default UsersActions;

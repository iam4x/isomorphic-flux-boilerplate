'use strict';

import request from 'superagent';
import {sample, take} from 'lodash';

import alt from 'utils/alt';
import altResolver from 'utils/alt-resolver';
import UsersStore from 'stores/users';

import data from 'data/users.json';

class UserActions {
  constructor() {
    this.generateActions('remove', 'fetchSuccess', 'addSuccess');
  }
  add() {
    const promise = (resolve) => {
      // fake xhr
      setTimeout(() => {
        this.actions.addSuccess(sample(data.users));
        return resolve();
      }, 300);
    };
    altResolver.resolve(promise);
  }
  fetch() {
    const promise = (resolve) => {
      setTimeout(() => {
        this.actions.fetchSuccess(take(data.users, 10));
        return resolve();
      });
    };
    altResolver.resolve(promise);
  }
}

export default alt.createActions(UserActions);

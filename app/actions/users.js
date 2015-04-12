'use strict';

import request from 'superagent';
import {sample, take} from 'lodash';

import alt from 'utils/alt';
import altResolver from 'utils/alt-resolver';

import RequestsActions from 'actions/requests';

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
      RequestsActions.start();
      setTimeout(() => {
        this.actions.addSuccess(sample(data.users));
        RequestsActions.success();
        return resolve();
      }, 300);
    };
    altResolver.resolve(promise);
  }
  fetch() {
    const promise = (resolve) => {
      RequestsActions.start();
      setTimeout(() => {
        this.actions.fetchSuccess(take(data.users, 10));
        RequestsActions.success();
        return resolve();
      }, 300);
    };
    altResolver.resolve(promise);
  }
  fetchBySeed(seed) {
    const promise = (resolve) => {
      RequestsActions.start();
      setTimeout(() => {
        const user = data.users.find((user) => user.seed === seed);
        this.actions.fetchBySeedSuccess(user);
        RequestsActions.success();
        return resolve();
      }, 300);
    };
    altResolver.resolve(promise);
  }
}

export default alt.createActions(UsersActions);

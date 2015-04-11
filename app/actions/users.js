'use strict';

import request from 'superagent';
import {sample, take} from 'lodash';

import alt from 'utils/alt';
import altResolver from 'utils/alt-resolver';

import RequestsActions from 'actions/requests';

import data from 'data/users.json';

class UsersActions {
  constructor() {
    this.generateActions('remove', 'fetchSuccess', 'addSuccess');
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
}

export default alt.createActions(UsersActions);

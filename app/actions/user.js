'use strict';

import request from 'superagent';

import alt from 'utils/alt';
import altResolver from 'utils/alt-resolver';

class UserActions {
  constructor() {
    this.generateActions('remove', 'fetchSuccess', 'addSuccess');
  }
  add() {
    const promise = (resolve, reject) => {
      request
        .get('http://api.randomuser.me')
        .end((error, response) => {
          if (error) {
            return reject(error);
          }
          else {
            this.actions.addSuccess(response.body.results[0]);
          }
        });
    };
    altResolver.resolve(promise);
  }
  fetch() {
    const promise = (resolve, reject) => {
      request
        .get('http://api.randomuser.me/?results=10')
        .end((error, response) => {
          if (error) {
            return reject(error);
          }
          else {
            this.actions.fetchSuccess(response.body.results);
            return resolve();
          }
        });
    };
    altResolver.resolve(promise);
  }
}

export default alt.createActions(UserActions);

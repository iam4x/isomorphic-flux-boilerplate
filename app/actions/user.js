'use strict';

import alt from 'utils/alt';

class UserActions {
  constructor() {
    this.generateActions('add', 'remove');
  }
}

export default alt.createActions(UserActions);

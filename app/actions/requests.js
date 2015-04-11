'use strict';

import alt from 'utils/alt';

class RequestsActions {
  constructor() {
    this.generateActions('start', 'success', 'fail');
  }
}

export default alt.createActions(RequestsActions);

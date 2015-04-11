'use strict';

import alt from 'utils/alt';
import RequestsActions from 'actions/requests';

class RequestsStore {
  constructor() {
    this.bindActions(RequestsActions);
    this.inProgress = false;
  }
  onStart() {
    this.inProgress = true;
  }
  onSuccess() {
    this.inProgress = false;
  }
  onFail() {
    this.inProgress = false;
  }
}

export default alt.createStore(RequestsStore, 'RequestsStore');
